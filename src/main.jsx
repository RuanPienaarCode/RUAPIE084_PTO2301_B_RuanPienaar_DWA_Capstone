// main.jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ThemeProvider } from '@mui/material/styles';
import App from './App';
// import theme from './theme';

import './index.css';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
