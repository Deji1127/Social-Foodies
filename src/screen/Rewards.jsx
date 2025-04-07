import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const Rewards = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Rewards</Text>
      <Text style={styles.subHeader}>Order. Pay. And earn points to unlock rewards</Text>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointsLabel}>Activate Rewards</Text>
        <Text style={styles.pointsValue}>276 PTS</Text>
      </View>

      <View style={styles.rewardCard}>
        <Image source={require('../assets/freedrink.png')} style={styles.rewardImage} />
        <Text style={styles.rewardTitle}>Free Medium Drink</Text>
        <Text style={styles.pointsNeeded}>250 points</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.buttonText}>Gift to a Friend</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.buttonText}>Activate Reward</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.rewardCard}>
        <Image source={require('../assets/freedrink.png')} style={styles.rewardImage} />
        <Text style={styles.rewardTitle}>Free Drink of Your Choice</Text>
        <Text style={styles.pointsNeeded}>300 points</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.buttonText}>Gift to a Friend</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}><Text style={styles.buttonText}>Activate Reward</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#CFAFA6',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  pointsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B40324',
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  rewardImage: {
    width: '100%',
    height: 420,
    borderRadius: 10,
    marginBottom: 30,
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  pointsNeeded: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#B40324',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Rewards;