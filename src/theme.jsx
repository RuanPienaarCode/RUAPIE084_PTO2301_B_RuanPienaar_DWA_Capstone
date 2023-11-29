import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

const themeOptions = {
  palette: {
    type: 'light', // or 'dark' based on your preference
    primary: {
      main: '#00296B',
      light: '#003F88',
      dark: '#00509D',
    },
    secondary: {
      main: '#FFD500',
      dark: '#FDC500',
      light: '#FECD00',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
};

export { theme, themeOptions };
