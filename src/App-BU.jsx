// App.jsx
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './index.css';
import Album from './pages/album';
import Homepage from './pages/home.jsx';
import Login from './pages/login.jsx';
import SuccessAuth from './pages/success.jsx';
import TestBar from './pages/test.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestBar />} />
        <Route path="/album" element={<Album />} />
        <Route path="/" element={<Homepage />} />
        {/* Add a route for "/login" */}
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
