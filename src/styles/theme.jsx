// src/styles/theme.jsx

import { createTheme } from '@mui/system';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#646cff',
    },
    secondary: {
      main: '#535bf2',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
    },
    background: {
      default: '#242424',
      paper: '#ffffff',
    },
  },
});
