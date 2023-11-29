// components/Show.js
import React from 'react';
import React, { useState } from 'react';
import Item from './RecipeReviewCard';
import { CircularProgress } from '@mui/material';

function Show({ show }) {
  // const [isLoading, setIsLoading] = useState(true);
  // Simulating image loading delay
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return (
    <section className="showCard" key={show.id}>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <img className="showImage" src={show.image} alt={show.title} />
      <div>
        <h3>Seasons and Episodes</h3>
        {Array.isArray(show.seasons) ? show.seasons.map((season) => <Item key={season.season} season={season} />) : <p>No seasons available for this show.</p>}
      </div>
    </section>
  );
}

export default Show;
