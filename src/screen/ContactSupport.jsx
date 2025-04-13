import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ContactSupport = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleSend = () => {
    if (!subject || !message) {
      Alert.alert('Please fill out both fields.');
      return;
    }
    Alert.alert('Message sent successfully!');
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contact Support</Text>
      <Text style={styles.subtitle}>
        Need help? Reach out to us below and we'll get back to you ASAP.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your message..."
        multiline
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>

      {/* Bottom Tab Navigation */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBB6A7',
    paddingHorizontal: 20,
    paddingTop: 100,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B40324',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#B40324',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  messageInput: {
    height: 110,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#B40324',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#B40324',
    marginTop: 4,
  },
});

export default ContactSupport;
