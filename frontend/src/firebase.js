// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-system-e3cc5.firebaseapp.com",
  projectId: "real-estate-system-e3cc5",
  storageBucket: "real-estate-system-e3cc5.appspot.com",
  messagingSenderId: "111819441221",
  appId: "1:111819441221:web:f0e79d775c6af259568f2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);