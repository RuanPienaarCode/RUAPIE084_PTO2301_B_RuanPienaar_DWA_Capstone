import React, { useEffect, useState } from 'react';
import fetchPodcastData from '../assets/fetchSupa'; // Adjust the path accordingly

import { useParams } from 'react-router-dom'; // Import the useParams hook

const Likes = () => {
  const { id } = useParams(); // Use the useParams hook to get the route parameters
  const [podcastData, setPodcastData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchPodcastData(id);
        setPodcastData(data);
        console.log('Podcast data1:', data);
        setPodcastData((prevData) => {
          console.log('Podcast data2:', prevData);
          return prevData;
        });
      };

      fetchData();
    }
  }, [id]);

  if (!podcastData) {
    return <div></div>;
  }

  return (
    <div>
      <h1>{podcastData.title}</h1>
      <p>{podcastData.description}</p>
      {/* Display other podcast details as needed */}
    </div>
  );
};

export default Likes;
