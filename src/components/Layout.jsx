// components/Layout.jsx
import React from 'react';
import TestBar from './TestBar';

const Layout = ({ children }) => {
  return (
    <div>
      <TestBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
