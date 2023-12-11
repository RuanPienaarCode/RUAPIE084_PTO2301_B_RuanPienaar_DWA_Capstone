import React from 'react';
import PodcastModalContent from './PodcastModalContent';

/**
 * Modal component to display podcast details and episodes.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {string} props.title - Title of the podcast.
 * @param {Array} props.seasons - Array of seasons for the podcast.
 * @param {string} props.showId - Unique identifier for the podcast show.
 * @param {Function} props.onEpisodeSelect - Callback function when an episode is selected.
 * @param {Function} props.setSelectedEpisodeUrl - Setter function to update the selected episode URL.
 * @returns {JSX.Element} - The rendered Modal component.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  seasons,
  showId,
  onEpisodeSelect,
  setSelectedEpisodeUrl,
}) => {
  if (!isOpen) {
    return null;
  }

  /**
   * Handles the selection of an episode.
   *
   * @param {string} episodeUrl - URL of the selected episode.
   */
  const handleEpisodeSelect = (episodeUrl) => {
    onEpisodeSelect(episodeUrl); // Pass the selected episode URL to the parent (PodcastCard)
    setSelectedEpisodeUrl(episodeUrl); // Pass the selected episode URL to the parent (main.jsx)
    console.log('Selected Episode URL:', episodeUrl);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <PodcastModalContent
          showId={showId}
          onClose={onClose}
          onEpisodeSelect={handleEpisodeSelect}
          setSelectedEpisodeUrl={setSelectedEpisodeUrl} // Pass the setter
        />
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default Modal;
