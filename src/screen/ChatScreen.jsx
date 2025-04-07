import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { colors } from '/workspaces/Social-Foodies/Social-Foodies/src/utils/colors.js';
import { fonts } from '/workspaces/Social-Foodies/Social-Foodies/src/utils/fonts.js';

const ChatScreen = ({ route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [conversationId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
      text: newMessage,
      senderId: 'current_user_id', // TODO: Replace with auth user ID
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.senderId === 'current_user_id' ? styles.sentMessage : styles.receivedMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 15, marginBottom: 10 },
  sentMessage: { alignSelf: 'flex-end', backgroundColor: colors.lighterRed },
  receivedMessage: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  messageText: { fontFamily: fonts.Regular, fontSize: 16, color: '#fff' },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, padding: 10, marginRight: 10 },
  sendButton: { backgroundColor: colors.lighterRed, borderRadius: 20, padding: 10 },
  sendButtonText: { color: '#fff', fontFamily: fonts.Medium },
});

export default ChatScreen;