import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import logo from '../assets/bolt.png';
import Banner from '../assets/PodspaceBanner.png';
import Carousel from '../components/Slider';

export default function Landing() {
  return (
    <Box
      sx={{
        pt: 1,
        pb: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center', // Center the content horizontally
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="secondary"
        >
          Podspace
        </Typography>

        <Carousel />

        <Stack
          sx={{ pt: 1, mb: 2 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outlined">Sign Up</Button>
          </Link>
        </Stack>

        <img
          className="Banner"
          src={Banner}
          alt="Bolt Banner"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Container>
    </Box>
  );
}
