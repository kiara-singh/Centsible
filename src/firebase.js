// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD25YUB2um-KyCPmX76ZW-h53XdfhsajpI",
  authDomain: "centsible-336f1.firebaseapp.com",
  projectId: "centsible-336f1",
  storageBucket: "centsible-336f1.firebasestorage.app",
  messagingSenderId: "718601421272",
  appId: "1:718601421272:web:50b5b66ed83e0c7cfdf2ad",
  measurementId: "G-8HTYQP1FCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);