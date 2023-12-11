import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PodcastCard from './PodcastCard';

/**
 * FetchSeasons component fetches and displays podcast seasons.
 * @component
 * @returns {JSX.Element} - The rendered FetchSeasons component.
 */
const FetchSeasons = () => {
  return <div></div>;
};

// Prop types for FetchSeasons component
FetchSeasons.propTypes = {
  /**
   * An array of podcast seasons.
   */
  seasons: PropTypes.array.isRequired,
};

export default FetchSeasons;
