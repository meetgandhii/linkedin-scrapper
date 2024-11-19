const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const BRIGHT_DATA_API_KEY = process.env.BRIGHT_DATA_API_KEY;

const pollForResults = async (snapshotId) => {
  try {
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

    if (response.data.status === 'running') {
      await new Promise(resolve => setTimeout(resolve, 10000));
      return pollForResults(snapshotId);
    }

    return response.data;
  } catch (error) {
    if (error.response?.data?.status === 'running') {
      await new Promise(resolve => setTimeout(resolve, 10000));
      return pollForResults(snapshotId);
    }
    throw error;
  }
};

app.post('/api/linkedin/profile', async (req, res) => {
  try {
    const { profileUrl } = req.body;
    
    // First trigger the data collection
    const triggerResponse = await axios.post(
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

    const { snapshot_id } = triggerResponse.data;
    
    // Poll for results until ready
    const profileData = await pollForResults(snapshot_id);
    
    res.json(profileData);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch profile data',
      details: error.response?.data || error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});