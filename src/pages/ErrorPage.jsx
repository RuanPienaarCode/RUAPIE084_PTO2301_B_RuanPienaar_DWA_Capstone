import { useRouteError } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import '../styles/App.css';

/**
 * CustomErrorPage component displays a custom error message and provides a "Go Back" button.
 * @returns {JSX.Element} - The rendered CustomErrorPage component.
 */
const CustomErrorPage = () => {
  // Get the error object from the route
  const error = useRouteError();
  console.error(error);

  /**
   * Handles the "Go Back" button click, navigating to the previous page in the history.
   */
  const goBack = () => {
    window.history.back();
  };

  return (
    <Box id="custom-error-page">
      <h1>An unexpected error has occurred.</h1>
      <p>
        <i>
          {error && error.statusText
            ? error.statusText
            : error && error.message}
        </i>
      </p>
      {/* "Go Back" button */}
      <Button onClick={goBack}>Go Back</Button>
    </Box>
  );
};

export default CustomErrorPage;
