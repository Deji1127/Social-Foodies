import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewMessageScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Sample data - replace with actual users from Firebase
    const allUsers = [
        { id: '1', name: 'Alex', image: require('../assets/profile1.jpg') },
        { id: '2', name: 'Jamie', image: require('../assets/profile2.jpg') },
        { id: '3', name: 'Taylor', image: require('../assets/profile3.jpg') },
        { id: '4', name: 'Morgan', image: require('../assets/profile4.jpg') },
        { id: '5', name: 'Casey', image: require('../assets/profile5.jpg') },
    ];

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleUserSelection = (user) => {
        setSelectedUsers(prev => {
            if (prev.some(u => u.id === user.id)) {
                return prev.filter(u => u.id !== user.id);
            } else {
                return [...prev, user];
            }
        });
    };

    const startNewChat = () => {
        if (selectedUsers.length > 0) {
            navigation.navigate('Chat', { 
                userIds: selectedUsers.map(u => u.id),
                isGroup: selectedUsers.length > 1 
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.pressEffect // Add press effect here
                    ]}
                >
                    <Ionicons name="arrow-back" size={24} color="#A40000" />
                </TouchableOpacity>
                
                <Text style={styles.headerTitle}>New Message</Text>
                
                {selectedUsers.length > 0 && (
                    <TouchableOpacity 
                        onPress={startNewChat}
                        activeOpacity={0.7}
                        style={({ pressed }) => [
                            styles.nextButtonContainer,
                            pressed && styles.pressEffect // Add press effect here
                        ]}
                    >
                        <Text style={styles.nextButton}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* ... [keep search bar code as is] ... */}

            {/* Selected users preview */}
            {selectedUsers.length > 0 && (
                <View style={styles.selectedContainer}>
                    {/* ... [keep other code] ... */}
                    <FlatList
                        horizontal
                        data={selectedUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.selectedUser}>
                                <Image 
                                    source={item.image || require('../assets/red-placeholder.png')} 
                                    style={styles.selectedUserImage} 
                                />
                                <Text style={styles.selectedUserName}>{item.name}</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.goBack()}
                                    activeOpacity={0.7}
                                    style={({ pressed }) => [
                                        styles.backButton,
                                        pressed && styles.pressEffect
                                    ]}
                                >
                                    <Ionicons name="close" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        )}
                        contentContainerStyle={styles.selectedList}
                    />
                </View>
            )}

            {/* Users list */}
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={({ pressed }) => [
                            styles.userItem,
                            pressed && styles.pressEffect // Add press effect here
                        ]}
                        onPress={() => toggleUserSelection(item)}
                        activeOpacity={0.7}
                    >
                        <Image 
                            source={item.image || require('../assets/red-placeholder.png')} 
                            style={styles.userImage} 
                        />
                        <Text style={styles.userName}>{item.name}</Text>
                        {selectedUsers.some(u => u.id === item.id) && (
                            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5E7', // Cream background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        backgroundColor: '#FFF5E7', // Cream header
        borderBottomColor: '#A40000', // Red border
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A40000', // Red title
    },
    nextButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#A40000', // Red button
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5E7', // Cream
        borderColor: '#A40000', // Red border
        borderRadius: 10,
        margin: 15,
        paddingHorizontal: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    selectedContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#A40000', // Red border
    },
    selectedTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    selectedList: {
        paddingBottom: 5,
    },
    selectedUser: {
        alignItems: 'center',
        marginRight: 15,
        position: 'relative',
    },
    selectedUserImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    selectedUserName: {
        fontSize: 12,
        marginTop: 5,
    },
    removeButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#A40000', // Red button
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userName: {
        flex: 1,
        fontSize: 16,
    },
    pressEffect: {
        backgroundColor: 'rgba(164, 0, 0, 0.1)',
        borderRadius: 4, // Adjust as needed
    },
    nextButtonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF5E7', // Cream background
        borderWidth: 1,
        borderColor: '#A40000', // Red border
    },
    nextButton: {
        color: '#A40000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        // Style for the back button container
        padding: 8, // Add padding for better touch area
    },
});

export default NewMessageScreen;