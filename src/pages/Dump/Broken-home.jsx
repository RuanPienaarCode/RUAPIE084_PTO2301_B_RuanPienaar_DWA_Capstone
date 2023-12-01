// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../supabase/SupabaseClient';
import { GithubLogin } from '../store/authSlice';
import Navbar from '../components/Navbar';
import ShowsList from '../components/ShowsList'; // Updated path
import Box from '@mui/material/Box';
import AudioPlayer from '../components/AudioPlayer';
import GenreSection from '../components/GenreSection';
import useFetchAPIData from '../components/FetchData';
// If you have a GenreSection component

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const [showsByGenre, setShowsByGenre] = useState({});
  const { loading, shows } = useFetchAPIData();

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
  }, [dispatch]);

  useEffect(() => {
    const organizedShows = {};
    shows.forEach((show) => {
      show.genres.forEach((genreId) => {
        const genreTitle = mapGenreIdToTitle(genreId);
        if (!organizedShows[genreTitle]) {
          organizedShows[genreTitle] = [];
        }
        organizedShows[genreTitle].push(show);
      });
    });

    setShowsByGenre(organizedShows);
  }, [shows]);

  if (user.email) {
    return (
      <div>
        <Box className="home-box">
          <Navbar />
          {Object.entries(showsByGenre).map(([genre, genreShows]) => (
            <GenreSection key={genre} genre={genre} shows={genreShows} />
          ))}
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
          {/* {Object.entries(showsByGenre).map(([genre, genreShows]) => (
            <GenreSection key={genre} genre={genre} shows={genreShows} />
          ))} */}
        </Box>
        <AudioPlayer />
      </div>
    );
  } else {
    return <div>error</div>;
  }
}
