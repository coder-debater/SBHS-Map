document.getElementById("sw-btn").addEventListener(
document.getElementById("sw-evt").value, function() {
if ("serviceWorker" in navigator) {
// \\ // \\ // \\ // \\ // \\ // \\



let debugElm = document.getElementById("debug-elm");
let debugAttr = document.getElementById("debug-attr");
let debugMode = debugElm[debugAttr.value];
let debugModeVal = debugMode?"on":"off";
function registerLog(...args) {
  if (debugMode) {
    console.log(...args);
  }
}
registerLog("Adding SW")
const LOG_CHANNEL = self.BroadcastChannel
  ? (new BroadcastChannel("sw-logs"))
  : null;
if (LOG_CHANNEL) {
  registerLog("Using BroadcastChannel")
  LOG_CHANNEL.onmessage = function(evt) {
    if (evt.data.constructor === Array) {
      // Logging func
      registerLog(...evt.data);
      return undefined;
    }
    else if (evt.data !== "sw-ready") {
      registerLog("Unexpected data: ", evt.data)
      // Only return debug mode value if message is sw-ready
      return undefined;
    }
    registerLog("Sent to SW: Debug Mode is", debugModeVal)
    LOG_CHANNEL.postMessage(debugModeVal)
  };
}
else {
  registerLog("Not using BroadcastChannel")
}

navigator.serviceWorker.register("sw.js");

registerLog("Added SW")



}});