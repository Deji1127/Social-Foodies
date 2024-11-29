import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import  Login from './src/screen/Login';
import Sign from './src/screen/Sign';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{headerShown:false,

            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign" component={Sign} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
