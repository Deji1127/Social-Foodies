import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image, Platform, FlatList, ScrollView } from 'react-native';
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Feather from "react-native-vector-icons/Feather";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProfileContext = createContext();

const sampleReviews = [
    {
        id: '1',
        name: '97 West Kitchen & Bar',
        image: require('../assets/picpro.png'),
    },
    {
        id: '2',
        name: 'Austin Pets Alive!',
        image: require('../assets/mrbean.png'),
    },
    {
        id: '3',
        name: '61 Osteria',
        image: require('../assets/social1.png'),
    },
];

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

const updateProfileInFirestore = async (userId, profileData) => {
    try {
        await setDoc(doc(db, "users", userId), profileData, { merge: true });
        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile: ", error);
    }
};

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

const Bio = () => {
    const navigation = useNavigation();
    const { profile, setProfile } = useContext(ProfileContext);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [bio, setBio] = useState(profile.bio);
    const [picture, setPicture] = useState(profile.picture);
    const [reviews, setReviews] = useState(sampleReviews);

    const removeReview = (id) => {
        setReviews((prevReviews) => prevReviews.filter(review => review.id !== id));
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need media permissions to pick an image!');
                }
            }
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
      
          // ✅ Add this line for debugging:
          console.log("Saving profileData:", profileData);
      
          const userId = auth.currentUser?.uid;
          if (userId) {
            await updateProfileInFirestore(userId, profileData);
            await getProfileFromFirestore(userId, setProfile, setName, setEmail, setBio, setPicture); // refresh from Firestore
          }
        }
        setEditMode(!editMode);
      };
      
      

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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                
                <TouchableOpacity onPress={pickImage} style={styles.pictureContainer}>
                    {picture ? (
                        <Image source={{ uri: picture }} style={styles.picture} />
                    ) : (
                        <Image source={require('../assets/mrbean.png')} style={styles.picture} />
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

            <View style={styles.buttonRowHorizontal}>
                


            <View style={styles.buttonRowHorizontal}>
                 <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Friends')}>
              <Text style={styles.featureButtonText}>Friends</Text>
              </TouchableOpacity>
                 <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Rewards')}>
              <Text style={styles.featureButtonText}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}><Text style={styles.featureButtonText}>Reviews</Text></TouchableOpacity>
            </View>
            </View>

            <Text style={styles.reviewHeader}>Share your experience</Text>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <TouchableOpacity onPress={() => removeReview(item.id)} style={styles.absoluteClose}>
                       <Feather name="x" size={18} style={styles.closeIcon} />
                    </TouchableOpacity>

                        <Image source={item.image} style={styles.reviewImage} />
                        <View style={styles.reviewContent}>
                            <Text style={styles.reviewTitle}>{item.name}</Text>
                            <Text style={styles.reviewQuestion}>Do you recommend this business?</Text>
                            <View style={styles.choiceRow}>
                                <TouchableOpacity style={styles.choiceButton}><Text>Yes</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.choiceButton}><Text>No</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.choiceButton}><Text>Maybe</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 10, paddingHorizontal:14}}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const App = () => {
    return (
        <ProfileProvider>
            <Bio />
        </ProfileProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#CFAFA6",
        paddingBottom: 50,
    },
   profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,
},

    pictureContainer: {
        marginBottom: 0,
        marginTop: 100,
        borderWidth: 2,
        borderColor: '#B40324',
        borderRadius: 55,
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileTitle: {
        marginLeft: 10,
        marginTop:50,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    profileBox: {
        backgroundColor: '#CFAFA6',
        borderRadius: 12,
        padding: 12, // reduced padding
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 16,
        width: '85%', // slightly narrower if desired
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
        gap: 2,
        padding: 2,
        borderRadius: 2,
    },
    editButtonText: {
        fontSize: 16,
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
    reviewHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
        color: '#333',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
    },
    reviewCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 8,
        marginBottom: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: '100%',             // ✅ shrink the card width
      },
      
    reviewImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
    },
    reviewTitle: {
        fontWeight: '600',
        fontSize: 18,
    },
    reviewQuestion: {
        color: '#444',
        fontSize: 15,
        marginTop: 6,
        marginBottom: 10,
    },
    choiceButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#eee',
        borderRadius: 6,
    },
    closeIcon: {
        color: '#888',
        padding: 6,
    },
    buttonRowHorizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        marginBottom: 20,
    },
    featureButton: {
        backgroundColor: '#B40324',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    featureButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',

    },
    absoluteClose: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
      },
      
});
