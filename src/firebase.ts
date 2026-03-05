import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
 apiKey: "AIzaSyDk8Wri4lBHvPJW_q-5-9linas0aOJus7s",
  authDomain: "this-is-killing-me-f8461.firebaseapp.com",
  projectId: "this-is-killing-me-f8461",
  storageBucket: "this-is-killing-me-f8461.firebasestorage.app",
  messagingSenderId: "23821002883",
  appId: "1:23821002883:web:d3f85f4e5afdc81fe393b6"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
