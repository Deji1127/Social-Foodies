import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image, Platform } from 'react-native';
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Feather from "react-native-vector-icons/Feather";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getDoc } from "firebase/firestore";//store data 
import { db } from "../firebase"; // Ensure your Firestore db connected 

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: 'Foodie',
        email: 'Hello.Foodie@example.com',
        bio: 'This is my bio and I love trying new places, grab a bite and be friends :)',
        picture: null,
    });

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

//update profile  to store new chnages to firesbase 
const updateProfileInFirestore = async (userId, profileData) => {
    try {
        await setDoc(doc(db, "users", userId), profileData);
        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile: ", error);
    }
};

//when the user log in retrives the data using user authentication
const getProfileFromFirestore = async (userId, setProfile, setName, setEmail, setBio, setPicture) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const profileData = docSnap.data();
            setProfile(profileData);
            setName(profileData.name);
            setEmail(profileData.email);
            setBio(profileData.bio);
            setPicture(profileData.picture);
        } else {
            console.log("No profile data found.");
        }
    } catch (error) {
        console.error("Error fetching profile: ", error);
    }
};

const Main_page = () => {
    const navigation = useNavigation();
    const { profile, setProfile } = useContext(ProfileContext);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [bio, setBio] = useState(profile.bio);
    const [picture, setPicture] = useState(profile.picture); //captures

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need media permissions to pick an image!');
                }
            }
            //grabs info
            const userId = auth.currentUser?.uid;
            if (userId) {
                await getProfileFromFirestore(userId, setProfile, setName, setEmail, setBio, setPicture);
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

    const toggleEditMode = async () => {
        if (editMode) {
            const profileData = { name, email, bio, picture };
            const userId = auth.currentUser?.uid;
            if (userId) {
                await updateProfileInFirestore(userId, profileData);
            }
            setProfile(profileData);
        }
        setEditMode(!editMode);
    };

    //sign out user 
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            Alert.alert("Signed Out", "You have been signed out successfully.");
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } catch (error) {
            console.error("Sign Out Error:", error);
            Alert.alert("Error", "Something went wrong while signing out.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <TouchableOpacity onPress={pickImage} style={styles.pictureContainer}>
                    {picture ? (
                        <Image source={{ uri: picture }} style={styles.picture} />
                    ) : (
                        <Image source={require('../assets/new_profile.png')} style={styles.picture} />
                    )}
                </TouchableOpacity>
                <Text style={styles.profileTitle}>Welcome, {profile.name}!</Text>
            </View>

            <View style={styles.profileBox}>
                {editMode ? (
                    <>
                        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name:" />
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email:" keyboardType="email-address" />
                        <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} placeholder="Bio:" multiline />
                    </>
                ) : (
                    <>
                        <Text style={styles.info}>Name: {profile.name}</Text>
                        <Text style={styles.info}>Email: {profile.email}</Text>
                        <Text style={styles.info}>Bio: {profile.bio}</Text>
                    </>
                )}
            </View>



            <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
                <Feather name={editMode ? "check" : "edit"} size={35} color={'#B40324'} />
                <Text style={styles.editButtonText}>{editMode ? "Save" : "Edit Profile"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const App = () => {
    return (
        <ProfileProvider>
            <Main_page />
        </ProfileProvider>
    );
};

export default App;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#CFAFA6",
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    pictureContainer: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#B40324',
        padding: 5,
        borderRadius: 90,
    },
    picture: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    profileTitle: {
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileBox: {
        backgroundColor: '#CFAFA6',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        marginBottom: 20,
        width: '90%',
        borderWidth: 2,
        borderColor: '#B40324',
    },
    info: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        fontFamily: 'HelveticaNeue-Bold',
    },
    signOutButton: {
        backgroundColor: "#B40324",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 200,
        alignItems: 'center',
    },
    signOutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 10,
        borderRadius: 4,
    },
    editButtonText: {
        fontSize: 25,
        color: '#B40324',
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        fontSize: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#B40324',
        marginBottom: 6,
    },
});
