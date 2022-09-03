// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1ytVeBh1stejqPehSCXhelJflJS2bhwI",
  authDomain: "game-of-life-3cb34.firebaseapp.com",
  projectId: "game-of-life-3cb34",
  storageBucket: "game-of-life-3cb34.appspot.com",
  messagingSenderId: "205104144420",
  appId: "1:205104144420:web:b97644c43c7bbb171a78b1",
  measurementId: "G-CXTS37QLQ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);