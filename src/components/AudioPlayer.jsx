// src/components/AudioPlayer.jsx
import React from 'react';
import ReactPlayer from 'react-player';
import IconButton from '@mui/material/IconButton';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

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
      {episode && (
        <>
          <ReactPlayer url={episode.file} controls width="50%" height="50px" />
          <IconButton aria-label="add to favorites" style={{ color: 'white' }}>
            <QueueMusicIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
