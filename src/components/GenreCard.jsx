// components/GenreCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import genres from '../assets/genres';

const GenreCard = ({ genreIds }) => {
  const genreNames = genreIds.map((genreId) => genres[genreId]).join(', ');

  return <p>Genre: {genreNames}</p>;
};

GenreCard.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default GenreCard;
