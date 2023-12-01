import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingAnimation() {
  return (
    <Box sx={{ display: 'flex' }}>
      <p>Loading...</p>
      <CircularProgress />
    </Box>
  );
}
