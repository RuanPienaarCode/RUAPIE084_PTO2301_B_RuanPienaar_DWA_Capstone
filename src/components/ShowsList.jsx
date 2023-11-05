// components/ShowsList.js
import React, { useEffect, useState } from 'react';
import Show from './Show';

function ShowsList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {shows.map((show) => (
        <Show key={show.id} show={show} />
      ))}
    </div>
  );
}

export default ShowsList;
