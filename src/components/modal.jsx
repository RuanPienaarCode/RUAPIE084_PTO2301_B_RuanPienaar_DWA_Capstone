// components/Modal.jsx
import React from 'react';
import PodcastModalContent from './PodcastModalContent';

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
