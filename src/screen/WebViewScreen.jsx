// Import necessary modules
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
    const uri = '/workspaces/Social-Foodies/MapFunctions/index.html';
    
    return (
        <View style={styles.container}>
            {Platform.OS === 'web' ? (
                // For web, use an iframe to load the HTML
                <iframe 
                    src={uri}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            ) : (
                // For mobile, use WebView
                <WebView 
                    source={{ uri }} 
                    style={{ flex: 1 }} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WebViewScreen;
