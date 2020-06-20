import urlBase64ToUint8Array from '../utils/urlbase64toint8array'

/**
 * Mendaftar service worker
 */
const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js')
      console.log('Pendaftaran ServiceWorker berhasil')
    } catch (e) {
      throw new Error('Pendaftaran ServiceWorker gagal', e)
    }
  } else {
    throw new Error('Browser ini tidak mendukung ServiceWorker.')
  }
}

/**
 * Meminta ijin untuk menampilkan notifikasi.
 * Jika diijinkan maka dilakukan langganan (subscribe) pesan push.
 */
const requestPermission = async () => {
  if ('Notification' in window) {
    const result = await Notification.requestPermission()

    if (result === 'denied') {
      console.log('Fitur notifikasi tidak diijinkan.')
      return
    } else if (result === 'default') {
      console.error('Pengguna menutup kotak dialog permintaan ijin.')
      return
    }

    if (('PushManager' in window)) {
      try {
        const registration = await navigator.serviceWorker.ready
        const subscribe = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BJ8fEPE3smmkvDV7nPAkYWxWEKPkNK5wWNTZzihSQrnAUlh5r1CKPaB5ORh2qlO0RDIv1JQtvYGhbH2E7WD-ExU')
        })

        console.log('Endpoint:', subscribe.endpoint)
        console.log('p256dh key:', btoa(String.fromCharCode.apply(null,
          new Uint8Array(subscribe.getKey('p256dh')))))
        console.log('Auth key:', btoa(String.fromCharCode.apply(null,
          new Uint8Array(subscribe.getKey('auth')))))
      } catch (e) {
        console.error('Tidak dapat melakukan subscribe =>', e.message)
      }
    }
  } else {
    console.error('Browser ini tidak mendukung Notification.')
  }
}

window.addEventListener('load', async () => {
  try {
    await registerSW()
    await requestPermission()
  } catch (e) {
    console.error(e)
  }
})
