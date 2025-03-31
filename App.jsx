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


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
