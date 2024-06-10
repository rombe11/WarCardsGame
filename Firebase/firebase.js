import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyDslzkrhcWOalUYY2-UiKEg3ynkJ7oYq-g",
  authDomain: "wargame-77532.firebaseapp.com",
  projectId: "wargame-77532",
  storageBucket: "wargame-77532.appspot.com",
  messagingSenderId: "1016968053452",
  appId: "1:1016968053452:web:e779cedce0de62b44db869",
  measurementId: "G-NK4BJKDRML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);