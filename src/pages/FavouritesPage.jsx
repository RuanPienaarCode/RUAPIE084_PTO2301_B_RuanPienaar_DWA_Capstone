import '../styles/App.css';
import GetFavourites from '../components/GetFavourites';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../styles/App.css';

export default function FavouritePage() {
  return (
    <div id="favourite-page">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <GetFavourites />
        </Grid>
      </Box>
    </div>
  );
}
