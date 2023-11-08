// components/Show.js
import React from 'react';
import Item from './Item';

function Show({ show }) {
  return (
    <div className='showCard' key={show.id}>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <img className='showImage' src={show.image} alt={show.title} />
      <div>
        <h3>Seasons and Episodes</h3>
        {Array.isArray(show.seasons) ? show.seasons.map((season) => <Item key={season.season} season={season} />) : <p>No seasons available for this show.</p>}
      </div>
    </div>
  );
}

export default Show;
