import React, { useState, useEffect } from 'react';
import PodcastCard from './PodcastCard';

const FetchPodcastData = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setPodcasts(data);

        // Save data to localStorage
        localStorage.setItem('podcasts', JSON.stringify(data));
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Response:', await response.text()); // Log the response for debugging
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Check if data exists in localStorage
    const storedData = localStorage.getItem('podcasts');
    if (storedData) {
      setPodcasts(JSON.parse(storedData));
      setLoading(false); // Set loading to false if data is retrieved from localStorage
    } else {
      fetchData();
    }
  }, []); // Make sure to include the dependency array

  return (
    <div className="PodcastGrid">
      {loading ? (
        <p>Loading podcasts...</p>
      ) : (
        podcasts.map((podcast) => <PodcastCard key={podcast.id} {...podcast} />)
      )}
    </div>
  );
};

export default FetchPodcastData;
