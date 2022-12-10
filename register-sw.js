document.getElementById('sw-btn').addEventListener(
document.getElementById('sw-evt').value, function() {
console.log("Clicked")
if ("serviceWorker" in navigator) {
// \\ // \\ // \\ // \\ // \\ // \\



console.log("Adding SW")
if (self.BroadcastChannel) {
  console.log("Broadcast Channel Exists")
  const LOG_CHANNEL = new BroadcastChannel('sw-logs');
  LOG_CHANNEL.onmessage = function(evt) {
    console.log("Recieved message", evt.data)
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
    console.log('Debug mode is', debugModeVal)
    LOG_CHANNEL.postMessage(debugModeVal)
  };
}

navigator.serviceWorker.register("sw.js");
console.log("Added SW")



}});