var webPush = require('web-push')

const email = 'mailto:a.raziq.1992@gmail.com'
const vapidKeys = {
  publicKey: 'BJ8fEPE3smmkvDV7nPAkYWxWEKPkNK5wWNTZzihSQrnAUlh5r1CKPaB5ORh2qlO0RDIv1JQtvYGhbH2E7WD-ExU',
  privateKey: 'VAaBv398cVKgpcffRfu_51M-pDKdT9NShK0zRaueKWo'
}
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/cpo3zslunNY:APA91bETm1O9if7_Vnit3o2BlDsp5a-4Vw80ye1fssJ4-4DA9y-WWXkMCiUTfnxLIkv5_q_9zc00TITIKbcBmYt-FYj9xj4N-H2vT4WW7t8mlkktPogax1M7vd5DTQ9mv72PfjLTuzEQ',
  keys: {
    p256dh: 'BDG5Ralydps7JJFSdfFJOps2ff0Vb9UGw1g8uoWG9149xrLD/pCIKYXPC6CXrie68xZByjhmo5NmQBPYnw0RZ2E=',
    auth: 'HXMkPro0geYslyQLj6XEJg=='
  }
}
const payload = 'Hai, ini notifikasi dari Football-App PWA!'
const options = {
  gcmAPIKey: '324074075219',
  TTL: 60
}

webPush.setVapidDetails(email, vapidKeys.publicKey, vapidKeys.privateKey)
webPush.sendNotification(pushSubscription, payload, options)
