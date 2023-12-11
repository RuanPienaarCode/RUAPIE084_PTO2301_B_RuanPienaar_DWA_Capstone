import AudioPlayer from './AudioPlayer';
import { Paper } from '@mui/material';

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
      />{' '}
    </Paper>
  );
};

export default Footer;
