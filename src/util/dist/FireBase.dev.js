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
var firebaseConfig = {
  apiKey: "AIzaSyA-buCcudEStUQ7uePja48swSXsuspzWpU",
  authDomain: "david2-5db57.firebaseapp.com",
  projectId: "david2-5db57",
  storageBucket: "david2-5db57.appspot.com",
  messagingSenderId: "643703640339",
  appId: "1:643703640339:web:f1f2d68b761f96d7ba8ae6",
  measurementId: "G-PEMV0GGF3G"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var db = (0, _firestore.getFirestore)(app);
exports.db = db;
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;