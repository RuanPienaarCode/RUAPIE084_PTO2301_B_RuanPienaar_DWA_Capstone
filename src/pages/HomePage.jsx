import '../styles/App.css';
import FetchPodcastData from '../components/FetchPodcastData';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../styles/App.css';

export default function TestPage() {
  return (
    <div id="test-page">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <FetchPodcastData />
        </Grid>
      </Box>
    </div>
  );
}
