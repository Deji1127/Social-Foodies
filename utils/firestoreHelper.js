import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';


/*
Creating a user profile: In your sign-up logic (after user authentication 
is successful), call createUserProfile(userId, profileData) to create the profile in Firestore.
 */
export async function createUserProfile(userId, profileData) {
  try {
    await setDoc(doc(db, 'users', userId), profileData);
    console.log('User profile created');
  } catch (error) {
    console.error('Error creating profile:', error.message);
  }
}

/*
Fetching the user profile: In components/screens where you need to 
display user profile data, use getUserProfile(userId) to retrieve it.
 */
export async function getUserProfile(userId) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}


/*
Updating preferences: Call updateUserPreferences(userId, preferences) 
when the user saves or updates their dining preferences in the app 
(e.g., after they submit a form to update preferences).
 */
export async function updateUserPreferences(userId, preferences) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { preferences }, { merge: true });
    console.log('Preferences updated');
  } catch (error) {
    console.error('Error updating preferences:', error.message);
  }
}

/*
uploadProfilePicture: This function uploads the image to 
Firebase Storage and returns the download URL.
*/
export async function uploadProfilePicture(userId, file) {
    const fileRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    return photoURL;
}
  
/*saveProfilePicture: This function calls uploadProfilePicture to 
upload the image, and then saves the URL in Firestore by calling updateUserProfile.
*/
export async function saveProfilePicture(userId, file) {
    try {
        const photoURL = await uploadProfilePicture(userId, file);
        await updateUserProfile(userId, { photoURL });
        console.log('Profile picture uploaded and URL saved');
    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
    }
}

/*updateUserProfile: This function is responsible for saving or updating 
user information in Firestore, including the photo URL.*/
export async function updateUserProfile(userId, updateData) {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, updateData, { merge: true });
        console.log('Profile updated');
    } catch (error) {
        console.error('Error updating profile:', error.message);
    }
}