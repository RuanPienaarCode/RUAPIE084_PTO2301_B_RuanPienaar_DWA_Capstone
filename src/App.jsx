// src/app.jsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom'; // Removed duplicate imports
import './styles/App.css';
import './styles/index.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Slide, useScrollTrigger, Typography, Link } from '@mui/material'; // Added Typography and Link
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LightModeIcon from '@mui/icons-material/LightMode';

import Login from './pages/Login';
import Home from './pages/Home';
import Success from './pages/Success'; // Import Success component
// import Likes from './pages/Likes'; // Import Likes component

import AudioPlayer from './components/AudioPlayer';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://capstone-podcast-ruapie084.netlify.app/#"
      >
        Podspace
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [mode, setMode] = useState('light');
  const [allPodcastData, setPodcastData] = useState([]);
  const [user, setUser] = useState(null);
  const [episode, setEpisode] = useState(null);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Any global initialization logic can be placed here
  }, []);

  function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction="up" in={!trigger}>
        {children}
      </Slide>
    );
  }
  const Player = ({ episode }) => (
    <AudioPlayer
      src={episode?.file}
      onPlay={() => console.log('Audio is playing')}
      showSkipControls
      showJumpControls
      layout="horizontal"
      style={{
        width: '100%',
        borderRadius: '10px',

        /* add more styles here */
      }}
      className="custom-audio-player"
    />
  );
  return (
    <div className={`app ${mode}`}>
      <header>
        <AppBar
          position="static"
          className="navbar"
          sx={{ borderRadius: 5, marginBottom: 5 }}
        >
          <Toolbar className="toolbar">
            <NavLink
              to="/home"
              className="nav-link"
              activeClassName="active-link"
              exact
              sx={{ fontSize: { xs: 20, md: 30 } }}
            >
              <HomeIcon />
            </NavLink>

            <NavLink
              to="/login"
              className="nav-link"
              activeClassName="active-link"
              exact
              sx={{ fontSize: { xs: 20, md: 30 } }}
            >
              <LoginIcon />
            </NavLink>

            <IconButton
              onClick={toggleMode}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <LightModeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <Routes>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/success"
            element={<Success user={user} setUser={setUser} />}
          />
          <Route
            path="/home"
            element={
              <Home
                user={user}
                allPodcastData={allPodcastData}
                setPodcastData={setPodcastData}
                setUser={setUser}
                setEpisode={setEpisode}
                episode={episode}
              />
            }
          />
          <Route path="/likes/:id" component={Likes} />
          <Route path="error" element={<ErrorPage />} />
        </Routes>

        <footer>
          <HideOnScroll>
            <AppBar
              position="fixed"
              className="bottom-navbar"
              sx={{
                borderRadius: 5,
                zIndex: 1,
                top: 'auto',
                bottom: 0,
                maxHeight: 650,
                backgroundColor: '#ffffff',
              }}
            >
              <Toolbar className="bottom-toolbar">
                <Player episode={episode} />
              </Toolbar>
            </AppBar>
          </HideOnScroll>
        </footer>
      </main>
    </div>
  );
}
