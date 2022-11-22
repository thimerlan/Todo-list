import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz0SM_7spyB1RGfQkCESTlGhrr-4scL8A",
  authDomain: "notes-e3b42.firebaseapp.com",
  projectId: "notes-e3b42",
  storageBucket: "notes-e3b42.appspot.com",
  messagingSenderId: "763700708138",
  appId: "1:763700708138:web:e983d43397b781b7c01453",
  measurementId: "G-WTBC9RKJVH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
