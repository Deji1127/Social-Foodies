// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/restaurants', async (req, res) => {
  const { latitude, longitude, radius, type, key } = req.query;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from API');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
