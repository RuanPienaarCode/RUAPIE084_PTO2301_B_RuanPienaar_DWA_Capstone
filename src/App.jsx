// src/App.jsx
import * as React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Slide, useScrollTrigger } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import getSupabase from './assets/fetchSupa';
import { Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import Success from './pages/success';
import Login from './pages/LoginPage';
import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/footer';
import FavouritePage from './pages/FavouritesPage';
import Copyright from '../src/components/Copyright';
import './styles/App.css';

/**
 * The main application component that serves as the entry point for the entire app.
 * Manages state, authentication, routing, and rendering of different pages.
 * @returns {JSX.Element} - The rendered App component.
 */
export default function App() {
  // State variables
  const [mode, setMode] = useState('light');
  const [PodcastData, setPodcastData] = useState([]);
  const [user, setUser] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState(
    '/public/test-mp3.mp3'
  );

  // Supabase client
  const supabase = getSupabase();

  /**
   * Toggles between light and dark mode.
   */
  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  /**
   * Handles user logout.
   * Navigates to the login page after successful logout.
   * @async
   */
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
    // Apply the mode class to the body element
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
  }, [mode]);

  /**
   * Hide the AppBar on scroll down and show it on scroll up.
   * @param {Object} props - Component props.
   * @returns {JSX.Element} - The Slide component for hiding on scroll.
   */
  function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
      <Slide appear={false} direction="up" in={!trigger}>
        {children}
      </Slide>
    );
  }

  /**
   * Handles clicking on an episode to set the selected episode URL.
   * @param {string} episodeUrl - The URL of the clicked episode.
   */
  const handleEpisodeClick = (episodeUrl) => {
    console.log('Clicked on episode with URL:', episodeUrl);
    setSelectedEpisodeUrl(episodeUrl);
  };

  return (
    <div className={`app ${mode}`}>
      <header>
        <Container maxWidth="xl">
          <AppBar
            position="static"
            className="navbar"
            sx={{
              borderRadius: 0,
              marginBottom: 5,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Toolbar
              className="toolbar"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Brand logo and link */}
              <NavLink to="/login">
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  to="/"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    marginRight: '10px',
                    overflow: 'visible',
                  }}
                >
                  PODSPACE
                </Typography>
              </NavLink>

              {/* Login, Logout, and Favorites links */}
              <NavLink
                to="/login"
                className="nav-link"
                activeclassname="active-link"
                exact
                sx={{
                  fontSize: { xs: 20, md: 30 },
                  marginLeft: '10px',
                  margin: '0 auto',
                }}
              >
                <AccountCircleIcon fontSize="medium" />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  to="/"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 300,
                    marginRight: '10px',
                    overflow: 'visible',
                  }}
                >
                  Login
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => logout()}
                  sx={{ backgroundColor: '#fff' }}
                >
                  Logout
                </Button>
              </NavLink>

              <NavLink
                to="/favourites"
                className="nav-link"
                activeClassName="active-link"
                exact
              >
                <Button variant="outlined" sx={{ backgroundColor: '#fff' }}>
                  Favorites
                </Button>
              </NavLink>
            </Toolbar>
          </AppBar>
        </Container>
      </header>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
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
                allPodcastData={PodcastData}
                setPodcastData={setPodcastData}
                setUser={setUser}
                setEpisode={setEpisode}
                episode={episode}
                selectedEpisodeUrl={selectedEpisodeUrl}
                setSelectedEpisodeUrl={setSelectedEpisodeUrl}
                handleEpisodeClick={handleEpisodeClick} //
              />
            }
          />
          <Route path="/favourites" element={<FavouritePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {/* Footer and copyright */}
      <Footer selectedEpisodeUrl={selectedEpisodeUrl} />
      <Copyright sx={{ mt: 2 }} />
    </div>
  );
}
