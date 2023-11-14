// App.jsx
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import ShowsList from './components/ShowsList';
import './App.css';
import './index.css';
import Login from './pages/login.jsx';
import Homepage from './pages/home.jsx';
import SuccessAuth from './pages/success.jsx';
import TestBar from './pages/test.jsx';

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
        <Route path="/test" element={<TestBar />} />

        <Route path="/" element={<Homepage />} />
        {/* Add a route for "/login" */}
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
