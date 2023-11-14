import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// import Header from '../components/header';

const supabase = createClient(
  'https://luspkgilingfnlvmjers.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1c3BrZ2lsaW5nZm5sdm1qZXJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTM5MDIwNywiZXhwIjoyMDE0OTY2MjA3fQ.Q39xLVAbeq5zkcmugmujZu6YchN1TpB4q7imf0hOy9A'
);

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== 'SIGNED_OUT') {
        // Forward to success URL
        navigate('/login');
      } else {
        // Forward to login URL
        navigate('/');
      }
    });
  });

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
