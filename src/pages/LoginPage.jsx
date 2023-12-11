import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import getUserData from '../components/getUserData';
import getSupabase from '../assets/SupaAPI';

import logo from '../assets/bolt.png';
import Banner from '../assets/PodspaceBanner.png';

// Initialize Supabase client
const supabase = getSupabase();

/**
 * Login component responsible for handling user authentication and rendering the login UI.
 * @param {Object} props - Component props.
 * @param {Function} props.setUser - Function to update user state.
 * @returns {JSX.Element} - The rendered Login component.
 */
export default function Login(props) {
  const { setUser } = props;
  const navigate = useNavigate();

  /**
   * Handles the change in authentication state.
   * @param {string} event - The event that triggered the state change.
   * @param {object} session - The session object containing user information.
   */
  useEffect(() => {
    const handleAuthStateChange = (event, session) => {
      console.log('LOGIN log Auth state changed:', event, session);

      if (event === 'SIGNED_IN') {
        setUser(session.user);
        navigate('/home');
        console.log('User signed in');
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
        console.log('User signed out');
      }
    };

    // Add the auth state change listener
    supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Clean up all auth state change listeners when the component unmounts
    return () => {
      supabase.auth.onAuthStateChange(null);
    };
  }, []);

  /**
   * Fetches additional user data when the component mounts.
   */
  useEffect(() => {
    getUserData(setUser);
  }, []);

  return (
    <Box className="login-page" style={{ maxWidth: '550px' }}>
      {/* Banner Image */}
      <img
        className="Banner"
        src={Banner}
        alt="Bolt Banner"
        style={{ maxWidth: '550px', height: 'auto' }}
      />

      {/* Login Title */}
      <Typography>
        <h1>Login</h1>
      </Typography>

      {/* Authentication Component */}
      <Auth
        supabaseClient={supabase}
        providers={['discord', 'github']}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />

      {/* Navigation Buttons */}
      <button onClick={() => navigate('/home')} aria-label="Go to Home Page">
        Go to Home Page
      </button>
      <button onClick={() => navigate('/success')} aria-label="Go to Success">
        Go to Success
      </button>
    </Box>
  );
}
