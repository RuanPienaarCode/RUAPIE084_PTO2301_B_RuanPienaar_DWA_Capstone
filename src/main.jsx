// src/main.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/App.css';
import Landing from './pages/Landing';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import FavouritePage from './pages/FavouritesPage';
import Success from './pages/success';
import App from './App';

/**
 * Main entry point for the application.
 * Configures the theme, sets up routing, and renders the application.
 */

// Define the theme for the entire application
const theme = createTheme(/* your theme configuration */);

// Configure the routes for the application using react-router-dom
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'success', element: <Success /> },
      { path: 'favourites', element: <FavouritePage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

/**
 * Render the application to the root element.
 * Utilizes StrictMode for additional development-time checks.
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide the theme to the entire application */}
    <ThemeProvider theme={theme}>
      {/* Provide routing for the application */}
      <RouterProvider router={router} />
      {/* 
        Add other providers or components as needed.
        These could include state management providers, API providers, etc.
      */}
    </ThemeProvider>
  </React.StrictMode>
);
