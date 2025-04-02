self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('schnitzeljagd-cache-v1').then((cache) => {
            return cache.addAll([
                '/community-pwa/',
                '/community-pwa/index.html',
                '/community-pwa/manifest.json',
                '/community-pwa/icons/icon-192x192.png',
                '/community-pwa/icons/icon-512x512.png',
                // Add other assets to cache as needed
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['schnitzeljagd-cache-v1'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});