// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA76MVcxoVhXUVz1LjkHwxsstRcXE87E6A",
  authDomain: "warg-b9231.firebaseapp.com",
  projectId: "warg-b9231",
  storageBucket: "warg-b9231.appspot.com",
  messagingSenderId: "1074045275763",
  appId: "1:1074045275763:web:f630ebb8d07aa90f7ea406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });

// Initialize Storage
const storage = getStorage(app);

export { app,  storage };