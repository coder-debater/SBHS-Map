localStorage.debug = (document.getElementById('debug-elm')[document.getElementById('debug-attr').value])?"on":"off";
document.getElementById('sw-btn').addEventListener(document.getElementById('sw-evt').value, () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js");
    }
});