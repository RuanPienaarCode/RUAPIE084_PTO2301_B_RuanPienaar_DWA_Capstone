// pages/login.jsx;
import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { supabaseLink, supabaseSecret } from '../secure';

// import Header from '../components/header';

const supabase = createClient(supabaseLink, supabaseSecret);

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      try {
        if (event !== 'SIGNED_OUT') {
          // Forward to success URL
          navigate('/login');
        } else {
          // Forward to login URL
          navigate('/');
        }
      } catch (error) {
        console.error('Error during navigation:', error);
      }
    });
  }, [navigate]);

  //   // Subscribe to auth state changes
  //   const unsubscribe = supabase.auth.onAuthStateChange(authStateChange);

  //   // Clean up subscription on component unmount
  //   return () => unsubscribe();
  // }, [navigate]);

  return (
    <Layout className="App">
      <header className="App-header">
        <h1>Login</h1>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['discord', 'github']} />
      </header>
    </Layout>
  );
}

export default Login;
