// authHelper.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Sign up
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential; // userCredential contains user data
  } catch (error) {
    console.error("Error during sign-up: ", error.message);
    throw error;
  }
}

// Log in
export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // userCredential contains user data
  } catch (error) {
    console.error("Error during login: ", error.message);
    throw error;
  }
}
