// pages/FavouritePage
import React from 'react';
import GetFavourites from '../components/GetFavourites';

const FavouritePage = () => {
  const favoriteEpisodes =
    JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

  return (
    <div id="favourite-page">
      <GetFavourites favoriteEpisodes={favoriteEpisodes} />
    </div>
  );
};

export default FavouritePage;
