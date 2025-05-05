const CACHE_NAME = 'sw-cache-__swTimestamp__';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/no-data-error.html',
  '/main.css',
  '/main.js',
  '/fonts/firacode_regular.woff2',
  '/fonts/sft_regular.woff2',
  '/fonts/sft_medium.woff2',
  '/apple-touch-icon.png',
  '/color-palette.svg',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-48x48.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-mask.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => {
        console.log('serviceWorker install error:', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  try {
    event.waitUntil(
      caches.keys()
        .then(cacheNames => {
          const promises = [];

          for (const name of cacheNames) {
            if (name !== CACHE_NAME) {
              promises.push(caches.delete(name));
            }
          }

          return Promise.all(promises);
        })
        .then(() => self.clients.claim())
    );
  } catch (err) {
    console.error('serviceWorker activate error:', err);
  }
});

async function hasServerChanges(request, cachedResponse) {
  try {
    const serverResponse = await fetch(request, {cache: 'no-store'});
    if (!serverResponse.ok) {
      return false;
    }

    const serverETag = serverResponse.headers.get('ETag');
    const serverLastModified = serverResponse.headers.get('Last-Modified');
    const cachedETag = cachedResponse ? cachedResponse.headers.get('ETag') : null;
    const cachedLastModified = cachedResponse ? cachedResponse.headers.get('Last-Modified') : null;

    if (!serverETag && !serverLastModified) {
      return true;
    }

    const hasETagChanged = serverETag && serverETag !== cachedETag;
    const hasLastModifiedChanged = serverLastModified && serverLastModified !== cachedLastModified;

    return hasETagChanged || hasLastModifiedChanged;
  } catch {
    return false;
  }
}

async function updateCache(request) {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(request, {cache: 'no-store'});
  if (response.ok && request.method === 'GET') {
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        const cachedResponse = await caches.match(event.request);

        if (!cachedResponse) {
          try {
            const response = await fetch(event.request, {cache: 'no-store'});
            if (response.ok && event.request.method === 'GET') {
              const cache = await caches.open(CACHE_NAME);
              await cache.put(event.request, response.clone());
            }
            return response;
          } catch {
            return Response.redirect('no-data-error.html', 302);
          }
        }

        const serverHasChanges = await hasServerChanges(event.request, cachedResponse);

        if (!serverHasChanges) {
          return cachedResponse;
        }

        try {
          return await updateCache(event.request);
        } catch {
          return cachedResponse;
        }
      } catch {
        return Response.redirect('no-data-error.html', 302);
      }
    })()
  );
});