import React, { useEffect, useState, useRef } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../utils/constants';
import { doc, setDoc, collection, onSnapshot, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import MenuButton from './MenuButton';

import {
  ScrollView, View, Text, Image, Dimensions, StyleSheet, TextInput, TouchableOpacity, Alert,
} from 'react-native';

const NearbyRestaurants = ({ restaurants, onSelectRestaurant }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
      {restaurants.map((place, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectRestaurant?.(place)}>
          <View style={styles.card}>
            <Image
              source={{ uri: place.photoUrl }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>{place.name}</Text>
            {place.rating && (
              <Text style={styles.ratingText}>⭐ {place.rating.toFixed(1)}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const MainPage = () => {
  const navigation = useNavigation();
  const [recommendations, setRecommendations] = useState([]);
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const mapRef = useRef(null);
  const markerRefs = useRef({});
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [isVisibleOnMap, setIsVisibleOnMap] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.preferences?.visibleOnMap === false) {
            setIsVisibleOnMap(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };
    fetchUserPreferences();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const otherUsers = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.location && data.preferences?.visibleOnMap !== false) {
          otherUsers.push({
            id: docSnap.id,
            lat: data.location.lat,
            lng: data.location.lng,
          });
        }
      });
      setNearbyUsers(otherUsers);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to show your position.');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      const { latitude, longitude } = currentLocation.coords;

      if (auth.currentUser && isVisibleOnMap) {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          location: {
            lat: latitude,
            lng: longitude,
          },
          lastUpdated: new Date(),
        }, { merge: true });
      }

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        const results = data.results.map((place, index) => {
          const photoRef = place.photos?.[0]?.photo_reference || null;
          const photoUrl = photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
            : 'https://via.placeholder.com/200x180.png?text=No+Image';

          return {
            id: place.place_id || index.toString(),
            name: place.name,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            photo: photoRef,
            photoUrl: photoUrl,
            rating: place.rating || null,
          };
        });

        setRestaurants(results);
        setRecommendations(results.slice(0, 10));
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    })();
  }, [isVisibleOnMap]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../assets/social1.png')} style={styles.logo} />
        <View style={styles.searchWrapper}>
          <Feather name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBarWithIcon}
            placeholder="Search..."
            placeholderTextColor="#999"
          />
        </View>
        <MenuButton onPress={() => navigation.navigate('Preferences')} />
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.mapLabel}>Foodie Adventure</Text>
        {location && (
          <MapView
            ref={mapRef}
            style={{ height: 200, width: '100%', marginBottom: 15 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            {restaurants.map((r) => (
              <Marker
                key={r.id}
                coordinate={{ latitude: r.lat, longitude: r.lng }}
                title={r.name}
                description="Spotted by Social Foodies"
                pinColor="#B40324"
                ref={(ref) => (markerRefs.current[r.id] = ref)}
              />
            ))}
            {nearbyUsers.map(user => (
              <Marker
                key={user.id}
                coordinate={{ latitude: user.lat, longitude: user.lng }}
                title="Foodie Nearby"
                description="Another Social Foodie is around here!"
                pinColor={user.id === auth.currentUser?.uid ? "#00FF00" : "#0000FF"}
              />
            ))}
          </MapView>
        )}
        <View style={styles.toggleContainer}>
  <Text style={styles.toggleLabel}>Show me on map:</Text>
  <TouchableOpacity
    style={[
      styles.toggleButton,
      { backgroundColor: isVisibleOnMap ? '#B40324' : '#ccc' },
    ]}
    onPress={async () => {
      const newValue = !isVisibleOnMap;
      setIsVisibleOnMap(newValue);
      const userId = auth.currentUser?.uid;
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          preferences: { visibleOnMap: newValue }
        }, { merge: true });
      }
    }}
  >
    <Text style={styles.toggleText}>{isVisibleOnMap ? 'Yes' : 'No'}</Text>
  </TouchableOpacity>
</View>


        <Text style={styles.recommendationTitle}>Foodie Recommendations</Text>
        {recommendations.length > 0 && (
          <NearbyRestaurants
            restaurants={recommendations}
            onSelectRestaurant={(restaurant) => {
              setSelectedRestaurant(restaurant);
              mapRef.current?.animateToRegion(
                {
                  latitude: restaurant.lat,
                  longitude: restaurant.lng,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                },
                800
              );
              setTimeout(() => {
                markerRefs.current[restaurant.id]?.showCallout();
              }, 900);
            }}
          />
        )}
      </View>
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

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFAFA6',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  mapContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  mapLabel: {
    marginBottom: 10,
    fontSize: 26,
    fontWeight: '900',
    color: '#B40324',
    textAlign: 'center',
  },
  recommendationTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#B40324',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    width: 200,
    height: 250,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginRight: 15,
    borderColor: '#B40324',
    borderWidth: 1.5,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#B40324',
    borderWidth: 1.5,
    paddingHorizontal: 10,
    width: '60%',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchBarWithIcon: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderColor: '#B40324',
    backgroundColor: '#CFAFA6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  toggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  
});
