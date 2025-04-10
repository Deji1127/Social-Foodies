// Import necessary modules
import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
    return (
        <WebView 
            source={{ uri: 'file:///workspaces/Social-Foodies/MapFunctions/index.html' }} 
            style={{ flex: 1 }} 
        />
    );
};

export default WebViewScreen;
