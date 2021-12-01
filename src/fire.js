import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgF9uW5ENhmsWfJWIwLQFZRePCMob5KJA",
    authDomain: "blooming-68b61.firebaseapp.com",
    projectId: "blooming-68b61",
    storageBucket: "blooming-68b61.appspot.com",
    messagingSenderId: "1001187701996",
    appId: "1:1001187701996:web:799e92893c5245bc0821c9"
  };
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire; 



