import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";


const ProfileContext = createContext();


const ProfileProvider = ({ children }) => {
 const [profile, setProfile] = useState({
   name: 'Chibi',
   email: 'Hello.World@example.com',
   bio: 'This is my bio and I love trying new places, grab a bite and be friends :)',
   picture: null,
 });


 return (
   <ProfileContext.Provider value={{ profile, setProfile }}>
     {children}
   </ProfileContext.Provider>
 );
};


const Profile = () => {
 const { profile, setProfile } = useContext(ProfileContext);
 const [editMode, setEditMode] = useState(false);
 const [name, setName] = useState(profile.name);
 const [email, setEmail] = useState(profile.email);
 const [bio, setBio] = useState(profile.bio);
 const [picture, setPicture] = useState(profile.picture);


 useEffect(() => {
   (async () => {
     if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
       if (status !== 'granted') {
         alert('Sorry, we need media permissions to pick an image!');
       }
     }
   })();
 }, []);


 const pickImage = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [1, 1],
     quality: 1,
   });


   if (result.assets && result.assets.length > 0) {
     const uri = result.assets[0].uri;
     setPicture(uri);
     setProfile((prev) => ({ ...prev, picture: uri }));
   }
 };


 const toggleEditMode = () => {
   if (editMode) {
     setProfile({ name, email, bio, picture });
   }
   setEditMode(!editMode);
 };


 return (
   <View style={styles.container}>
     <View style={styles.toolbar}>
       <TouchableOpacity>
         <Text style={styles.toolbarText}>Home</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text style={styles.toolbarText}>Restaurants</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text style={styles.toolbarText}>More</Text>
       </TouchableOpacity>
     </View>
    
     <View style={styles.profileHeader}>
       <TouchableOpacity onPress={pickImage} style={styles.pictureContainer} accessibilityLabel="Change Profile Picture">
         {picture ? (
           <Image source={{ uri: picture }} style={styles.picture} />
         ) : (
           <Image source={require('../assets/picpro.png')} style={styles.picture} />
         )}
       </TouchableOpacity>
       <Text style={styles.profileTitle}>Username Profile</Text>
     </View>
    
     <View style={styles.buttonsContainer}>
       <TouchableOpacity style={styles.customButton} accessibilityLabel="View Friends">
         <Text style={styles.buttonText}>Friends</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.customButton} accessibilityLabel="View Rewards">
         <Text style={styles.buttonText}>Rewards</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.customButton} accessibilityLabel="View Reviews">
         <Text style={styles.buttonText}>Reviews</Text>
       </TouchableOpacity>
     </View>
    
     <View style={styles.profileBox}>
       {editMode ? (
         <>
           <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
           <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
           <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} placeholder="Bio" multiline />
         </>
       ) : (
         <>
           <Text style={styles.info}>Name: {profile.name}</Text>
           <Text style={styles.info}>Email: {profile.email}</Text>
           <Text style={styles.info}>Bio: {profile.bio}</Text>
         </>
       )}
     </View>


     <TouchableOpacity style={styles.editButton} onPress={toggleEditMode} accessibilityLabel="Edit or Save Profile">
       <Feather name={editMode ? "check" : "edit"} size={24} color={'#B40324'} />
       <Text style={styles.editButtonText}>{editMode ? "Save" : "Edit Profile"}</Text>
     </TouchableOpacity>
   </View>
 );
};


const ProfileScreen = () => {
 return (
   <ProfileProvider>
     <Profile />
   </ProfileProvider>
 );
};


export default ProfileScreen;


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#CFAFA6',
   paddingTop: 10,
   paddingHorizontal: 20,
 },
 toolbar: {
   backgroundColor: '',
   flexDirection: 'row',
   justifyContent: 'space-around',
   paddingVertical: 15,
   marginBottom: 20,
 },
 toolbarText: {
   fontSize: 20,
   fontFamily: fonts.HelveticaNeue,
   color:' #CFAFA6',
 },
 profileHeader: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 profileTitle: {
   fontSize: 25,
   fontFamily: fonts.HelveticaNeue,
   color: '#2E2E2E',
   marginLeft: 20,
 },
 pictureContainer: {
   marginBottom: 20,
 },
 picture: {
   width: 120,
   height: 120,
   borderRadius: 60,
 },
 buttonsContainer: {
   flexDirection: 'row',
   gap: 10,
 },
 customButton: {
   backgroundColor: '#B40324',
   paddingVertical: 8,
   paddingHorizontal: 12,
   borderRadius: 4,
   marginBottom: 8,
 },
 editButton: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 8,
   padding: 10,
   backgroundColor: " ",
   borderRadius: 4,
 },
 editButtonText: {
   fontSize: 18,
   color: '',
 },
});
