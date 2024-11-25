import { Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import PreferencesScreen from './screens/PreferencesScreen';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        {/* Profile Screen */}
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
        />
        
        {/* Preferences Screen */}
        <Stack.Screen 
          name="Preferences" 
          component={PreferencesScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;