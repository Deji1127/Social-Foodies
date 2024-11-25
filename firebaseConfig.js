// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCidJhQ5JORXwpFCIZEgzhthq9uUeo2cX4",
  authDomain: "social-foodies-f72f1.firebaseapp.com",
  projectId: "social-foodies-f72f1",
  storageBucket: "social-foodies-f72f1.firebasestorage.app",
  messagingSenderId: "48751409708",
  appId: "1:48751409708:web:b71753ab0db62f2487ef89",
  measurementId: "G-GVQ6PYSL75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;