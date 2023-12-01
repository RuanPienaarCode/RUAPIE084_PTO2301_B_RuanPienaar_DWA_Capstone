import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  styled,
  Paper,
  Skeleton,
} from '@mui/material';
import MainImageCard from './Item';
import ShowDetailsModal from './ShowDetailsModal';
import './ShowList.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ShowsList() {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [showCount, setShowCount] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleShowClick = (show) => {
    setSelectedShow(show);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedShow(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('showsData');
      const storedTimestamp = localStorage.getItem('showsTimestamp');

      if (storedData && storedTimestamp) {
        const currentTime = new Date().getTime();
        const storedTime = new Date(Number(storedTimestamp)).getTime();
        const timeDiff = (currentTime - storedTime) / (1000 * 60 * 60);

        if (timeDiff < 2) {
          setShows(JSON.parse(storedData));
          setLoading(false);
          return;
        }
      }

      // Function to group shows by genre
      const groupShowsByGenre = (shows) => {
        const groupedShows = {};
        shows.forEach((show) => {
          const genreTitle = mapGenreIdToTitle(show.genre_id);
          if (!groupedShows[genreTitle]) {
            groupedShows[genreTitle] = [];
          }
          groupedShows[genreTitle].push(show);
        });
        return groupedShows;
      };

      // Filtered and grouped shows by genre
      const groupedShows = groupShowsByGenre(limitedShows);

      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        setLoading(false);
        const data = await response.json();
        setShows(data);
        localStorage.setItem('showsData', JSON.stringify(data));
        localStorage.setItem('showsTimestamp', new Date().getTime());
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    setShowCount(calculateInitialShowCount());
  }, []);

  const calculateInitialShowCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) return 21;
    if (screenWidth >= 600) return 7;
    return 2;
  };

  useEffect(() => {
    setShowCount(calculateInitialShowCount());
  }, []);

  const limitedShows = shows.slice(0, showCount);

  const handleShowMore = () => {
    setShowCount(
      (prevShowCount) => prevShowCount + calculateInitialShowCount()
    );
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <Skeleton variant="rectangular" width={200} height={100} />
          ) : (
            limitedShows.map((show) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={show.id}>
                <MainImageCard
                  show={show}
                  imageLoaded={imageLoaded}
                  onImageLoad={() => setImageLoaded(true)}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      {showCount < shows.length && (
        <button onClick={handleShowMore}>Show More</button>
      )}
    </>
  );
}

export default ShowsList;
