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

registerRoute(
  // Icon font
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({ cacheName: 'google-fonts' })
)

registerRoute(
  // Data dari api.football-data
  ({ url }) => url.origin === 'https://api.football-data.org',
  new NetworkFirst({ cacheName: 'football-data' })
)

registerRoute(
  // Gambar dari upload.wikimedia.org
  ({ url, request }) => (url.origin === 'https://upload.wikimedia.org') && (request.destination === 'image'),
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
