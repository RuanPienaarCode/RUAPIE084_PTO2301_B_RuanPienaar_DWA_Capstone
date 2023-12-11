import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

function AudioPlayer({ selectedEpisodeUrl }) {
  if (!selectedEpisodeUrl) {
    return <error>There was an error</error>;
  }

  // Hardcode the placeholder URL for testing
  const hardcodedUrl = 'https://podcast-api.netlify.app/placeholder-audio.mp3';

  return (
    <ReactPlayer
      key={selectedEpisodeUrl}
      url={hardcodedUrl} // Use the dynamic URL
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
