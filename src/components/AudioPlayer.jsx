import React from 'react';
import ReactPlayer from 'react-player';

const AudioPlayer = () => {
  const style = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
  };
  return (
    <div className="audio-player">
      <ReactPlayer
        url="/src/assets/test-mp3.mp3"
        controls
        width="100%"
        height="50px"
      />
    </div>
  );
};

export default AudioPlayer;
