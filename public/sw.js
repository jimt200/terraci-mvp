const CACHE_NAME = "terraci-v1";
const urlsToCache = [
  "/",
  "/search",
  "/advanced-search",
  "/comparator",
  "/dashboard-buyer",
];

// Installation : mise en cache des pages principales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch : on sert depuis le cache si disponible, sinon le réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() =>
        caches.match("/")
      );
    })
  );
});