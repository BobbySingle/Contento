import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyC3hT38nm5lpmW9i1EW59_60xkSnFm2SL4",
  authDomain: "contento-admin.firebaseapp.com",
  databaseURL: "https://contento-admin.firebaseio.com",
  projectId: "contento-admin",
  storageBucket: "contento-admin.appspot.com",
  messagingSenderId: "2087355189",
  appId: "1:2087355189:web:5b6f50805332674782c27c",
  measurementId: "G-8PDNKTNQ2H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;

Vue.prototype.$messaging = firebase.messaging()

navigator.serviceWorker
  .register('/firebase-messaging-sw.js')
  .then(registration => {
    Vue.prototype.$messaging.useServiceWorker(registration)
  })
  .catch(err => {
    console.log(err)
  })
