// components/GenreCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import genres from '../assets/genres';

/**
 * GenreCard component displays the names of genres based on their IDs.
 * @component
 * @param {Object} props - The component's props.
 * @param {number[]} props.genreIds - An array of genre IDs.
 * @returns {JSX.Element} - The rendered GenreCard component.
 */
const GenreCard = ({ genreIds }) => {
  /**
   * Maps genre IDs to their corresponding names and joins them into a comma-separated string.
   * @function
   * @param {number} genreId - The ID of a genre.
   * @returns {string} - The name of the genre.
   */
  const mapGenreIdToName = (genreId) => genres[genreId];

  const genreNames = genreIds.map(mapGenreIdToName).join(', ');

  return <p>Genre: {genreNames}</p>;
};

// Prop types for GenreCard component
GenreCard.propTypes = {
  /**
   * An array of genre IDs.
   */
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default GenreCard;
