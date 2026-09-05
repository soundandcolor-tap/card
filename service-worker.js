const CACHE_NAME = 'sound-and-color-v22-download1';
const LOCAL_ASSETS = [
  './',
  './index.html',
  './presentacion.html',
  './manifest.webmanifest',
  './assets/js/tailwindcss.js',
  './assets/js/lucide.js',
  './assets/js/qrcode.min.js',
  './assets/fonts/inter.css',
  './assets/fonts/inter-400.ttf',
  './assets/fonts/inter-500.ttf',
  './assets/fonts/inter-600.ttf',
  './assets/fonts/inter-700.ttf',
  './assets/images/perfil.png',
  './assets/images/sound-and-color-logo.png',
  './assets/images/sound-and-color-app-icon-192.png',
  './assets/images/sound-and-color-app-icon-512.png',
  './assets/images/sound-and-color-apple-touch-icon.png',
  './assets/images/sound-and-color-contact.jpg',
  './Sound_And_Color.vcf',
  './assets/images/og.png',
  './assets/flags/guatemala.svg',
  './assets/flags/panama.svg',
  './assets/flags/honduras.svg',
  './assets/flags/el-salvador.svg',
  './assets/flags/nicaragua.svg',
  './assets/flags/costa-rica.svg',
  './assets/flags/dominicana.svg',
  './assets/flags/jamaica.svg',
  './assets/flags/bahamas.svg',
  './assets/flags/trinidad-tobago.svg',
  './assets/flags/curazao.svg',
  './assets/flags/colombia.svg',
  './assets/flags/peru.svg',
  './assets/flags/argentina.svg',
  './assets/images/blanqueamiento.jpg',
  './assets/images/diseno-sonrisa.jpg',
  './assets/images/implantes.jpg',
  './assets/images/endodoncia.jpg',
  './assets/images/periodoncia.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(LOCAL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // Let the browser handle the presentation without caching it as the card page.
  if (new URL(event.request.url).pathname.endsWith('/Presentacion-Sound-And-Color.pdf')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match(new URL(event.request.url).pathname.endsWith('/presentacion.html') ? './presentacion.html' : './index.html')))
    );
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
