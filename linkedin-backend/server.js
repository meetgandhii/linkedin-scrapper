// server.js (Backend)
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;

// Trigger data collection
app.post('/api/linkedin/trigger', async (req, res) => {
  try {
    const { profileUrl } = req.body;
    
    const response = await axios.post(
      'https://api.brightdata.com/datasets/v3/trigger',
      [{
        url: profileUrl
      }],
      {
        params: {
          dataset_id: 'gd_l1viktl72bvl7bjuj0',
          include_errors: true
        },
        headers: {
          'Authorization': `Bearer ${BRIGHT_DATA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// Poll snapshot data
app.get('/api/linkedin/snapshot/:snapshotId', async (req, res) => {
  try {
    const { snapshotId } = req.params;
    
    const response = await axios.get(
      `https://api.brightdata.com/datasets/v3/snapshot/${snapshotId}`,
      {
        params: {
          format: 'json'
        },
        headers: {
          'Authorization': `Bearer ${BRIGHT_DATA_API_KEY}`
        }
      }
    );
    console.log(response.data);
    
    res.json(response.data);
  } catch (error) {
    if (error.response?.data?.status === 'running') {
      res.status(202).json({ status: 'running', message: 'Snapshot is not ready yet' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});