/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const platzinautas = 'platzinautas-site-v5';
const assets = [
  '/',
  'index.html',
  'js/app.js',
  'js/router.js',
  'js/data.js',
  'js/components/HomePage.js',
  'js/components/LaunchPage.js',
  'css/styles.css',
  'img/astronauta.png',
  'img/favicon.ico',
  'img/platzi-logo.png',
  'img/SpaceX_logo_black.svg.png',
]

// eslint-disable-next-line arrow-parens
self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(platzinautas).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== platzinautas) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    }),
  );
});
