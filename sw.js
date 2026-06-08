/**
 * Service Worker — 离线缓存
 * 缓存所有静态资源，实现离线可用
 */

const CACHE_NAME = 'bmr-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/storage.js',
  '/js/calculator.js',
  '/js/food-db.js',
  '/js/meal-log.js',
  '/js/app.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install — 预缓存所有静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('SW cache addAll partial failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate — 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — 缓存优先策略
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // 命中缓存，直接返回
      if (cached) return cached;

      // 未命中，请求网络并缓存
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(() => {
        // 网络失败，尝试返回缓存（已在上方处理）
        // 如果是 HTML 请求，返回 index.html（SPA fallback）
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
