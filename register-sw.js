document.getElementById('sw-btn').addEventListener(
document.getElementById('sw-evt').value, function() {
if ("serviceWorker" in navigator) {
// \\ // \\ // \\ // \\ // \\ // \\



console.log("Adding SW")

const LOG_CHANNEL = self.BroadcastChannel
  ? (new BroadcastChannel('sw-logs'))
  : null;
if (LOG_CHANNEL) {
  console.log("Using BroadcastChannel")
  LOG_CHANNEL.onmessage = function(evt) {
    if (evt.data.constructor === Array) {
      // Logging func
      console.log(...evt.data);
      return undefined;
    }
    else if (evt.data !== "sw-ready") {
      // Only return debug mode value if message is sw-ready
      return undefined;
    }
    let debugElm = document.getElementById('debug-elm');
    let debugAttr = document.getElementById('debug-attr');
    let debugMode = debugElm[debugAttr.value];
    let debugModeVal = debugMode?"on":"off";
    console.log('Sent to SW: Debug Mode is ', debugModeVal)
    LOG_CHANNEL.postMessage(debugModeVal)
  };
}
else {
  console.log("Not using BroadcastChannel")
}

navigator.serviceWorker.register("sw.js");

console.log("Added SW")



}});