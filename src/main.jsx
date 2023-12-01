// src/main.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { themeOptions } from './styles/theme';

import Login from './pages/Login';
import Home from './pages/Home';
import Success from './pages/Success';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5C469C',
    },
    secondary: {
      main: '#ffffff',
    },
    tertiary: {
      main: '#1D267D',
    },
    quaternary: {
      main: '#D4ADFC',
    },
  },
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const AppRouter = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="success" element={<Success />} />
    <Route path="/" element={<Home />} />
  </Routes>
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <CssBaseline />
          <AppRouter />
        </Provider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
