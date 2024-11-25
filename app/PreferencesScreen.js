import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Slider } from 'react-native';
import { updateUserPreferences } from '../utils/firestoreHelper'; // Import the helper function

const PreferencesScreen = ({ route }) => {
  const { userId } = route.params; // Get userId from navigation params
  const [preferences, setPreferences] = useState({
    cuisines: '',
    dietaryRestrictions: '',
    searchRadius: 5, // default to 5 miles
  });

  const handleSavePreferences = async () => {
    await updateUserPreferences(userId, preferences);
    alert('Preferences saved!');
  };

  return (
    <View>
      <Text>Cuisines</Text>
      <TextInput
        value={preferences.cuisines}
        onChangeText={(text) => setPreferences({ ...preferences, cuisines: text })}
        placeholder="Enter cuisines (e.g., Mexican, Italian)"
      />
      
      <Text>Dietary Restrictions</Text>
      <TextInput
        value={preferences.dietaryRestrictions}
        onChangeText={(text) => setPreferences({ ...preferences, dietaryRestrictions: text })}
        placeholder="Enter dietary restrictions (e.g., Vegan)"
      />
      
      <Text>Search Radius</Text>
      <Slider
        value={preferences.searchRadius}
        onValueChange={(value) => setPreferences({ ...preferences, searchRadius: value })}
        minimumValue={1}
        maximumValue={50}
        step={1}
      />
      <Text>{preferences.searchRadius} miles</Text>

      <Button title="Save Preferences" onPress={handleSavePreferences} />
    </View>
  );
};

export default PreferencesScreen;
