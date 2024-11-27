import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from "../utils/colors";
import {fonts} from "../utils/fonts";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/social1.png")} 
        style={styles.logo} 
      />
      <Text style={styles.text}>Swipe. Meet. Eat.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButtonWrapper, {backgroundColor:colors.deepRed}]}>
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.SignUpButtonText}>Sign-Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softPink, // Keeps the background color the same
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  logo: {
    width: 400, // Adjust as needed
    height: 300, // Adjust as needed
    marginBottom: 20, // Adds space between the logo and text
  },
  text: {
    color: colors.darkAccent,
    fontSize: 30,
    fontFamily: fonts.Bold,
    textAlign: "center",
    marginTop:40, 
    marginVertical:20,
  },
  buttonContainer:{
    marginTop:40,
    flexDirection:"row",
    borderWidth:1,
    borderColor: colors.darkAccent,
    width:"90%",
    height:70,
    borderRadius:200,
  },
  loginButtonWrapper:{
    justifyContent:"center",
    alignItems:"center",
    width:"50%",
    borderRadius:98,
  },
  loginButtonText:{
    color: colors.softPink,
    fontSize:20,
    fontFamily: fonts.Extra

  },
   SignUpButtonText:{
    color: colors.darkAccent,
    fontSize:20,
    fontFamily: fonts.Extra

  },
});
