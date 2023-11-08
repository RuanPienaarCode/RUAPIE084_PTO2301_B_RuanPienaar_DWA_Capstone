// components/Item.js
import React from 'react';

function Item({ season }) {
  return (
    <div>
      <h4>
        Season {season.season}: {season.title}
      </h4>
      <img className='showImage' src={season.image} alt={season.title} />
      <ul>
        {season.episodes.map((episode) => (
          <li key={episode.title}>
            <h5>{episode.title}</h5>
            <p>{episode.description}</p>
            {/* You can add an audio player for the episode here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Item;
