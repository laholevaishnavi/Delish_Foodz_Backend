const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5', {
      params: req.query,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
