import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import PodcastCard from './PodcastCard';
import genres from '../assets/genres';

const FetchPodcastData = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const genreMap = genres;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState('titleAsc');
  const [reverseOrder, setReverseOrder] = useState(false);

  // Function to apply filters and sorting
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
      const genreId = Object.keys(genreMap).find(
        (key) => genreMap[key] === selectedGenre
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
        <box className="FilterButtons">
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
            {Object.values(genreMap).map((genre) => (
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

          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </box>
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

export default FetchPodcastData;
