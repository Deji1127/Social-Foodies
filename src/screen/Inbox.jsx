import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const Inbox = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('NewMessage')}
          style={styles.newMessageButton}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search messages..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Matches Placeholder */}
      <Text style={styles.sectionTitle}>Your Foodie Matches</Text>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>🍔 Find foodie matches to start chatting!</Text>
      </View>

      {/* Messages List */}
      <Text style={styles.sectionTitle}>Messages</Text>
      {conversations.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No messages yet</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.conversationItem}>
              <Text>{item.participantsName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.softPink,
    borderBottomWidth: 1,
    borderBottomColor: colors.deepRed,
  },
  headerTitle: {
    fontFamily: fonts.Bold,
    fontSize: 22,
    color: colors.darkAccent,
  },
  newMessageButton: {
    backgroundColor: colors.lighterRed,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 12,
    margin: 15,
    fontFamily: fonts.Regular,
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: 18,
    color: colors.darkAccent,
    marginLeft: 15,
    marginBottom: 10,
  },
  placeholderContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  placeholderText: {
    fontFamily: fonts.Regular,
    color: colors.darkAccent,
    textAlign: 'center',
  },
});

export default Inbox;