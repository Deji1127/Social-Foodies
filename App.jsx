import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import Login from './src/screen/Login';
import Sign from './src/screen/Sign';
import InboxScreen from './src/screen/InboxScreen';
import ChatScreen from './src/screen/ChatScreen';
import NewMessageScreen from './src/screen/NewMessageScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign" component={Sign} />
                <Stack.Screen name="Inbox" component={InboxScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="NewMessage" component={NewMessageScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;