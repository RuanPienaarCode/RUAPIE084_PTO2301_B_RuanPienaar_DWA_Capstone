//app.jsx
import React from 'react';
import ErrorBoundary from './pages/ErrorBoundary';
import ErrorPage from './pages/ErrorPage';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
