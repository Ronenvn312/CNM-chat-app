import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

// Firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyBtW_yUk_hJeyH4H9bvITYn4vfpHnkLxLQ",
  authDomain: "chat-app-6bb53.firebaseapp.com",
  projectId: "chat-app-6bb53",
  storageBucket: "chat-app-6bb53.appspot.com",
  messagingSenderId: "332795203656",
  appId: "1:332795203656:web:f2ccf9032b224e3829487d",
  measurementId: "G-FZ4WS69KVT"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
