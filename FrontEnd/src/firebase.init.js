// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPqG7qUQYoW2vpUjPcK8ABwyjsRk-p3eY",
  authDomain: "web-lead-ba593.firebaseapp.com",
  projectId: "web-lead-ba593",
  storageBucket: "web-lead-ba593.firebasestorage.app",
  messagingSenderId: "259358606867",
  appId: "1:259358606867:web:804967b6cc0e21431321e6",
  measurementId: "G-BD5XG9GC4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;