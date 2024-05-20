# React Chat Integration

A simple script to integrate [@voiceflow/react-chat](https://github.com/voiceflow/react-chat) with Weavel analytics.

## Installation

Simply add a simple script tag to your HTML file where you have included the `@voiceflow/react-chat` package.
You must create a project in Weavel and get the API key to use this script. ([Create a project on Weavel](https://analytics.weavel.ai))

This setup will enable **automatic logging of all user/bot messages** to Weavel. Every 'session' between users and your bot will be logged as a separate 'trace' on Weavel.

```html
<script
  src="https://cdn.jsdelivr.net/gh/weavel-ai/react-chat-integration@latest/logger.min.js"
  api-key="< Your Weavel API key here >"
></script>
```

### Example

```html
<!-- Your existing @voiceflow/react-chat installation -->
<script type="text/javascript">
  (function (d, t) {
    var v = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    v.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: "XXXXXX..." },
      });
    };
    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, "script");
</script>
<!-- Add the snippet below to integrate Weavel analytics -->
<script
  src="https://cdn.jsdelivr.net/gh/weavel-ai/react-chat-integration@latest/logger.min.js"
  api-key="< Your Weavel API key here >"
></script>
```

## Advanced Usage

You might also want to log **track events** (e.g. button clicks) or **user properties** (e.g. name, email) to Weavel. We provide Voiceflow functions to do this - you can import and use them in your project.

Download the functions from this repo:

- [Identify User](https://raw.githubusercontent.com/weavel-ai/react-chat-integration/main/voiceflow-functions/identify-user.json)
- [Track Event](https://raw.githubusercontent.com/weavel-ai/react-chat-integration/main/voiceflow-functions/log-track-event.json)

Read more about the Weavel-Voiceflow integration [here](https://weavel.ai/docs/platform-integrations/voiceflow).
