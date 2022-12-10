const OFFLINE_CACHE = "offline-v-2";
const DATA_CACHE = "data";
const FILES = [
  // HTML
  "/debug.html",

  // JS
  "/debug.js",

  // CSS
  "/main.css",
  "/slider.css",

  // Manifest + used icons
  "/app.webmanifest",
  "/favicon.svg",
  "/settings.svg",

  // Service Worker
  "/register-sw.js",
  "/sw.js"
];
let _log;
function prettyLog(first, ...args) {
  args.unshift("[SW] " + first);
  _log(args)
}
function log(...args) {
  args.unshift("[SW]")
  _log(args)
}
const LOG_CHANNEL = self.BroadcastChannel
  ? (new BroadcastChannel("sw-logs"))
  : null;
let debugModeVal = null;
let queue = [];
if (LOG_CHANNEL) {
  LOG_CHANNEL.onmessage = function(evt) {
    if (!(["on", "off"].contains(evt.data))) {
      // Not debug mode value
      return undefined;
    }
    debugModeVal = evt.data;
    let i = -1;
    while (true) {
      i++;
      let q = queue[i];
      if ([undefined, null].includes(q)) {
        break;
      }
      _log(q)
    }
    queue = null;
  };
  _log = function(args) {
    if (debugModeVal === "on") {
      LOG_CHANNEL.postMessage(args);
    }
    else if (debugModeVal === null) {
      if (!queue) {
        LOG_CHANNEL.postMessage(args);
      }
      queue.push(args);
    }
  };
  LOG_CHANNEL.postMessage("sw-ready")
}
else {
  _log = function() {}
}

log("Started");

self.addEventListener("install", function(evt) {
  log("Registered");
  evt.waitUntil((async function() {
    const cache = await caches.open(OFFLINE_CACHE);
    log("Caching files");
    await cache.addAll(FILES);
  })());
});

self.addEventListener("fetch", function(evt) {
  evt.respondWith((async function() {
    try {
      const preload = await evt.preloadResponse;
      if (preload) {
        return preload;
      }
      return (await fetch(evt.request));
    }
    catch (err) {
      log("Fetch failed, returning cache");
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(OFFLINE_URL);
      return cachedResponse;
    }
  })());
});