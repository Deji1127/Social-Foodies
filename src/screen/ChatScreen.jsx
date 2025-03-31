import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const ChatScreen = ({ route, navigation }) => {
    const { userId, isGroup } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef(null);

    // Sample data - replace with actual Firestore integration
    const sampleMessages = [
        { id: '1', text: 'Hey there!', sender: userId, timestamp: new Date(Date.now() - 3600000) },
        { id: '2', text: 'Want to grab some sushi?', sender: 'currentUser', timestamp: new Date(Date.now() - 1800000) },
        { id: '3', text: 'Sure! How about tomorrow?', sender: userId, timestamp: new Date(Date.now() - 900000) },
        { id: '4', text: 'Sounds perfect!', sender: 'currentUser', timestamp: new Date() },
    ];

    // Sample user data - replace with actual user data from Firestore
    const chatUser = {
        id: userId,
        name: isGroup ? 'Foodie Group' : 'Alex',
        image: require('../assets/profile1.jpg')
    };

    useEffect(() => {
        // In a real app, you would subscribe to Firestore messages here
        setMessages(sampleMessages.sort((a, b) => a.timestamp - b.timestamp));
        
        // Set up header with user info
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerTitleContainer}>
                    <Image source={chatUser.image} style={styles.headerImage} />
                    <Text style={styles.headerTitle}>{chatUser.name}</Text>
                    {isGroup && <Text style={styles.groupText}>Group</Text>}
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" style={styles.backButton} />
                </TouchableOpacity>
            ),
        });
    }, []);

    const handleSend = () => {
        if (newMessage.trim() === '') return;
        
        // In a real app, you would add this message to Firestore
        const message = {
            id: Date.now().toString(),
            text: newMessage,
            sender: 'currentUser',
            timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, message]);
        setNewMessage('');
        
        // Scroll to bottom after sending
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const renderMessage = ({ item }) => {
        const isCurrentUser = item.sender === 'currentUser';
        
        return (
            <View style={[
                styles.messageContainer,
                isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
            ]}>
                {!isCurrentUser && !isGroup && (
                    <Image source={chatUser.image} style={styles.messageUserImage} />
                )}
                <View style={[
                    styles.messageBubble,
                    isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
                ]}>
                    <Text style={[
                        styles.messageText,
                        isCurrentUser ? styles.currentUserText : styles.otherUserText
                    ]}>
                        {item.text}
                    </Text>
                    <Text style={styles.messageTime}>
                        {format(item.timestamp, 'h:mm a')}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
        >
            {/* Messages list */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            {/* Message input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                    multiline
                />
                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={handleSend}
                    disabled={newMessage.trim() === ''}
                >
                    <Ionicons 
                        name="send" 
                        size={24} 
                        color={newMessage.trim() === '' ? '#ccc' : '#FF6B6B'} 
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5E7', // Updated to cream
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A40000', // Added red color
    },
    groupText: {
        fontSize: 12,
        color: '#A40000', // Updated to red
        marginLeft: 5,
    },
    backButton: {
        marginLeft: 15,
        color: '#A40000', // Added red color
    },
    messagesList: {
        padding: 15,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    currentUserMessage: {
        justifyContent: 'flex-end',
    },
    otherUserMessage: {
        justifyContent: 'flex-start',
    },
    messageUserImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        borderColor: '#A40000', // Added red border
        borderWidth: 1,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 12,
        borderRadius: 18,
    },
    currentUserBubble: {
        backgroundColor: '#A40000', // Updated to red
        borderBottomRightRadius: 4,
    },
    otherUserBubble: {
        backgroundColor: '#FFFFFF', // Changed to pure white for better contrast
        borderBottomLeftRadius: 4,
        borderColor: '#A40000', // Added red border
        borderWidth: 1,
    },
    messageText: {
        fontSize: 16,
    },
    currentUserText: {
        color: '#FFF5E7', // Updated to cream
    },
    otherUserText: {
        color: '#000000', // Pure black for better readability
    },
    messageTime: {
        fontSize: 10,
        color: 'rgba(164, 0, 0, 0.7)', // Updated to semi-transparent red
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#A40000', // Updated to red
        backgroundColor: '#FFF5E7', // Updated to cream
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#A40000', // Updated to red
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
        marginRight: 10,
        backgroundColor: '#FFFFFF', // White background for input
    },
    sendButton: {
        padding: 8,
    },
});

export default ChatScreen;