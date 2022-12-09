const cacheName = 'offline';
const cacheFiles = [
    '/index.html',
    '/app.webmanifest',
    '/icon.svg',
    '/main.css',
    '/register-sw.js',
    '/sw.js'
];

self.addEventListener('install', evt => {
  console.log('[Service Worker] Install', evt);
});