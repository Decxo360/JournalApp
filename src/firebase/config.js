// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbsbu6rBrrTiKBbbbhff509xiNiSByc0E",
  authDomain: "react-journal-445da.firebaseapp.com",
  projectId: "react-journal-445da",
  storageBucket: "react-journal-445da.appspot.com",
  messagingSenderId: "824757734361",
  appId: "1:824757734361:web:9b98014d89b49296ade7c8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore( FirebaseApp)

