import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider, styled } from '@mui/system';
import { theme } from '../styles/theme';
// import Header from '../components/header';
import Button from '@mui/material/Button';

function Homepage() {
  const navigate = useNavigate();
  // Define a function to handle page changes
  const handlePageChange = (page) => {
    // You can add logic here to perform actions based on the selected page if needed
    console.log(`Navigating to ${page}`);
    navigate('/' + page); // Assuming your pages are at the root level; adjust as needed
  };

  return (
    <div>
      <h1>Podcast Shows Test</h1>
      {/* <ShowsList shows={shows} setSelectedShow={setSelectedShow} /> */}
      {/* {selectedShow && <Show show={selectedShow} />} */}
      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Homepage;
