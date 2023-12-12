// components/FetchPodcastData.jsx
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import PodcastCard from './PodcastCard';
import genres from '../assets/genres';

/**
 * FetchPodcastData component fetches and displays podcasts with filter and search functionality.
 * @component
 * @returns {JSX.Element} - The rendered FetchPodcastData component.
 */
const FetchPodcastData = () => {
  // State variables
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState('titleAsc');
  const [reverseOrder, setReverseOrder] = useState(false);

  /**
   * Applies filters and sorting to the podcast data.
   * @function
   * @param {Array} data - The array of podcast data.
   * @param {string} searchTerm - The search term.
   * @param {string} selectedGenre - The selected genre.
   * @param {string} sortOption - The selected sort option.
   * @param {boolean} reverseOrder - Flag to indicate if the order should be reversed.
   * @returns {Array} - The filtered and sorted array of podcast data.
   */
  const applyFiltersAndSort = (
    data,
    searchTerm,
    selectedGenre,
    sortOption,
    reverseOrder
  ) => {
    let filteredResults = [...data];

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const fuse = new Fuse(filteredResults, {
        keys: ['title', 'description'],
        includeScore: true,
      });
      const searchResults = fuse.search(searchTerm);
      filteredResults = searchResults.map((result) => result.item);
    }

    // Filter by selected genre
    if (selectedGenre !== 'All') {
      const genreId = Object.keys(genres).find(
        (key) => genres[key] === selectedGenre
      );
      filteredResults = filteredResults.filter((result) =>
        result.genres.includes(Number(genreId))
      );
    }

    // Sort based on the selected option
    switch (sortOption) {
      case 'titleAsc':
        filteredResults.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        filteredResults.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateAsc':
        filteredResults.sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
        break;
      case 'dateDesc':
        filteredResults.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        break;
      default:
        break;
    }

    // Reverse order if needed
    if (reverseOrder) {
      filteredResults.reverse();
    }

    return filteredResults;
  };

  /**
   * Fetches podcast data from an API or local storage.
   * @async
   * @function
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setPodcasts(data);
        setFilteredPodcasts(data);
        localStorage.setItem('podcasts', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem('podcasts');
    if (storedData) {
      setPodcasts(JSON.parse(storedData));
      setFilteredPodcasts(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  /**
   * Handles search term changes and updates the filtered podcasts.
   * @effect
   */
  useEffect(() => {
    const fuse = new Fuse(podcasts, {
      keys: ['title', 'description'],
      includeScore: true,
    });

    if (searchTerm.trim() !== '') {
      const searchResults = fuse.search(searchTerm);
      setFilteredPodcasts(searchResults.map((result) => result.item));
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [searchTerm, podcasts]);

  /**
   * Handles the search button click and updates the filtered podcasts.
   * @function
   * @async
   */
  const handleSearch = async () => {
    setLoading(true);

    try {
      if (podcasts.length > 0) {
        const filteredResults = applyFiltersAndSort(
          podcasts,
          searchTerm,
          selectedGenre,
          sortOption,
          reverseOrder
        );
        setFilteredPodcasts(filteredResults);
      } else {
        setFilteredPodcasts([]);
      }
    } catch (error) {
      console.error(`Error during search: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the "Clear Filters" button click and resets filters.
   * @function
   */
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSortOption('titleAsc');
    setReverseOrder(false);
    setFilteredPodcasts(podcasts);
  };

  return (
    <div className="PodcastGridSearch">
      <div>
        {/* Additional comment: Ensure to use "div" instead of "box" */}
        <div className="FilterButtons">
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="All">All Genres</option>
            {Object.values(genres).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="titleAsc">Title A-Z</option>
            <option value="titleDesc">Title Z-A</option>
            <option value="dateAsc">Date Asc</option>
            <option value="dateDesc">Date Desc</option>
          </select>

          {/* Additional comment: Update buttons and elements to use semantic HTML */}
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </div>
      <div className="PodcastGrid">
        {loading ? (
          <p>Loading podcasts...</p>
        ) : (
          filteredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} {...podcast} />
          ))
        )}
      </div>
    </div>
  );
};

// Prop types for FetchPodcastData component
FetchPodcastData.propTypes = {
  /**
   * An array of podcast data.
   */
  podcasts: PropTypes.array.isRequired,
};

export default FetchPodcastData;
