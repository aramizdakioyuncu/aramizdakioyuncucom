// ARMOYU service worker: sayfa çevrimdışı da açılsın.
// - /_next/static (adı içeriğe göre değişen JS / CSS): önce önbellek
// - sayfalar ve diğer aynı kaynaklı dosyalar: önce ağ, ağ yoksa son kayıtlı hâl (yeni yayın eski sayfada takılmasın diye)
// - /api (Hono'ya giden proxy) hiç önbelleğe girmez; kullanıcı verisi yalnızca uygulamanın localStorage önbelleğinde
// shortcut: sayfa önbelleği sınırsız büyür ve resimler saklanmaz; gerekirse sayı sınırı ve resim önbelleği eklenecek
const VERSION = 'v1';
const STATIC_CACHE = `armoyu-static-${VERSION}`;
const PAGE_CACHE = `armoyu-pages-${VERSION}`;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = [STATIC_CACHE, PAGE_CACHE];
    for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) (await caches.open(STATIC_CACHE)).put(request, response.clone());
      return response;
    })());
    return;
  }

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok) (await caches.open(PAGE_CACHE)).put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      // Hiç açılmamış sayfa: ana sayfanın kabuğu (istemci tarafı yönlendirme sonrasını halleder)
      if (request.mode === 'navigate') {
        const home = await caches.match('/');
        if (home) return home;
      }
      throw error;
    }
  })());
});
