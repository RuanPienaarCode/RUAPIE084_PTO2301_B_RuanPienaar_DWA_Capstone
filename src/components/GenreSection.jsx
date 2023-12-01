// src/component/GenreSection.js

import React from 'react';
// import ShowCard from './ShowCard';
import SingleCard from './Item';

const GenreSection = ({ genre, shows }) => {
  return (
    <div>
      <h1>{genre}</h1>
      {shows.map((show) => (
        <SingleCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default GenreSection;
