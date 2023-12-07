import { useRouteError } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import '../styles/App.css';

const CustomErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const goBack = () => {
    window.history.back();
  };

  return (
    <Box id="custom-error-page">
      <h1>You have an Error</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <i>
          {error && error.statusText
            ? error.statusText
            : error && error.message}
        </i>
      </p>
      <Button onClick={goBack}>Go Back</Button>
    </Box>
  );
};

export default CustomErrorPage;
