// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzOZ9g3NByk0mR63Q97ipQtSrXNRYW8rI",
  authDomain: "building-management-auth-61215.firebaseapp.com",
  projectId: "building-management-auth-61215",
  storageBucket: "building-management-auth-61215.firebasestorage.app",
  messagingSenderId: "66364798274",
  appId: "1:66364798274:web:0a06ea4de0dd9b93e7c4db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);