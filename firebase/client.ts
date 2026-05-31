// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCLxJVobdr_bmPT4inlttXEJaWIeiOsQM",
  authDomain: "ai-interview-9c9be.firebaseapp.com",
  projectId: "ai-interview-9c9be",
  storageBucket: "ai-interview-9c9be.firebasestorage.app",
  messagingSenderId: "497308532937",
  appId: "1:497308532937:web:02264a7ccfc16088248d18",
  measurementId: "G-E14G0ZHP87"
};

// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig):getApp();

export const auth=getAuth(app);
export const db = getFirestore(app);
