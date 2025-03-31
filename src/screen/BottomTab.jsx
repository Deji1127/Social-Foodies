import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const BottomTab = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MainPage')}>
                <Feather name="home" size={28} color="#B40324" />
                <Text style={styles.tabLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Rewards')}>
                <Feather name="gift" size={28} color="#B40324" />
                <Text style={styles.tabLabel}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Feather name="heart" size={28} color="#B40324" />
                <Text style={styles.tabLabel}>Matches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
                <Feather name="message-square" size={28} color="#B40324" />
                <Text style={styles.tabLabel}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Bio')}>
                <Feather name="user" size={28} color="#B40324" />
                <Text style={styles.tabLabel}>Me</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderColor: '#B40324',
        backgroundColor: '#CFAFA6',
    },
    tabItem: {
        alignItems: 'center',
    },
    tabLabel: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
    },
});

export default BottomTab;
