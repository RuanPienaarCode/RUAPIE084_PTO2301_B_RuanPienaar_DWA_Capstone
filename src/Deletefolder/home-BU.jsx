// pages/home.jsx
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
//import Album from '../components/Grid';
import ShowsList from '../components/ShowsList';

function Homepage() {
  const navigate = useNavigate();
  // Define a function to handle page changes
  const handlePageChange = (page) => {
    // You can add logic here to perform actions based on the selected page if needed
    console.log(`Navigating to ${page}`);
    navigate('/' + page); // Assuming your pages are at the root level; adjust as needed
  };

  return (
    <Layout style={{ overflowY: 'scroll' }}>
      {/* <h1>Podcast Shows Test</h1> */}
      <ShowsList />
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
