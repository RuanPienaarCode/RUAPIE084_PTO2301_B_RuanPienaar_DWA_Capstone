/**
 * Renders the Landing component.
 *
 * @return {JSX.Element} The rendered Landing component.
 */

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import logo from '../assets/bolt.png';

import Carousel from '../components/carousel';

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
      <Container maxWidth="maxWidth">
        <Typography component="h1" variant="h3" align="center" color="primary"></Typography>

        <Carousel />
        <Stack sx={{ pt: 1, mb: 2 }} direction="row" spacing={2} justifyContent="center">
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outlined">Sign Up</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}