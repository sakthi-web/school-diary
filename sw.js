// Minimal service worker — just enough to make the app installable.
// It doesn't do offline caching of app data; it simply passes requests through,
// falling back to cache only if the network is unavailable.
const CACHE_NAME = "kavi-magi-shell-v1";
const SHELL_FILES = ["./", "./index.html"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
