//pages/home.jsx
// import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ThemeProvider, styled } from '@mui/system';
// import Button from '@mui/material/Button';
import Layout from '../components/Layout';

function Homepage() {
  const navigate = useNavigate();
  // Define a function to handle page changes
  const handlePageChange = (page) => {
    // You can add logic here to perform actions based on the selected page if needed
    console.log(`Navigating to ${page}`);
    navigate('/' + page); // Assuming your pages are at the root level; adjust as needed
  };

  return (
    <Layout>
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
    </Layout>
  );
}

export default Homepage;
