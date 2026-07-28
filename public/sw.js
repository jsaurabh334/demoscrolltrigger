/// Service Worker — Caches all critical assets in the browser
/// so the site loads instantly on return visits.

const CACHE_NAME = "aura-v1";

// Assets to pre-cache on first load
const PRECACHE_URLS = [
  "/",
  "/about",
  "/store",
  "/contact",
];

// Install: pre-cache critical routes
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Activate immediately without waiting
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch: Stale-While-Revalidate strategy
// Serve from cache instantly, fetch fresh copy in background for next time
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip Next.js HMR/dev requests
  const url = new URL(request.url);
  if (url.pathname.startsWith("/_next/webpack") || url.pathname.includes("__nextjs")) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);

      // Fetch fresh version in background
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          // Only cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, return cached version if available
          return cachedResponse;
        });

      // Return cached version immediately, or wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
