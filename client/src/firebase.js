import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/compat/app"
import { getAnalytics } from 'firebase/compat/analytics';
import { getAuth} from 'firebase/compat/auth'


  const firebaseConfig = {
    apiKey: "AIzaSyBtW_yUk_hJeyH4H9bvITYn4vfpHnkLxLQ",
    authDomain: "chat-app-6bb53.firebaseapp.com",
    projectId: "chat-app-6bb53",
    storageBucket: "chat-app-6bb53.appspot.com",
    messagingSenderId: "332795203656",
    appId: "1:332795203656:web:f2ccf9032b224e3829487d",
    measurementId: "G-FZ4WS69KVT"
  };
 
  // Initialize Firebase
  const firebaseapp = firebase.initializeApp(firebaseConfig)
  // firebaseapp.getAnalytics()
  const auth = firebase.auth()

  export { auth};
  export default firebaseapp; 