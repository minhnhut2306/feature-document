const CACHE = 'arena-docs-v2';
const SHELL = [
  './index.html',
  './app.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Cài đặt: cache app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  self.skipWaiting();
});

// Kích hoạt: xóa cache cũ
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback network
self.addEventListener('fetch', e => {
  // Bỏ qua request không phải GET
  if (e.request.method !== 'GET') return;

  // manifest.json (data) → network first để luôn có data mới nhất
  if (e.request.url.includes('manifest.json')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Còn lại: cache first, nếu miss thì fetch + cache lại
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
