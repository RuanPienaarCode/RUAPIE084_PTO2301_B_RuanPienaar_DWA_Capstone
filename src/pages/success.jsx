import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
// import {
//   // Import predefined theme
//   ThemeSupa,
// } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
// // import Header from '../components/header';

// const supabase = createClient(
//   'https://luspkgilingfnlvmjers.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1c3BrZ2lsaW5nZm5sdm1qZXJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTM5MDIwNywiZXhwIjoyMDE0OTY2MjA3fQ.Q39xLVAbeq5zkcmugmujZu6YchN1TpB4q7imf0hOy9A'
// );

function SuccessAuth() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="success">
      <header className="App-header">
        {user ? (
          <>
            <h1>Success</h1>
            <button onClick={() => signOutUser()}>Sign Out</button>
          </>
        ) : (
          <>
            <h1>User Not logged in</h1>
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default SuccessAuth;
