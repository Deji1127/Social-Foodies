import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ContactSupport = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Missing Info', 'Please fill out both fields before sending.');
      return;
    }

    // Here you could send it to Firebase or an email service
    Alert.alert('Message Sent', 'Our team will get back to you soon!');
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Contact Support</Text>
        <Text style={styles.subtext}>Need help? Reach out to us below and we'll get back to you ASAP.</Text>

        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#999"
          value={subject}
          onChangeText={setSubject}
        />

        <TextInput
          style={[styles.input, styles.messageBox]}
          placeholder="Your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Feather name="send" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFAFA6',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B40324',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#B40324',
    borderWidth: 1.3,
  },
  messageBox: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#B40324',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
