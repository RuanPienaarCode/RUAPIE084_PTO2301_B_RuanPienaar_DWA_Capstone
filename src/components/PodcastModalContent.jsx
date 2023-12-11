import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

const PodcastModalContent = ({
  showId,
  onClose,
  setEpisode,
  onEpisodeSelect,
  setSelectedEpisodeUrl,
}) => {
  const [selectedShowData, setSelectedShowData] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [Seasonloading, setSeasonloading] = useState(true);

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

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    onEpisodeSelect(episode.file); // Pass the selected episode's URL to the parent
    setSelectedEpisodeUrl(episode.file); // Use the received prop to set the selected episode's URL
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
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon color="white" />
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
  setSelectedEpisodeUrl: PropTypes.func.isRequired, // Make sure the prop type is correct
};

export default PodcastModalContent;
