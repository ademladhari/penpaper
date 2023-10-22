// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9F7guhjtz2NhUwj5HJy7-WeKelc6uDN0",
  authDomain: "david-site-e94a7.firebaseapp.com",
  projectId: "david-site-e94a7",
  storageBucket: "david-site-e94a7.appspot.com",
  messagingSenderId: "732236759840",
  appId: "1:732236759840:web:c884f28012506bbca64d45",
  measurementId: "G-MZG6TSH9BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)