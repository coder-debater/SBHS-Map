const OFFLINE_CACHE = "offline-3";
const DATA_CACHE = "data";
const FILES = [
    "/index.html",
    "/app.webmanifest",
    "/icon.svg",
    "/main.css",
    "/register-sw.js",
    "/sw.js"
];
const LOG_CHANNEL = new BroadcastChannel('sw-logs')

function log(...args) {
    if (localStorage.debug === "on") {
        LOG_CHANNEL.postMessage(args)
    }
}

function prettyLog(first, ...args) {
    if (localStorage.debug === "on") {
        args.unshift('[SW] ' + first)
        LOG_CHANNEL.postMessage(args)
    }
}

self.addEventListener("install", evt => {
    log("Registered");
    evt.waitUntil((async () => {
        const cache = await caches.open(OFFLINE_CACHE);
        log("Caching files");
        await cache.addAll(FILES);
    })());
});

self.addEventListener("fetch", evt => {
    evt.respondWith((async () => {
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