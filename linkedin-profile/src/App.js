// App.jsx
import React from 'react';
import LinkedInScraper from './components/LinkedInScraper';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        {/* <h1 className="text-3xl font-bold mb-8 text-center">
          LinkedIn Profile Scraper
        </h1> */}
        <LinkedInScraper />
      </div>
    </div>
  );
}

export default App;