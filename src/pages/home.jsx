// src/pages/home.jsx
import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { GithubLogin } from '../store/authSlice';
import ShowsList from '/src/components/ShowsList';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TransitionsModal from '../components/ShowDetailsModal';

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        supabase.auth.getUser().then((value) => {
          if (value) {
            dispatch(GithubLogin({ user: value.data.user }));
          }
        });
      }
    });
  }, []);

  if (user.email) {
    return (
      <div>
        <Box className="home-box">
          <Navbar />
          <ShowsList />
          <AudioPlayer />
        </Box>
      </div>
    );
  }
  if (!user.email) {
    return (
      <div>
        <Box className="home-box">
          <Navbar />
          <ShowsList />
          <TransitionsModal />
        </Box>
        <AudioPlayer />
      </div>
    );
  } else {
    return <div>error</div>;
  }
}
