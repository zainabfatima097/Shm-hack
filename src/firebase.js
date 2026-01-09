// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCf8Yx6K2ADAwL_Zrg4prjVfVrLFKQLmrQ",
  authDomain: "zeee-dd466.firebaseapp.com",
  projectId: "zeee-dd466",
  storageBucket: "zeee-dd466.firebasestorage.app",
  messagingSenderId: "422400124405",
  appId: "1:422400124405:web:9f7cb2aaa528d4aa72ecbc",
  measurementId: "G-7GDLJ5T4NY"
};

const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
