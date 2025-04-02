
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";


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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);