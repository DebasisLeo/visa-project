// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBigHL9uzq4jI8LEpPa3jnUunsU_fwHtI4",
  authDomain: "sunflower-project-416c5.firebaseapp.com",
  projectId: "sunflower-project-416c5",
  storageBucket: "sunflower-project-416c5.firebasestorage.app",
  messagingSenderId: "696741045500",
  appId: "1:696741045500:web:c6c9f815c1349f1ce52379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);