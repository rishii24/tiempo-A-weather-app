const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html']

const self = this

//Install Service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened Cache')

                return cache.addAll(urlsToCache)
            })
    )
})

//Listen to request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) //requesting updated data each time from API
                    .catch(() => caches.match('offline.html'))
            })
    )
})

//Activate the service worker
self.addEventListener('activate', (event) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    //If the specified version doesn't exist it'll be deleted
                    //and only version-1 is kept in cache
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                })
            ))
    )
})