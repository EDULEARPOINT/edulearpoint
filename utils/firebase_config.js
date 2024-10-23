import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDgrW08-e-X_hD8tCLlKDOnHs0t82KUiE0",
  authDomain: "edulearpoint-7030a.firebaseapp.com",
  projectId: "edulearpoint-7030a",
  storageBucket: "edulearpoint-7030a.appspot.com",
  messagingSenderId: "1090369013386",
  appId: "1:1090369013386:web:324e9ff80f9257e34e4f73",
  measurementId: "G-NPZ7NBM26C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
const Provider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage(app)



export {Auth, Provider, db, storage};