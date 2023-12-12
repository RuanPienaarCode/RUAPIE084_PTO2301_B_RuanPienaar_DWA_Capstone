import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function AudioPlayer({ selectedEpisodeUrl }) {
  const [currentPlayingAudio, setCurrentPlayingAudio] =
    useState(selectedEpisodeUrl);

  useEffect(() => {
    // Update the currentPlayingAudio when selectedEpisodeUrl changes
    setCurrentPlayingAudio(selectedEpisodeUrl);
  }, [selectedEpisodeUrl]);

  if (!currentPlayingAudio) {
    return <error>There was an error</error>;
  }
  return (
    <ReactPlayer
      key={selectedEpisodeUrl}
      url={currentPlayingAudio} // Use the dynamic URL
      controls
      height={45}
      width={'100%'}
    />
  );
}

AudioPlayer.propTypes = {
  selectedEpisodeUrl: PropTypes.string,
};

export default AudioPlayer;
