
const CACHE_NAME = 'alberta-gas-tracker-v1';
const APP_PATH = '/alberta-gas-tracker-app/';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        APP_PATH,
        APP_PATH + 'manifest.webmanifest',
        APP_PATH + 'icon-192.png',
        APP_PATH + 'icon-512.png'
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
