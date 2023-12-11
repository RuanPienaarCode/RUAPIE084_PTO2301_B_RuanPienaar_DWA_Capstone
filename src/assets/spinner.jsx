import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Loading animation component.
 *
 * @component
 * @example
 * // Example usage of LoadingAnimation component
 * <LoadingAnimation />
 *
 * @returns {JSX.Element} The rendered LoadingAnimation component.
 */
const LoadingAnimation = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <p>Loading...</p>
      <CircularProgress />
    </Box>
  );
};

export default LoadingAnimation;
