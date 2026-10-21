// خلية العمل دون إنترنت: شبكة أولاً ثم كاش. غيّر CACHE عند أي تعديل، وأضف أي ملف جديد لـ FILES.
const CACHE = 'istithan-v13';
const FILES = [
  './', 'index.html', 'css/style.css', 'manifest.webmanifest',
  'js/early.js', 'js/main.js', 'js/grid.js', 'js/store.js', 'js/form.js', 'js/sheet.js', 'js/drag.js',
  'js/pdf.js', 'js/share.js', 'js/fit.js', 'js/install.js', 'js/vendor/html2canvas.min.js',
  'img/moe.png', 'img/school.png', 'img/icon-192.png', 'img/icon-512.png',
];

self.addEventListener('install', (e) =>
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));

self.addEventListener('activate', (e) =>
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim())));

// الشبكة أولاً (يصل آخر تحديث دائماً) ثم الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request, { cache: 'no-cache' })
    .then((r) => { const c = r.clone(); caches.open(CACHE).then((ch) => ch.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
