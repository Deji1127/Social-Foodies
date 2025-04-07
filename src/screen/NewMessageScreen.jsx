import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { colors } from '/workspaces/Social-Foodies/Social-Foodies/src/utils/colors.js';
import { fonts } from '/workspaces/Social-Foodies/Social-Foodies/src/utils/fonts.js';

const NewMessageScreen = ({ route, navigation }) => {
  const { matches } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = matches.filter(match => 
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search matches..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {filteredMatches.length === 0 ? (
        <Text style={styles.noMatchesText}>No matches found</Text>
      ) : (
        <FlatList
          data={filteredMatches}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.matchItem}
              onPress={() => navigation.navigate('Chat', { 
                conversationId: `new_${item.id}`,
                recipient: item 
              })}
            >
              <Image 
                source={{ uri: item.profilePhoto }} 
                style={styles.matchPhoto}
              />
              <Text style={styles.matchName}>{item.name}</Text>
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
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    fontFamily: fonts.Regular,
  },
  noMatchesText: {
    fontFamily: fonts.Regular,
    color: colors.darkAccent,
    textAlign: 'center',
    marginTop: 20,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  matchPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  matchName: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.darkAccent,
  },
});

export default NewMessageScreen;