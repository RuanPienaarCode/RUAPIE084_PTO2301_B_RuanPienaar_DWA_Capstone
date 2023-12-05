/**
 * Handles the change in authentication state.
 *
 * @param {string} event - The event that triggered the state change.
 * @param {object} session - The session object containing user information.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import getUserData from '../components/getUserData';

import getSupabase from '../assets/api';

import logo from '../assets/bolt.png';
import Banner from '../assets/PodspaceBanner.png';

const supabase = getSupabase();

export default function Login(props) {
  const { setUser } = props;
  const navigate = useNavigate();

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

  useEffect(() => {
    getUserData(setUser);
  }, []);

  return (
    <Box className="login-page" style={{ maxWidth: '550px' }}>
      <img
        className="Banner"
        src={Banner}
        alt="Bolt Banner"
        style={{ maxWidth: '550px', height: 'auto' }}
      />
      <Typography>
        <h1>Login</h1>
      </Typography>

      <Auth
        supabaseClient={supabase}
        providers={['discord', 'github']}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />
      <button onClick={() => navigate('/success')} aria-label="Go to Success">
        Go to Success
      </button>
    </Box>
  );
}
