# React Chat Integration

A simple script to integrate [@voiceflow/react-chat](https://github.com/voiceflow/react-chat) with Weavel analytics.

## Installation

Simply add a simple script tag to your HTML file where you have included the `@voiceflow/react-chat` package.
You must create a project in Weavel and get the API key to use this script.  
[Create a project on Weavel](https://analytics.weavel.ai)

```html
<script
  src="https://cdn.jsdelivr.net/gh/weavel-ai/react-chat-integration@latest/logger.min.js"
  api-key="< Your Weavel API key here >"
></script>
```

## Example

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
