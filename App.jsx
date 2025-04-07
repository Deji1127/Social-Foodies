// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import Login from './src/screen/Login';
import Sign from './src/screen/Sign';
import Profile from './src/screen/Bio';
import Rewards from './src/screen/Rewards';
import Friends from './src/screen/Friends';

// Inside your navigator (likely a Stack or Tab.Navigator):


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign" component={Sign} />
          <Stack.Screen name="Bio" component={Profile} />
          <Stack.Screen name="Rewards" component={Rewards}></Stack.Screen>
          <Stack.Screen name="Friends" component={Friends}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    
  );
};

export default App;
