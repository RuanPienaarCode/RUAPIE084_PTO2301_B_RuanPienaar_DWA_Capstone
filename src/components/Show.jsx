// components/Show.js
import React from 'react';
import Item from './Item';

function Show({ show }) {
  return (
    <div key={show.id}>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <img src={show.image} alt={show.title} />
      <div>
        <h3>Seasons and Episodes</h3>
        {/* {show.seasons.map((season) => (
          <Item key={season.season} season={season} />
        ))} */}
      </div>
    </div>
  );
}

export default Show;
