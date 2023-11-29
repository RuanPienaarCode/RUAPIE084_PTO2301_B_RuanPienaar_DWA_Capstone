// ErrorPage.jsx
import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>{error.statusText || error.message}</i>
      <Button
        onClick={() => {
          history.goBack(); // or navigate to a specific route
        }}
      >
        Go Back
      </Button>
    </div>
  );
}
