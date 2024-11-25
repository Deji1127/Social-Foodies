import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Adjust the path based on your setup

export async function findMatches(preferences) {
  try {
    const q = query(
      collection(db, 'users'),
      where('preferences.cuisines', 'array-contains-any', preferences.cuisines),
      where('preferences.dietaryRestrictions', 'array-contains-any', preferences.dietaryRestrictions)
    );

    const querySnapshot = await getDocs(q);
    const matches = [];
    querySnapshot.forEach((doc) => {
      matches.push({ id: doc.id, ...doc.data() });
    });

    return matches;
  } catch (error) {
    console.error('Error finding matches:', error.message);
    return [];
  }
}
