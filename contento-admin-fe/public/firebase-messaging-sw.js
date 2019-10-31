// importScripts('https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/6.4.0/firebase-messaging.js')

// var config = {
//   messagingSenderId: '2087355189'
// }

// firebase.initializeApp(config)

// const messaging = firebase.messaging()

// //Chay khi web bi che(100%)

// messaging.setBackgroundMessageHandler(function (payload) {
//   const notificationTitle = 'Title Thong Bao'
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/static/images/logo.png'
//   }

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   )
// })

// //Chay khi web bi che(ko 100%)
// self.addEventListener('notificationclick', function (event) {
//   let url = 'http://localhost:8080/'
//   event.notification.close()
//   event.waitUntil(
//     clients.matchAll({ type: 'window' }).then(windowClients => {
//       for (var i = 0; i < windowClients.length; i++) {
//         var client = windowClients[i]
//         if (client.url === url && 'focus' in client) {
//           return client.focus()
//         }
//       }
//       if (clients.openWindow) {
//         return clients.openWindow(url)
//       }
//     })
//   )
// })
