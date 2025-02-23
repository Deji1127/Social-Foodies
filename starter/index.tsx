let map: google.maps.Map;

var center: google.maps.LatLng;

async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

async function initMap() {
    const { Map, InfoWindow } = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;

    try {
        const { latitude, longitude } = await getCurrentLocation();
        center = new google.maps.LatLng(latitude, longitude); // Corrected to use the global center variable
        map = new Map(document.getElementById('map') as HTMLElement, {
            center: center,
            zoom: 16,
            mapId: 'DEMO_MAP_ID',
        });
        nearbySearch();
    } catch (error) {
        console.error("Error getting location: ", error);
    }
}

async function nearbySearch() {
    //@ts-ignore
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    // If you want a new field, NEED to update both here and in wherever you call the place.field
    const request = {
        fields: ['displayName', 'location', 'businessStatus', 'allowsDogs', 'rating', 'reviews', 'userRatingCount', 'priceLevel'
            ,'primaryType', 'accessibilityOptions'
        ],
        locationRestriction: {
            center: center,
            radius: 1000,
        },
        includedPrimaryTypes: ['restaurant'],
        maxResultCount: 5, //This locks down how many places can be requested. Too little?
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: 'en-US',
        region: 'us',
    };

    //@ts-ignore
    const { places } = await Place.searchNearby(request);

    if (places.length) {
        const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
        const bounds = new LatLngBounds();

        // Clear previous results
        const resultsContainer = document.getElementById('results'); // Make sure you have an element with this ID in your HTML
        if (resultsContainer) {
            resultsContainer.innerHTML = ''; // Clear previous results
        }

        // Loop through and get all the results.
        places.forEach((place) => {
            const markerView = new AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });

            bounds.extend(place.location as google.maps.LatLng);

            // Create a new div for each place and add it to the results container
            if (resultsContainer) {
                const placeInfo = document.createElement('div');
                placeInfo.innerHTML = `
                    <strong>${place.displayName}</strong><br/>
                    Location: ${place.location.lat()}, ${place.location.lng()}<br/>
                    Status: ${place.businessStatus || 'Unknown'}
                    Rating: ${place.rating !== undefined ? place.rating : 'Not rated'}<br/>
                    Type: ${place.primaryType || 'N/A'}
                    Reviews: ${place.reviews || 'No reviews available'}<br/>
                    Dogs: ${place.allowsDogs}
                    UserRatingCount: ${place.userRatingCount}
                    Price Level: ${place.priceLevel}
                    Accessability options parking: ${place.accessibilityOptions['wheelchairAccessibleParking']}
                    Accessability options Entrance: ${place.accessibilityOptions.wheelchairAccessibleEntrance}
                    Accessability options Restroom: ${place.accessibilityOptions.wheelchairAccessibleRestroom}
                    Accessability options Seating: ${place.accessibilityOptions.wheelchairAccessibleSeating}
                    
                `;
                resultsContainer.appendChild(placeInfo);
            }
            // "wheelchairAccessibleParking": boolean,
            // "wheelchairAccessibleEntrance": boolean,
            // "wheelchairAccessibleRestroom": boolean,
            // "wheelchairAccessibleSeating": boolean
            // PRICE_LEVEL_UNSPECIFIED 	Place price level is unspecified or unknown.
            // PRICE_LEVEL_FREE 	Place provides free services.
            // PRICE_LEVEL_INEXPENSIVE 	Place provides inexpensive services.
            // PRICE_LEVEL_MODERATE 	Place provides moderately priced services.
            // PRICE_LEVEL_EXPENSIVE 	Place provides expensive services.
            // PRICE_LEVEL_VERY_EXPENSIVE 	Place provides very expensive services.
        });

        map.fitBounds(bounds);
    } else {
        const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.innerHTML = 'No results found.';
        }
    }
}

initMap();
