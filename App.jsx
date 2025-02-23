import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import Login from './src/screen/Login';
import Sign from './src/screen/Sign';
import Main_page from './src/screen/Main_page';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,

            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign" component={Sign} />
                <Stack.Screen name="Main_page" component={Main_page} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
