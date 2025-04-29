const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// Environment variables for flexibility
const SWIGGY_API_URL = process.env.SWIGGY_API_URL || 'https://www.swiggy.com/dapi/restaurants/list/v5';
const SWIGGY_MENU_API_URL = process.env.SWIGGY_MENU_API_URL || 'https://www.swiggy.com/dapi/menu/pl';

// Proxy for restaurant list
app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.get(SWIGGY_API_URL, {
      params: req.query,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy for individual restaurant menu/details
app.get('/api/menu', async (req, res) => {
  try {
    const response = await axios.get(SWIGGY_MENU_API_URL, {
      params: req.query,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
