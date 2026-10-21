// خلية العمل دون إنترنت: كاش أولًا. غيّر CACHE عند أي تعديل، وأضف أي ملف جديد لـ FILES.
const CACHE = 'istithan-v7';
const FILES = [
  './', 'index.html', 'css/style.css', 'manifest.webmanifest',
  'js/main.js', 'js/grid.js', 'js/store.js', 'js/form.js',
  'js/pdf.js', 'js/share.js', 'js/fit.js', 'js/install.js', 'js/vendor/html2canvas.min.js',
  'img/moe.png', 'img/school.png', 'img/icon-192.png', 'img/icon-512.png',
];

self.addEventListener('install', (e) =>
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));

self.addEventListener('activate', (e) =>
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim())));

self.addEventListener('fetch', (e) =>
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request))));
