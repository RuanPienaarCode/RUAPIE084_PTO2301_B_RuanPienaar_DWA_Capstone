// components/PodcastModalContent.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

/**
 * Component representing the content of the podcast modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.showId - The unique identifier for the podcast show.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onEpisodeSelect - Callback function to handle episode selection.
 * @param {Function} props.setSelectedEpisodeUrl - Callback function to set the selected episode's URL.
 * @returns {JSX.Element} - The rendered PodcastModalContent component.
 */
const PodcastModalContent = ({
  showId,
  onClose,
  onEpisodeSelect,
  setSelectedEpisodeUrl,
}) => {
  const [selectedShowData, setSelectedShowData] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [Seasonloading, setSeasonloading] = useState(true);

  /**
   * Fetches data for the selected podcast show.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setSelectedShowData(data);
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setSeasonloading(false);
        console.log('Fetch completed for showId:', showId);
      }
    };

    fetchData();
  }, [showId]);

  if (Seasonloading) {
    return <p>Loading show data...</p>;
  }

  if (!selectedShowData) {
    return <p>Error fetching show data. Please try again later.</p>;
  }

  /**
   * Handles the selection of an episode.
   *
   * @param {Object} episode - The selected episode object.
   */
  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    onEpisodeSelect(episodeUrl); // Pass the selected episode's URL to the parent (PodcastCard)
    setSelectedEpisodeUrl(episodeUrl); // Pass the selected episode's URL to the parent (main.jsx)
  };

  /**
   * Handles toggling favorite status for an episode.
   *
   * @param {string} episodeId - The unique identifier for the episode.
   */
  const handleToggleFavorite = (episodeId) => {
    const updatedFavorites = [...favoriteEpisodes];
    const index = updatedFavorites.indexOf(episodeId);

    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(episodeId);
    }

    setFavoriteEpisodes(updatedFavorites);

    // Save favorite episodes locally
    localStorage.setItem('favoriteEpisodes', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>{selectedShowData.title}</h2>
      <p>{selectedShowData.description}</p>
      <h3>Seasons</h3>
      {selectedShowData.seasons.map((season) => (
        <div key={season.season} className="SeasonDiv">
          <h4>{season.title}</h4>
          <img src={season.image} alt={`Season ${season.season}`} />
          <ul className="EpisodeSection">
            {season.episodes.map((episode) => (
              <li
                key={episode.episode}
                onClick={() => handleEpisodeSelect(episode)}
              >
                <Button variant="outlined">Play</Button>
                <IconButton
                  aria-label="toggle favorite"
                  onClick={() => handleToggleFavorite(episode.episode)}
                  color={
                    favoriteEpisodes.includes(episode.episode)
                      ? 'secondary'
                      : 'default'
                  }
                >
                  <FavoriteIcon />
                </IconButton>
                <p>{episode.title}</p>
                <p>{episode.description}</p>
                <p>{episode.file}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={onClose}>Close Modal</button>
    </div>
  );
};

PodcastModalContent.propTypes = {
  showId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onEpisodeSelect: PropTypes.func.isRequired,
  setSelectedEpisodeUrl: PropTypes.func.isRequired,
};

export default PodcastModalContent;
