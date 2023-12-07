// src/components/AudioPlayer.jsx
import React from 'react';

import ReactPlayer from 'react-player';

const AudioPlayer = ({ episode }) => {
  const style = {
    position: 'fixed',
    transform: 'translateX(-50%)', // Center the div horizontally
    bottom: 0,
    left: 0,
    width: '96%',
  };

  return (
    <div className="audio-player">
      <ReactPlayer
        url="${process.env.PUBLIC_URL}/assets/test-mp3.mp3"
        controls
      />
    </div>
  );
};

export default AudioPlayer;
