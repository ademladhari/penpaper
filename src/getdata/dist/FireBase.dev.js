"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.db = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

var _auth = require("firebase/auth");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB9F7guhjtz2NhUwj5HJy7-WeKelc6uDN0",
  authDomain: "david-site-e94a7.firebaseapp.com",
  databaseURL: "https://david-site-e94a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "david-site-e94a7",
  storageBucket: "david-site-e94a7.appspot.com",
  messagingSenderId: "732236759840",
  appId: "1:732236759840:web:c884f28012506bbca64d45",
  measurementId: "G-MZG6TSH9BD"
}; // Initialize Firebase
// Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var db = (0, _firestore.getFirestore)(app);
exports.db = db;
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;