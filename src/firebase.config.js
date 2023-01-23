// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXd8RYrokrLlGO5wgSK4gT7TIS9I3dzaU",
  authDomain: "megafood-8f4f3.firebaseapp.com",
  databaseURL: "https://megafood-8f4f3-default-rtdb.firebaseio.com",
  projectId: "megafood-8f4f3",
  storageBucket: "megafood-8f4f3.appspot.com",
  messagingSenderId: "1064487481538",
  appId: "1:1064487481538:web:5ab1ec89bec7fe0b2a4b5b",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
