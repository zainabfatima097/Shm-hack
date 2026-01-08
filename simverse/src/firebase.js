// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGy81wJLzeqUuO0bneDOWax6DEtHVemh0",
  authDomain: "shms-8156d.firebaseapp.com",
  projectId: "shms-8156d",
  storageBucket: "shms-8156d.firebasestorage.app",
  messagingSenderId: "83575466414",
  appId: "1:83575466414:web:c0d409c0e934aa193b003f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
