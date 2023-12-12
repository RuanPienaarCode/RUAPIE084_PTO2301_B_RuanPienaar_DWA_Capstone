// components/PodcastCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenreCard from './GenreCard';
import Modal from './Modal';
import PodcastModalContent from './PodcastModalContent';

/**
 * Represents a card displaying podcast information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the podcast.
 * @param {string} props.title - The title of the podcast.
 * @param {string} props.description - The description of the podcast.
 * @param {(number|array)} props.seasons - The number of seasons or an array of seasons for the podcast.
 * @param {string} props.image - The URL of the podcast image.
 * @param {Array} props.genres - An array of genre identifiers for the podcast.
 * @param {string} props.updated - The date when the podcast was last updated.
 * @returns {JSX.Element} - The rendered PodcastCard component.
 */
const PodcastCard = ({
  id,
  title,
  description,
  seasons,
  image,
  genres,
  updated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState(null);

  /**
   * Opens the modal to view the seasons of the podcast.
   */
  const handleViewSeasons = () => {
    const showId = id; // Assuming that `id` is the property containing the showId
    console.log('Clicked on showId:', showId);
    setIsModalOpen(true);
    setSelectedShowId(showId);
  };

  /**
   * Handles the selection of an episode.
   *
   * @param {string} episodeUrl - URL of the selected episode.
   */
  const handleEpisodeSelect = (episodeUrl) => {
    setSelectedEpisodeUrl(episodeUrl); // Store the selected episode URL in the state
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ShowCard">
      <p>{id}</p>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <GenreCard genreIds={genres} />
      <p>Seasons: {seasons}</p>
      <p>Published: {new Date(updated).toLocaleDateString()}</p>
      <button onClick={handleViewSeasons}>View Seasons</button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        showId={selectedShowId}
        onEpisodeSelect={handleEpisodeSelect}
        setSelectedEpisodeUrl={setSelectedEpisodeUrl} // Pass the setter
      ></Modal>
    </div>
  );
};

PodcastCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  seasons: PropTypes.oneOfType([
    PropTypes.number.isRequired, // If it's a number
    PropTypes.array.isRequired, // If it's an array
  ]),
  image: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
  updated: PropTypes.string.isRequired,
};

export default PodcastCard;
