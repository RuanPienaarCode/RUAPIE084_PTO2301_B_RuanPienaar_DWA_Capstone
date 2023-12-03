// src/main.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';

import './styles/App.css';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Success from './pages/Success';

import App from './App';

import Copyright from '../src/components/Copyright';

import theme from './themeColour';

<theme />;

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'success', element: <Success /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <Copyright sx={{ mt: 2 }} />
    </ThemeProvider>
  </React.StrictMode>
);
