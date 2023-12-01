import React from 'react';
import ReactPlayer from 'react-player';
import Playlist from './Playlist';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const AudioPlayer = () => {
  const style = {
    position: 'fixed',
    transform: 'translateX(-50%)', // Center the div horizontally
    bottom: 0,
    left: 0,
    width: '96%',
  };
  return (
    <div className="audio-player">
      <CardActions disableSpacing>
        <ReactPlayer
          url="/src/assets/test-mp3.mp3"
          controls
          width="95%"
          height="50px"
        />

        <IconButton aria-label="add to favorites" style={{ color: 'white' }}>
          <QueueMusicIcon />
        </IconButton>
      </CardActions>
    </div>
  );
};

export default AudioPlayer;
