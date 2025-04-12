
import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_API_KEY } from '../utils/constants';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';

import {
  ScrollView, View, Text, Image, Dimensions, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert,
} from 'react-native';



const NearbyRestaurants = ({ restaurants }) => {
  console.log('Rendering NearbyRestaurants with', restaurants.length, 'items');



  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
      {restaurants.map((place, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={{
              uri: place.photo
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photo}&key=${GOOGLE_API_KEY}`
                : 'https://via.placeholder.com/200x180.png?text=No+Image'
            }}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>{place.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};


const screenWidth = Dimensions.get('window').width;

const MainPage = () => {

  const navigation = useNavigation();
  const [recommendations, setRecommendations] = useState([]);
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const [nearbyUsers, setNearbyUsers] = useState([]);


  const updateUserLocation = async (coords) => {
    if (!auth.currentUser) return;

    const userDoc = doc(db, 'users', auth.currentUser.uid);

    // example avatar URL — replace with dynamic one later
    const avatarUrl = 'https://your-avatar-image-url.com/avatar.png';

    await setDoc(userDoc, {
      location: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
      avatar: avatarUrl, // 💡 add this here
      lastUpdated: new Date(),
    }, { merge: true });
  };


  useEffect(() => {
    let locationSubscription = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required.');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // every 5 seconds
          distanceInterval: 5, // or every 5 meters
        },
        (loc) => {
          setLocation(loc.coords);
          updateUserLocation(loc.coords);
        }
      );
    })();

    // 🧼 Cleanup when component unmounts
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const otherUsers = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.location) {
          otherUsers.push({
            id: docSnap.id,
            lat: data.location.lat,
            lng: data.location.lng,
            avatar: data.avatar || null,
          });
        }

        console.log("Adding user marker:", docSnap.id, data.location);

      });
      console.log("Nearby users snapshot:", snapshot.docs.length);
      setNearbyUsers(otherUsers.filter(user => user.id !== auth.currentUser?.uid));

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
      await updateUserLocation(currentLocation.coords);

      const { latitude, longitude } = currentLocation.coords;

      console.log('Fetching restaurants...');
      console.log('Lat:', latitude, 'Lng:', longitude);
      console.log('API KEY:', GOOGLE_API_KEY);

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        console.log('API response:', data);

        const results = data.results.map((place, index) => {
          const photoRef = place.photos?.[0]?.photo_reference || null;
          const photoUrl = photoRef
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
            : 'https://via.placeholder.com/200x180.png?text=No+Image';

          // Log to test if image URLs are valid
          console.log(`Restaurant: ${place.name}`);
          console.log(`Photo URL: ${photoUrl}`);

          return {
            id: place.place_id || index.toString(),
            name: place.name,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            photo: photoRef,          // keep photoRef in case you're using it dynamically
            photoUrl: photoUrl        // add full URL to make it easy to use
          };
        });

        setRestaurants(results);
        setRecommendations(results.slice(0, 10));
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }

    })();
  }, []);

  const handleViewMap = () => {
    if (location) {
      navigation.navigate('WebViewScreen', {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } else {
      Alert.alert('Location not ready yet');
    }
  };



  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.photo
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo}&key=${GOOGLE_API_KEY}`
            : 'https://via.placeholder.com/200x180.png?text=No+Image'
        }}
        style={styles.cardImage}
      />
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

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
        <TouchableOpacity>
          <Feather name="menu" size={30} color="#B40324" />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <Text style={styles.mapLabel}>Foodie Adventure</Text>

        {location && (
          <MapView
            style={{ height: 200, width: '100%', marginBottom: 15 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={false}
          >
            {restaurants.map((r) => (
              <Marker
                key={r.id}
                coordinate={{ latitude: r.lat, longitude: r.lng }}
                title={r.name}
                description="Spotted by Social Foodies"
                pinColor="#B40324"
              />
            ))}

            {nearbyUsers.map(user => (
              <Marker
                key={user.id}
                coordinate={{ latitude: user.lat, longitude: user.lng }}
                title={user.id === auth.currentUser?.uid ? "You" : "Foodie Nearby"}
                description="Another Social Foodie is around here!"
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={
                      user.avatar
                        ? { uri: user.avatar }
                        : require('../assets/new_profile.png') // fallback default avatar
                    }
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 22.5,
                      borderColor: user.id === auth.currentUser?.uid ? '#00FF00' : '#B40324',
                      borderWidth: 2,
                      backgroundColor: '#fff',
                    }}
                  />
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#B40324', marginTop: 2 }}>
                    {user.id === auth.currentUser?.uid ? "You" : "Foodie"}
                  </Text>
                </View>
              </Marker>
            ))}


          </MapView>
        )}


        {/* Add this below the map */}
        <Text style={styles.recommendationTitle}>Foodie Recommendations</Text>

        {recommendations.length > 0 && (
          <NearbyRestaurants restaurants={recommendations} />
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
    fontFamily: 'HelveticaNeue-Bold',
    textAlign: 'center',
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1,
  },
  recommendationSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  recommendationTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#B40324',
    fontFamily: 'HelveticaNeue-Bold',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1,
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
    paddingTop: 10,
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
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },

});