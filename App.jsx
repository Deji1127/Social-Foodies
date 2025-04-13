import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import Login from './src/screen/Login';
import Sign from './src/screen/Sign';
import Bio from './src/screen/Bio';
import MainPage from "./src/screen/MainPage";
import Rewards from "./src/screen/Rewards";
import BottomTab from "./src/screen/BottomTab";
import Friends from "./src/screen/Friends";
import Inbox from "./src/screen/Inbox.jsx";
import ChatScreen from "./src/screen/ChatScreen.jsx";
import NewMessageScreen from "./src/screen/NewMessageScreen.jsx";
import WebViewScreen from './src/screen/WebViewScreen.jsx'; // Import the WebView screen
import MenuButton from './src/screen/MenuButton.jsx'; // Import the WebView screen
import PreferencesScreen from './src/screen/PreferencesScreen.jsx'; // Import the WebView screen
import Terms from './src/screen/Terms.jsx';/// TERMS CONDITONSSSSS JUST UPDATED




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
                <Stack.Screen name="Bio" component={Bio} />
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="Rewards" component={Rewards} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="Friends" component={Friends} />
                <Stack.Screen name="Inbox" component={Inbox} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="NewMessage" component={NewMessageScreen} />
                <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
                <Stack.Screen name="MenuButton" component={MenuButton}/>
                <Stack.Screen name="PreferencesScreen" component={PreferencesScreen}/>
                <Stack.Screen name="Terms" component={Terms} /> 





            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default App;