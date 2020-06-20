var webPush = require('web-push')

const email = 'mailto:a.raziq.1992@gmail.com'
const vapidKeys = {
  publicKey: 'BJ8fEPE3smmkvDV7nPAkYWxWEKPkNK5wWNTZzihSQrnAUlh5r1CKPaB5ORh2qlO0RDIv1JQtvYGhbH2E7WD-ExU',
  privateKey: 'VAaBv398cVKgpcffRfu_51M-pDKdT9NShK0zRaueKWo'
}
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/c_pLAEyeXjM:APA91bHgWA7klfHwxSdReS3j7E1yrQDJsB1t1R2e8MtkJKi6_Mj4WFjgRF5WWLaV-WpqJfkaXuDm-Fx4r9s0ztK-m8Ls5-TErNUKX7IcaZ22JkjuZ8PEt4BAkvyHglK1SLHBBbSBXNdq',
  keys: {
    p256dh: 'BOtrTcQXZg5cwOtQvzScQV4zisBptvuxJbsUNcvXQOcMXMH3YEhjmdzFzHm0To49aPJfHNaKgpMxGdzXaQzWEFc=',
    auth: 'BjK/4qGEKdkAE03SQjOoJg=='
  }
}
const payload = 'Hai, ini notifikasi dari Football-App PWA!'
const options = {
  gcmAPIKey: '324074075219',
  TTL: 60
}

webPush.setVapidDetails(email, vapidKeys.publicKey, vapidKeys.privateKey)
webPush.sendNotification(pushSubscription, payload, options)
