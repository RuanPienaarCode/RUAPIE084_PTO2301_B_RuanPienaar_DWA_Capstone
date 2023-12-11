import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import { Paper } from '@mui/material';

/**
 * Footer component that displays an audio player at the bottom of the page.
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.selectedEpisodeUrl - The URL of the selected episode.
 * @param {Function} props.setSelectedEpisodeUrl - Function to set the selected episode URL.
 * @returns {JSX.Element} - The rendered Footer component.
 */
const Footer = ({ selectedEpisodeUrl, setSelectedEpisodeUrl }) => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 45,
      }}
    >
      <AudioPlayer
        selectedEpisodeUrl={selectedEpisodeUrl}
        setSelectedEpisodeUrl={setSelectedEpisodeUrl}
      />
    </Paper>
  );
};

// Prop types for Footer component
Footer.propTypes = {
  /**
   * The URL of the selected episode.
   */
  selectedEpisodeUrl: PropTypes.string.isRequired,

  /**
   * Function to set the selected episode URL.
   */
  setSelectedEpisodeUrl: PropTypes.func.isRequired,
};

export default Footer;
