import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDCGbSiWSYH3MtCzlUUncyxqmjj89_5fm4",
  authDomain: "nextblog-2b750.firebaseapp.com",
  projectId: "nextblog-2b750",
  storageBucket: "nextblog-2b750.appspot.com",
  messagingSenderId: "1029248936203",
  appId: "1:1029248936203:web:470383cd17c90932949a0e"
  };


if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}


