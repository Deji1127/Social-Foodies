const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Endpoint to fetch restaurants
app.get('/api/restaurants', async (req, res) => {
    const { lat, lng, radius, type } = req.query;
    const apiKey = 'AIzaSyDvsTyOT5uX43q0nWmtD9c09GFv7aKNU4k'; // replace with your actual API key

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
