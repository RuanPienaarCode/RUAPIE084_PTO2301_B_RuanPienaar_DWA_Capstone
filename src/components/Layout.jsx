// components/Layout.jsx
// import React from 'react';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TestBar from './TestBar';
import Footer from './footer';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Layout = ({ children, theme = defaultTheme }) => {
  //  function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TestBar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;

// {
/* const Layout = ({ children }) => {
  return (
    <div>
      <TestBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}; */
// }

// export default Layout;
