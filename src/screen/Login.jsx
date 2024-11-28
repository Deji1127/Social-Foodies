import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React,{useState} from 'react';
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../utils/colors";
import { fonts } from '../utils/fonts';
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native';



const Login = () => {
  
  const navigation=useNavigation();
  const [secureEntery,setSecureEntery]=useState(true);
  const handleGoBack=()=>{
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Feather name={"arrow-left-circle"} color={colors.deepRed} size={40} />
      </TouchableOpacity>

      {/* Welcome Text */}
      <View style={styles.TextContainer}>
        <Text style={styles.headingText}>Welcome back!</Text>
        <Text style={styles.headingText}>Let’s find your next bite.</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
        
          <Fontisto name={"email"} size={20} color={colors.darkAccent}/>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.darkAccent}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
            <MaterialIcons name={"password"} size={20} color={colors.darkAccent}/>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.darkAccent}
            secureTextEntry={secureEntery}
          />
          <TouchableOpacity onPress={()=>{setSecureEntery((prev)=>!prev);}}>
            <SimpleLineIcons name={"eye"} size={20} color={colors.darkAccent}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
           <Text style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>
            or continue with
        </Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
            <AntDesign name={"google"} size={20} color={colors.deepRed}/>
            <Text style={styles.googleText}>
              Google
            </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>
            Don't have an account?
          </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softPink,
    padding: 40,
  },
  backButtonWrapper: {
    height: 60,
    width: 60,
    backgroundColor: colors.softPink,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  TextContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.darkAccent,
    fontFamily: fonts.Bold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.darkAccent,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection:"row",
    alignItems:"center",
    padding:2,
    marginVertical:10,
  },
  input: {
    flex:1,
    paddingHorizontal:10,
    height: 50,
    fontSize: 16,
    color: colors.darkAccent,
    fontFamily: fonts.Regular,
  },
  forgotPasswordText:{
    textAlign:"right",
    color:colors.darkAccent,
    fontFamily:fonts.Bold,
    marginVertical:10,

  },
  loginButtonWrapper:{
    backgroundColor:colors.deepRed,
    borderRadius:100,
    marginTop:20,
    borderWidth:2,
    borderColor:colors.deepRed,

  },
  loginText:{
    color:colors.softPink,
    fontSize:20,
    fontFamily:fonts.Extra,
    textAlign:"center",
    padding:10,
  },
  continueText:{
    textAlign:"center",
    marginVertical:20,
    fontSize:14,
    fontFamily:fonts.Bold,
    color:colors.darkAccent,
  },
  googleButtonContainer:{
    flexDirection:"row",
    borderWidth:2,
    borderColor: colors.darkAccent,
    borderRadius:100,
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    gap:10,
  },
  googleText:{
    color:colors.deepRed,
    fontSize:20,
    fontFamily:fonts.Extra,

  },
  footerContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginVertical:20,
    gap:5,
  },
  accountText:{
    color:colors.darkAccent,
    fontFamily:fonts.Bold,

  },
  signupText:{
    color:colors.darkAccent,
    fontFamily:fonts.Extra,

  },

});
