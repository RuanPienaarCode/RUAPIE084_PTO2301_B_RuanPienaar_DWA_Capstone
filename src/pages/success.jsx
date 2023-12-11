import React, { useEffect } from 'react';
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getUserData from '../components/getUserData';
import getSupabase from '../assets/fetchSupa';
import logo from '../assets/bolt.png';

// Initialize Supabase client
const supabase = getSupabase();

/**
 * Represents the Success component that displays a welcome message upon successful login.
 * @param {Object} props - The component's props.
 * @param {Object} props.user - User data object.
 * @param {Function} props.setUser - Function to update user state.
 * @returns {JSX.Element} - The rendered Success component.
 */
export default function Success(props) {
  const navigate = useNavigate();
  const { user, setUser } = props;

  /**
   * Effect hook to fetch user data when the component mounts.
   * @function
   */
  useEffect(() => {
    getUserData(setUser);
  }, []);

  /**
   * Handles the logout functionality.
   * @async
   * @function
   * @throws {Error} Throws an error if there is an issue during the logout process.
   */
  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error during logout:', error);
      }

      // Redirect to the login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <Box sx={{ pt: 8, pb: 6 }}>
      <Container className="SuccessContainer">
        {/* Welcome message */}
        <Typography variant="h2" align="center" gutterBottom>
          Welcome, {user.user_metadata.full_name}!
        </Typography>

        {/* Logo */}
        <img
          className="logo"
          src={logo}
          alt="Devcast Logo"
          style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }}
        />

        {/* Logged In message */}
        <Typography variant="h6" align="center" paragraph>
          You are Logged In
        </Typography>

        {/* Logout and Home buttons */}
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
          <Button variant="contained" onClick={() => navigate('/Home')}>
            Home
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
