self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
        ]),
      ),
  );
});

const cacheFirst = async (event) => {
  // first, check the cache,
  const cachedResponse = await caches.match(event.request);
  // then, if found, return that entry
  if (cachedResponse !== undefined)
    return cachedResponse;
  // otherwise, go to network.
  const networkResponse = await fetch(event.request)
  const clonedResponse = networkResponse.clone();
  if (networkResponse.ok) {
    caches.open('v1').then((cache) => cache.put(event.request, clonedResponse));
  }
  return networkResponse;
};

const networkFirst = async (event) => {
  try {
    const networkResponse = await fetch(event.request);
    const clonedResponse = networkResponse.clone();
    if (networkResponse.ok)
      caches
        .open('v1')
        .then((cache) => cache.put(event.request, clonedResponse));
      return networkResponse;
    }

  catch {
    return new Response({
      status: 408,
      text: 'Network error',
    });
  }

  const cachedResponse = await caches.match(event.request);
  if (cachedResponse !== undefined) {
    return cachedResponse;
    }
  //first go to network,
  // if that fails, go to cache
}

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event))
})
