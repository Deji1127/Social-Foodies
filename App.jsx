import React from 'react';
import { StatusBar } from 'expo-status-bar'; // Add this import
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import Login from './src/screen/Login';
import Sign from './src/screen/Sign';
import InboxScreen from './src/screen/InboxScreen';
import ChatScreen from './src/screen/ChatScreen';
import NewMessageScreen from './src/screen/NewMessageScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#A40000',
        background: '#FFF5E7',
        card: '#FFF5E7',
        text: '#000000',
        border: '#A40000',
    },
};

// Create a press style constant to reuse across components
export const pressStyle = {
    backgroundColor: 'rgba(164, 0, 0, 0.1)'
};

const App = () => {
    return (
        <>
            <StatusBar style="dark" backgroundColor="#FFF5E7" />
            <NavigationContainer theme={MyTheme}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Sign" component={Sign} />
                    <Stack.Screen name="Inbox" component={InboxScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="NewMessage" component={NewMessageScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;