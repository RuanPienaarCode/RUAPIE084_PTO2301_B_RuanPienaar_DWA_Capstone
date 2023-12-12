import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function AudioPlayer({ selectedEpisodeUrl }) {
  const [currentPlayingAudio, setCurrentPlayingAudio] =
    useState(selectedEpisodeUrl);

  // Use a key to force re-mounting of the ReactPlayer component
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    // Update the currentPlayingAudio when selectedEpisodeUrl changes
    setCurrentPlayingAudio(selectedEpisodeUrl);

    // Change the key to force re-mounting of the ReactPlayer component
    setPlayerKey((prevKey) => prevKey + 1);
  }, [selectedEpisodeUrl]);

  if (!currentPlayingAudio) {
    return <error>There was an error</error>;
  }

  return (
    <ReactPlayer
      key={playerKey}
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
