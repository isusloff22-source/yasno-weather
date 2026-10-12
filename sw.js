const CACHE = 'yasno-v2';
const SCOPE = new URL(self.registration.scope);
const STATIC_FILES = [
  'index.html',
  'privacy.html',
  'manifest.json',
  'moon-times.js',
  'icon-192.png',
  'icon-512.png'
];
const HTML_FILES = new Set(['index.html', 'privacy.html']);
const STATIC_URLS = STATIC_FILES.map(file => new URL(file, SCOPE).href);
const STATIC_PATHS = new Set(STATIC_URLS.map(url => new URL(url).pathname));

self.addEventListener('install', event => {
  event.waitUntil(Promise.all([
    caches.open(CACHE).then(cache => cache.addAll(STATIC_URLS)),
    self.skipWaiting()
  ]));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith('yasno-') && name !== CACHE)
      .map(name => caches.delete(name)));
    await clients.claim();
  })());
});

function isWithinScope(url) {
  return url.origin === SCOPE.origin && url.pathname.startsWith(SCOPE.pathname);
}

function canonicalStaticUrl(request) {
  const url = new URL(typeof request === 'string' ? request : request.url);
  url.search = '';
  url.hash = '';
  return url.href;
}

function cachedStaticResponse(request) {
  return caches.open(CACHE).then(cache => cache.match(canonicalStaticUrl(request)));
}

async function networkFirstHtml(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(canonicalStaticUrl(request), response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cachedStaticResponse(request);
    if (cached) return cached;
    throw error;
  }
}

async function cacheFirstAsset(request) {
  const cached = await cachedStaticResponse(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    await cache.put(canonicalStaticUrl(request), response.clone());
  }
  return response;
}

async function navigationWithOfflineFallback(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const indexUrl = new URL('index.html', SCOPE).href;
    const cached = await cachedStaticResponse(indexUrl);
    if (cached) return cached;
    throw error;
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!isWithinScope(url)) return;

  if (STATIC_PATHS.has(url.pathname)) {
    const file = url.pathname.slice(SCOPE.pathname.length);
    if (HTML_FILES.has(file)) {
      event.respondWith(networkFirstHtml(request));
    } else {
      event.respondWith(cacheFirstAsset(request));
    }
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(navigationWithOfflineFallback(request));
  }
});
