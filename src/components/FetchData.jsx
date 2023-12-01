import { useEffect, useState } from 'react';

const useFetchAPIData = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('showsData');
      const storedTimestamp = localStorage.getItem('showsTimestamp');

      if (storedData && storedTimestamp) {
        const currentTime = new Date().getTime();
        const storedTime = new Date(Number(storedTimestamp)).getTime();
        const timeDiff = (currentTime - storedTime) / (1000 * 60 * 60);

        if (timeDiff < 2) {
          setShows(JSON.parse(storedData));
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setShows(data);
        localStorage.setItem('showsData', JSON.stringify(data));
        localStorage.setItem('showsTimestamp', new Date().getTime());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    shows,
  };
};

export default useFetchAPIData;
