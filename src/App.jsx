//App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import ShowsList from './components/ShowsList';
import './App.css';
import './index.css';
import Login from './pages/login.jsx';
import Homepage from './pages/home.jsx';
import SuccessAuth from './pages/success.jsx';
import Test from './pages/test.jsx';

function App() {
  //   const [shows, setShows] = useState([]);
  //   const [selectedShow, setSelectedShow] = useState(null);

  //   useEffect(() => {
  //     fetch('https://podcast-api.netlify.app/shows')
  //       .then((response) => response.json())
  //       .then((data) => setShows(data))
  //       .catch((error) => console.error(error));
  //   }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Add a route for "/login" */}
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessAuth />} />
        <Route path="/test" element={<test />} />
      </Routes>
    </Router>
  );
}

export default App;
