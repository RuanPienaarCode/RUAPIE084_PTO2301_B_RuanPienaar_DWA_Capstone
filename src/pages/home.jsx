// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Likes from '../components/Likes.jsx';
import Search from '../components/search';
// import PodcastCarousel from '../components/carousel';
import Carousel from '../components/carousel';
import getUserData from '../components/getUserData.jsx';
import AudioPlayer from '../components/AudioPlayer.jsx';
import getSupabase from '../assets/api';
import '../styles/App.css';

Home.propTypes = {
  allPodcastData: PropTypes.any,
  user: PropTypes.any,
  setPodcastData: PropTypes.any,
  setUser: PropTypes.any,
};
const supabase = getSupabase();

export default function Home(props) {
  const { allPodcastData, user, setPodcastData, setUser, episode, setEpisode } =
    props;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    getUserData(setUser);
  }, []);

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error during logout:', error);
      }
      Navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  useEffect(() => {
    try {
      fetch('https://podcast-api.netlify.app/shows')
        .then((res) => res.json())
        .then((data) => {
          setPodcastData(data);
          console.log(`All podcast data:`, data);
          console.log(allPodcastData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching podcast data:', error);
          setError('Error fetching podcast data. Please try again later.');
          setLoading(false);
        });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }, [setPodcastData]);

  useEffect(() => {
    console.log(allPodcastData);
  }, [allPodcastData]);

  return (
    <Box
      className="home"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {user ? (
        <div className="home">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100vw',
            }}
          >
            {/* <PodcastCarousel /> */}
            <Carousel />
          </Box>
          <Box
            className="navbar2"
            sx={{
              display: 'flex',
              flexGrow: 1,
              p: 3,
              backgroundColor: 'secondary',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Box>

          <AudioPlayer
            episode={episode}
            selectedPodcast={selectedPodcast}
            setSelectedPodcast={setSelectedPodcast}
            setEpisode={setEpisode}
            podcastData={allPodcastData}
            loading={loading}
            setLoading={setLoading}
          />
          <Box className="search-box">
            <Paper sx={{ backgroundColor: '#242424' }}>
              <Search
                allPodcastData={allPodcastData}
                setLoading={setLoading}
                loading={loading}
                setEpisode={setEpisode}
                selectedPodcast={selectedPodcast}
                setSelectedPodcast={setSelectedPodcast}
              />
            </Paper>
          </Box>
          {error ? <Typography>{error}</Typography> : <div></div>}
        </div>
      ) : (
        <p>Please log to start listening</p>
      )}
    </Box>
  );
}
