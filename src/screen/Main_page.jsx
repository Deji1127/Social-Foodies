import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const Main_page = () => {
    const navigation = useNavigation();

    // sign-out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            Alert.alert("Signed Out", "You have been signed out successfully.");

            //  go back to "Home"
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
            <Text style={styles.text}>Welcome to Your Profile!</Text>

            {/*  Button */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Main_page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f8f9fa",
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    signOutButton: {
        backgroundColor: "#ff3b30",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    signOutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

