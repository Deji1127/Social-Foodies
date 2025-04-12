// PreferencesScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function PreferencesScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(userDoc);
        if (snap.exists()) {
          setIsVisible(snap.data()?.visibleToOthers || false);
        }
      }
    };

    fetchPreferences();
  }, []);

  const toggleSwitch = async (value) => {
    setIsVisible(value);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, { visibleToOthers: value }, { merge: true });
    } catch (err) {
      console.error('Error saving preference:', err);
      Alert.alert('Error', 'Failed to save preferences');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Show my location to others:</Text>
      <Switch
        value={isVisible}
        onValueChange={toggleSwitch}
        thumbColor={isVisible ? '#B40324' : '#ccc'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
});
