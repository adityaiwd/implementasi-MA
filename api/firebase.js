import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCDghqwcB4hx485eONSsjZXAbLjOrJ7cCU",
  authDomain: "implementasi-ma.firebaseapp.com",
  projectId: "implementasi-ma",
  storageBucket: "implementasi-ma.appspot.com",
  messagingSenderId: "202131785178",
  appId: "1:202131785178:web:e1a533c2c1373b59ddece3",
};
// Initialize Firebases
var app
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}else {
  app = firebase.app(); // if already initialized, use that one
}

export default app;
