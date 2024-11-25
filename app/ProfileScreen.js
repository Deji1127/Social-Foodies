import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { getUserProfile } from '../utils/firestoreHelper'; // Assuming the helper file
import { useNavigation } from '@react-navigation/native'; // For navigation

const ProfileScreen = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(userId);
      setUserProfile(profile);
    };

    fetchUserProfile();
  }, [userId]);

  if (!userProfile) return <Text>Loading...</Text>;

  return (
    <View>
      <Image source={{ uri: userProfile.photoURL }} style={{ width: 100, height: 100 }} />
      <Text>Name: {userProfile.name}</Text>
      <Text>Email: {userProfile.email}</Text>
      <Text>Preferences: {userProfile.preferences ? userProfile.preferences.join(', ') : 'None'}</Text>

      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('PreferencesScreen', { userId })}
      />
    </View>
  );
};

export default ProfileScreen;
