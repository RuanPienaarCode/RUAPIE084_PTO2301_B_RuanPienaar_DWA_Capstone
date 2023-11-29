// components/ShowsList.js
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Skeleton } from '@mui/material';
import MainImageCard from './Item';
import { Modal } from '@mui/material';
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
  const [selectedShow, setSelectedShow] = useState(null); // Track the selected show
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
        const timeDiff = (currentTime - storedTime) / (1000 * 60 * 60); // Calculate time difference in hours

        if (timeDiff < 2) {
          // Use stored data if it's less than 2 hours old
          setShows(JSON.parse(storedData));
          setLoading(false);
          return;
        }
      }

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

    if (screenWidth >= 1200) {
      return 21;
    } else if (screenWidth >= 600) {
      return 7;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    const initialShowCount = calculateInitialShowCount();
    console.log('Initial show count:', initialShowCount);
    setShowCount(initialShowCount);
  }, []);

  // Limit the number of items to be displayed
  const limitedShows = shows.slice(0, showCount);

  const handleShowMore = () => {
    console.log('Show more clicked');
    setShowCount(
      (prevShowCount) => prevShowCount + calculateInitialShowCount()
    );
  };

  // const limitedShows = shows.slice(0, calculateShowCount());

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid item xs={4} className="shows-container" justifyContent="center">
          {loading ? (
            <Skeleton variant="rectangular" width={200} height={100} />
          ) : (
            <>
              {limitedShows.map((show) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
                  {/* Pass the imageLoaded prop and the setImageLoaded callback */}
                  <MainImageCard
                    show={show}
                    imageLoaded={imageLoaded}
                    onImageLoad={() => setImageLoaded(true)}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>{' '}
      {showCount < shows.length && (
        // Call handleShowMore wherever you want to load more shows
        <button onClick={handleShowMore}>Show More</button>
      )}
    </React.Fragment>
  );
}

export default ShowsList;
