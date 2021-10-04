// Import the functions you need from the SDKs you need

import firebase from 'firebase/app'
import  "firebase/auth";
import  "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdVDQ11HyT8J8-tvghW2jZJ3PL3r-w17o",
  authDomain: "signal-clone-b778b.firebaseapp.com",
  projectId: "signal-clone-b778b",
  storageBucket: "signal-clone-b778b.appspot.com",
  messagingSenderId: "414380966716",
  appId: "1:414380966716:web:5d53ab33facbe3ea611439"
};

let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
}

else{
  app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export {db,auth}