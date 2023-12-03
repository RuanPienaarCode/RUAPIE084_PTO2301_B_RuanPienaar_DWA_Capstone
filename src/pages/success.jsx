import { useEffect } from 'react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import logo from '../assets/bolt.png';

import getUserData from '../components/getUserData';

import getSupabase from '../assets/api';

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
      <Container>
        <h2>Welcome, {user.user_metadata.full_name} !</h2>

        <img
          src={user.user_metadata.avatar_url}
          alt="Avatar"
          style={{ borderRadius: '50%', maxWidth: '100%', height: 'auto' }}
        ></img>

        <img
          className="logo"
          src={logo}
          alt="Devcast Logo"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Typography variant="h6" align="center" paragraph>
          Join me, Blake Foster (aka BLAFOS090), as we embark on a journey
          through the latest in technology and software development. As part of
          PTO2301-B at CodeSpace, this podcast app serves as the capstone
          project for the Software Development Bootcamp. Together, let's explore
          the cutting-edge world of React and navigate the dynamic landscape of
          coding.
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
