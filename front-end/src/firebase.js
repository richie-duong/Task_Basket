// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFVjlI5Kt7KH30PixQsntUAw3ipkVkDTI",
  authDomain: "task-basket-ea6a9.firebaseapp.com",
  projectId: "task-basket-ea6a9",
  storageBucket: "task-basket-ea6a9.firebasestorage.app",
  messagingSenderId: "377379938540",
  appId: "1:377379938540:web:1ca76a27b6da24a2cd05c9",
  measurementId: "G-ERND6B70EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);