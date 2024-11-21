import React, { useEffect, useState } from 'react';

// Define the types for your restaurant data
interface Restaurant {
  name: string;
  address: string;
  rating: number;
}

const MapComponent: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const radius = 1500; // Set your desired radius in meters
          const type = 'restaurant'; // Specify that you're looking for restaurants

          // Create the Google Maps URL
          const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const restaurantsList: Restaurant[] = data.results.map((place: any) => ({
              name: place.name,
              address: place.vicinity,
              rating: place.rating,
            }));
            setRestaurants(restaurantsList);
          } catch (error) {
            setError('Failed to fetch restaurants');
            console.error(error);
          }
        },
        (error) => {
          setError('Geolocation failed');
          console.error(error);
        }
      );
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Nearby Restaurants</h1>
      {error && <p>{error}</p>}
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
