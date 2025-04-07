import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, TextInput, Alert, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const screenWidth = Dimensions.get('window').width;

const recommendations = [
    {
        id: '1',
        title: 'Gen Korean BBQ House',
        image: require('../assets/korean.png'),
    },
    {
        id: '2',
        title: 'Kura Revolving Sushi Bar',
        image: require('../assets/burger.png'),
    },
    {
        id: '3',
        title: 'Goobne Chicken 굽네치킨',
        image: require('../assets/boba.png'),
    },
];

const MainPage = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location access is required to show your position.');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
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
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="You Are Here"
                        />
                    </MapView>
                )}
            </View>

            <View style={styles.recommendationSection}>
                <Text style={styles.recommendationTitle}>Foodie Recommendations</Text>
                <FlatList
                    data={recommendations}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20 }}
                />
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
    map: {
        width: 350,
        height: 250,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#B40324',
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
});
