import { useEffect } from 'react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/bolt.png';
import getUserData from '../components/getUserData';
import getSupabase from '../assets/fetchSupa';

const supabase = getSupabase();

export default function Success(props) {
  const navigate = useNavigate();
  const { user, setUser } = props;

  useEffect(() => {
    getUserData(setUser);
  }, []);

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during logout:', error);
      }
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <Box
      sx={{
        pt: 8,
        pb: 6,
      }}
    >
      <Container className="SuccessContainer">
        <h2>Welcome, {user.user_metadata.full_name} !</h2>

        <img
          className="logo"
          src={logo}
          alt="Devcast Logo"
          style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }}
        />
        <Typography variant="h6" align="center" paragraph>
          You are Logged In
        </Typography>

        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="Outlined" onClick={() => logout()}>
            Logout
          </Button>
          <Button variant="Contained" onClick={() => navigate('/Home')}>
            Home
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
