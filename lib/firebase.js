import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBgtlLJtQEUE23v29uo9LR-TNlBW7peNNQ",
  authDomain: "easel-work.firebaseapp.com",
  databaseURL: "https://easel-work.firebaseio.com",
  projectId: "easel-work",
  storageBucket: "easel-work.appspot.com",
  messagingSenderId: "509555861833",
  appId: "1:509555861833:web:72251d1856b40f3b401298"
}

let app

if (firebase.apps.length < 1) {
  app = firebase.initializeApp(config)
}

const db = firebase.firestore()

if (typeof window != 'undefined' && window.location.hostname === 'localhost') {
  db.settings({
    host: "localhost:6001",
    ssl: false
  })
}

export default app
export { db }
