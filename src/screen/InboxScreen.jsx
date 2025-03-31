import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InboxScreen = ({ navigation }) => {
    // Sample data for matches and messages
    const matches = [
        { id: '1', name: 'Alex', image: require('../assets/profile1.jpg'), lastMessage: 'Hey, want to grab sushi?' },
        { id: '2', name: 'Jamie', image: require('../assets/profile2.jpg'), lastMessage: 'Found a great Italian place!' },
        { id: '3', name: 'Taylor', image: require('../assets/profile3.jpg'), lastMessage: 'How about tacos tomorrow?' },
    ];

    const conversations = [
        { id: '1', name: 'Alex', image: require('../assets/profile1.jpg'), lastMessage: 'Hey, want to grab sushi?', time: '2:30 PM', unread: true },
        { id: '2', name: 'Jamie', image: require('../assets/profile2.jpg'), lastMessage: 'Found a great Italian place!', time: 'Yesterday', unread: false },
        { id: '3', name: 'Taylor', image: require('../assets/profile3.jpg'), lastMessage: 'How about tacos tomorrow?', time: 'Monday', unread: false },
    ];

    return (
        <View style={styles.container}>
            {/* Header with logo and new message icon */}
            <View style={styles.header}>
                <Image 
                    source={require('../assets/social-foodies-logo.png')} 
                    style={styles.logo} 
                />
                <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
                    <Ionicons name="create-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            {/* Matches carousel */}
            <Text style={styles.sectionTitle}>Your Foodie Matches</Text>
            <FlatList
                horizontal
                data={matches}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.matchItem}>
                        <Image source={item.image} style={styles.matchImage} />
                        <Text style={styles.matchName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.matchesList}
                showsHorizontalScrollIndicator={false}
            />

            {/* Conversations list */}
            <Text style={styles.sectionTitle}>Messages</Text>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.conversationItem}
                        onPress={() => navigation.navigate('Chat', { userId: item.id })}
                    >
                        <Image source={item.image} style={styles.conversationImage} />
                        <View style={styles.conversationDetails}>
                            <Text style={styles.conversationName}>{item.name}</Text>
                            <Text 
                                style={[
                                    styles.conversationMessage,
                                    item.unread && styles.unreadMessage
                                ]}
                                numberOfLines={1}
                            >
                                {item.lastMessage}
                            </Text>
                        </View>
                        <View style={styles.conversationTime}>
                            <Text style={styles.timeText}>{item.time}</Text>
                            {item.unread && <View style={styles.unreadBadge} />}
                        </View>
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
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFF5E7', // Cream header
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: 'contain',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#A40000', // Red titles
    },
    matchesList: {
        paddingBottom: 10,
    },
    matchItem: {
        alignItems: 'center',
        marginRight: 15,
    },
    matchImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
    },
    matchName: {
        fontSize: 14,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#FFF5E7', // Cream items
    },
    conversationImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    conversationDetails: {
        flex: 1,
    },
    conversationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    conversationMessage: {
        fontSize: 14,
        color: '#888',
    },
    unreadMessage: {
        color: '#A40000', // Red for unread
        fontWeight: '600',
    },
    conversationTime: {
        alignItems: 'flex-end',
    },
    timeText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 3,
    },
    unreadBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#A40000', // Red badge
    },
});

export default InboxScreen;