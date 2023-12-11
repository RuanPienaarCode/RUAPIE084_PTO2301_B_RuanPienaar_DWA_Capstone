// components/PodcastCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenreCard from './GenreCard';
import Modal from './modal';
import PodcastModalContent from './PodcastModalContent';

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
  const [loading, setLoading] = useState(true);
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewSeasons = () => {
    const showId = id; // Assuming that `id` is the property containing the showId
    console.log('Clicked on showId:', showId);
    openModal();
    setSelectedShowId(showId);
  };

  const handleEpisodeSelect = (episodeUrl) => {
    setSelectedEpisodeUrl(episodeUrl); // Store the selected episode URL in the state
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
