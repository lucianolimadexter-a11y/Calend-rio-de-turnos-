const CACHE_NAME = 'escala-6x2-v19';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // A previsão do tempo vem de uma API externa e precisa sempre buscar dado novo
  // — nunca guardamos ela em cache, senão o clima trava numa data antiga pra sempre.
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request).catch(() => new Response('', {status: 503})));
    return;
  }
  // Pra página principal (index.html), sempre tenta buscar a versão mais nova da internet primeiro.
  // Só usa a cópia salva se estiver sem internet. Isso garante que atualizações apareçam na hora,
  // sem depender do navegador "decidir" quando checar por uma versão nova do Service Worker.
  const ehPaginaPrincipal = event.request.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname.endsWith('/');
  if (ehPaginaPrincipal) {
    event.respondWith(
      fetch(event.request).then((response) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => cached);
    })
  );
});
