import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

skipWaiting()
clientsClaim()

// precache hasil build webpack
precacheAndRoute(self.__WB_MANIFEST, { ignoreURLParametersMatching: [/.*/] })

// Google font
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30
      })
    ]
  })
)

// Data dari api.football-data
registerRoute(
  ({ url }) => url.origin === 'https://api.football-data.org',
  new NetworkFirst({ cacheName: 'football-data' })
)

// Gambar dari upload.wikimedia.org
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 150,
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
)

// Menangani notifikasi push message
self.addEventListener('push', event => {
  const body = event.data ? event.data.text() : 'Push message no payload'
  var options = {
    body: body,
    icon: 'assets/icons/app-icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  event.waitUntil(
    self.registration.showNotification('Football-PWA App', options)
  )
})
