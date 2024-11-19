// LinkedInScraper.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import InputSection from './InputSection';

function LinkedInScraper() {
  const [urls, setUrls] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [profilesData, setProfilesData] = useState([]);
  const [error, setError] = useState(null);
  const [inputMethod, setInputMethod] = useState('manual');

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const removeUrlField = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const validUrls = lines
        .map(line => line.trim())
        .filter(line => line && line.includes('linkedin.com/in/'));
      setUrls(validUrls);
    };
    
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProfilesData([]);
    
    const urlsToProcess = inputMethod === 'manual' ? urls : urls;
    
    try {
      const profiles = await Promise.all(
        urlsToProcess.filter(url => url).map(async (url) => {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/linkedin/profile`, {
            profileUrl: url
          });
          return response.data[0];
        })
      );

      setProfilesData(profiles);
    } catch (err) {
      setError(err.response?.data?.details || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        LinkedIn Profile Scraper
      </h1>
      
      <InputSection 
        inputMethod={inputMethod}
        setInputMethod={setInputMethod}
        urls={urls}
        handleUrlChange={handleUrlChange}
        handleCsvUpload={handleCsvUpload}
        addUrlField={addUrlField}
        removeUrlField={removeUrlField}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-blue-600">Fetching profiles... This may take a few minutes</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {profilesData.map((profile, index) => (
          <ProfileCard key={index} profile={profile} />
        ))}
      </div>
    </div>
  );
}

export default LinkedInScraper;