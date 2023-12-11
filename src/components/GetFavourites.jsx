import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

/**
 * GetFavourites component fetches and displays details for favorite episodes.
 * @component
 * @param {Object} props - The component's props.
 * @param {string[]} props.favoriteEpisodes - Array of episode IDs marked as favorites.
 * @returns {JSX.Element} - The rendered GetFavourites component.
 */
const GetFavourites = ({ favoriteEpisodes }) => {
  const [favoriteData, setFavoriteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches details for a given episode ID.
   * @async
   * @function
   * @param {string} episodeId - The ID of the episode to fetch details for.
   * @returns {Promise<Object|null>} - A promise that resolves to the episode details or null if an error occurs.
   */
  const fetchFavoriteDetails = async (episodeId) => {
    try {
      const response = await fetch(`https://your-api-endpoint/${episodeId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching details for episode ${episodeId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    /**
     * Fetches details for each favorite episode and updates the component state.
     * @async
     * @function
     */
    const fetchData = async () => {
      try {
        const favoriteDetails = await Promise.all(
          favoriteEpisodes.map(fetchFavoriteDetails)
        );

        setFavoriteData(favoriteDetails.filter((data) => data !== null));
      } catch (error) {
        setError('Error fetching favorite episodes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [favoriteEpisodes]);

  return (
    <div className="GetFavourites">
      <h2>Your Favorite Episodes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && favoriteData.length > 0 ? (
        <ul>
          {favoriteData.map((episode) => (
            <li key={episode?.id}>
              <p>{episode?.title}</p>
              <p>{episode?.description}</p>
              <Button
                variant="outlined"
                onClick={() => navigate(`/episode/${episode?.id}`)}
              >
                Play
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No favorite episodes yet. Go back and add some!</p>
      )}
    </div>
  );
};

// Prop types for GetFavourites component
GetFavourites.propTypes = {
  /**
   * Array of episode IDs marked as favorites.
   */
  favoriteEpisodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GetFavourites;
