import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const mockFriends = [
  {
    id: '1',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    avatar: require('../assets/mrbean.png'),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: require('../assets/picpro.png'),
  },
  {
    id: '3',
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    avatar: require('../assets/social1.png'),
  },
];

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // You can replace this with a fetch from Firebase later
    setFriends(mockFriends);
  }, []);

  const renderFriend = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={renderFriend}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFAFA6',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

export default Friends;