import { useRouteError } from 'react-router-dom';
import { Button } from '@mui/material';
import '../styles/app.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Unexpected error has occurred.</p>
      <p>
        <i>{error && error.statusText ? error.statusText : error && error.message}</i>
      </p>
      <Button
        onClick={() => {
          window.history.back();
        }}
      >
        Go Back
      </Button>
    </div>
  );
}
