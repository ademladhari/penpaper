// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-buCcudEStUQ7uePja48swSXsuspzWpU",
  authDomain: "david2-5db57.firebaseapp.com",
  projectId: "david2-5db57",
  storageBucket: "david2-5db57.appspot.com",
  messagingSenderId: "643703640339",
  appId: "1:643703640339:web:f1f2d68b761f96d7ba8ae6",
  measurementId: "G-PEMV0GGF3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const auth = getAuth(app);
