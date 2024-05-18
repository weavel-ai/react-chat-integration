const weavelApiKey = document.currentScript.getAttribute('api-key');
const LOCAL_STORAGE_PREFIX = '@weavel/';

const generateUUID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const getStorageItem = (key) => localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${key}`);

function setStorageItem(key, value) {
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${key}`, value);
}

function logMessage({ userId, traceUUID, traceDataId, role, content, timestamp }) {
  if (!weavelApiKey) {
    console.error('Weavel API key is not set.');
    return;
  }

  fetch('https://api.weavel.ai/capture/trace_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${weavelApiKey}`,
    },
    body: JSON.stringify({
      user_id: userId,
      trace_id: traceUUID,
      trace_data_id: traceDataId,
      role,
      content,
      timestamp,
    }),
  });
  console.log({
    user_id: userId,
    trace_id: traceUUID,
    trace_data_id: traceDataId,
    role,
    content,
    timestamp,
  });
}

function parseMessages(messages) {
  let content = '';
  messages.forEach((message, i) => {
    switch (message.type) {
      case 'text':
        message.text.forEach((text) => {
          text.children.forEach((child) => {
            content += child.text;
          });
          content += '\n';
        });
        break;
      case 'image':
        content += 'Image\n';
        content += `URL: ${message.url}\n`;
        break;
      default:
        content += message.type;
        Object.keys(message).forEach((key) => {
          if (key === 'type') return;
          content += `${key}: ${message[key]}\n`;
        });
        break;
    }
    if (i < messages.length - 1) content += '\n';
  });
  return content;
}

window.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if ('type' in data) {
    const eventName = data.type.split('voiceflow:')[1];
    if (eventName === 'interact') {
      let traceUUID = getStorageItem('traceUUID');
      if (data.payload.action.type === 'launch') {
        traceUUID = generateUUID();
        setStorageItem('traceUUID', traceUUID);
        setStorageItem('loggedMessages', 0);
      }
      const userId = data.payload.session.userID;
      const allMessages = data.payload.session.turns;
      const messagesToLog = allMessages.slice(getStorageItem('loggedMessages') || 0);
      messagesToLog.forEach((msg) => {
        let content;
        if (msg.message) {
          content = msg.message;
        } else if (msg.messages) {
          content = parseMessages(msg.messages);
        }
        logMessage({
          userId,
          traceUUID,
          traceDataId: msg.id,
          role: msg.type,
          content,
          timestamp: new Date(msg.timestamp / 1000).toISOString(),
        });
      });
      setStorageItem('loggedMessages', allMessages.length);
    }
  }
});
