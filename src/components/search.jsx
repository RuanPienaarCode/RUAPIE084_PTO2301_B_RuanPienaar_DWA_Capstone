/**
 * Renders a search component with search functionality and filter options.
 *
 * @param {object} props - The properties passed to the Search component.
 * @param {array} props.allPodcastData - An array of podcast data.
 * @param {function} props.setSelectedPodcast - A function to set the selected podcast.
 * @param {boolean} props.loading - A boolean indicating whether the component is loading.
 * @param {function} props.setLoading - A function to set the loading state.
 * @return {JSX.Element} The rendered Search component.
 */

import Fuse from 'fuse.js';
import { useState, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import TextField from '@mui/material/TextField';
import { Card, Box, Button, Typography, Grid, Chip, Collapse, Select, MenuItem, Paper } from '@mui/material';

import genres from '../assets/genres';

import PropTypes from 'prop-types';

export default function Search(props) {
  const { allPodcastData, setSelectedPodcast, loading, setLoading } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(true);

  const [sortOption, setSortOption] = useState('');

  const handleToggleSearchBox = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen);
  };

  const fuse = useMemo(
    () =>
      new Fuse(allPodcastData || [], {
        keys: ['title', 'description'],
        includeScore: true,
      }),
    [allPodcastData]
  );

  const handleSort = (option) => {
    setSortOption(option);

    // Handle sorting based on the selected option
    const sortedResults = [...results]; // Create a copy to avoid mutating the original array

    switch (option) {
      case 'titleAsc':
        sortedResults.sort((a, b) => a.item.title.localeCompare(b.item.title));
        break;
      case 'titleDesc':
        sortedResults.sort((a, b) => b.item.title.localeCompare(a.item.title));
        break;
      case 'dateAsc':
        sortedResults.sort((a, b) => new Date(a.item.updated) - new Date(b.item.updated));
        break;
      case 'dateDesc':
        sortedResults.sort((a, b) => new Date(b.item.updated) - new Date(a.item.updated));
        break;
      default:
        break;
    }

    setResults(sortedResults);
  };

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);

      try {
        if (allPodcastData && searchTerm.trim() !== '') {
          const filteredResults = fuse.search(searchTerm);
          setResults(filteredResults);
          console.log(`Search results:`, filteredResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error(`Error during search: ${error.message}`);
        setError('Error during search. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [allPodcastData, searchTerm, fuse, setLoading]);

  const fetchPodcastData = (id) => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedPodcast(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching podcast data:', error);
        setLoading(false);
      });
  };

  const handleSearchButtonClick = () => {
    // Use fuse to perform the search
    if (allPodcastData) {
      const filteredResults = fuse.search(searchTerm);
      setResults(filteredResults);
      console.log(filteredResults);
    }
  };

  const PodcastCard = ({ item }) => {
    return (
      <Card
        key={item.id}
        variant="outlined"
        onClick={() => {
          fetchPodcastData(item.id);
        }}
        sx={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '25px' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0px',
          }}
        >
          <Box></Box>
          <img src={item.image} alt={item.title} width="100%" />
          <Paper sx={{ padding: '15px' }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2">{item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}</Typography>
            <Chip label={`Seasons: ${item.seasons}`} className="seasons" color="primary" />

            <Chip label={`Genre: ${genres[item.genres]}`} className="genre" color="default" />
            <p>Last Upload:</p>
            <Chip
              variant="filled"
              color="secondary"
              label={new Date(item.updated).toLocaleString([], {
                hour: 'numeric',
                hour12: true,
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              className="seasons"
            />
          </Paper>
        </Box>
      </Card>
    );
  };

  const cardGrid = (cardsArray) => (
    <Grid container spacing={3}>
      {cardsArray.map((card) => (
        <Grid item key={card.key} xs={12} sm={6} md={4} lg={3}>
          {card}
        </Grid>
      ))}
    </Grid>
  );

  const cardsGrid = cardGrid(results.map((result) => <PodcastCard key={result.item.id} item={result.item} />));

  const allCardsGrid = cardGrid(allPodcastData.map((item) => <PodcastCard key={item.id} item={item} />));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        gap: '10px',
        width: '100%',
        margin: 'auto',
        alignItems: 'center',
        padding: '0px',
      }}
    >
      <Box></Box>
      <form id="search-form" noValidate autoComplete="off">
        <TextField
          sx={{
            width: '100%',
            mb: 5,
            backgroundColor: '#f5f5f5',
          }}
          label="Search"
          variant="filled"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setSearchTerm('')}>
                <DeleteSweepIcon />
              </IconButton>
            ),
          }}
        />
      </form>

      <Collapse in={isSearchBoxOpen} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Sort by:
          </Typography>
          <Select value={sortOption} onChange={(e) => handleSort(e.target.value)} variant="standard" sx={{ width: '100px', backgroundColor: '#f5f5f5' }}>
            <MenuItem value="titleAsc">A-Z</MenuItem>
            <MenuItem value="titleDesc">Z-A</MenuItem>
          </Select>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            variant="standard"
            sx={{ width: '300px', ml: 3, backgroundColor: '#f5f5f5' }}
          >
            <MenuItem value="">All Genres</MenuItem>
            {Object.entries(genres).map(([id, name]) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Button sx={{ m: 3 }} variant="contained" onClick={handleSearchButtonClick}>
            Search
          </Button>
        </Box>

        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : searchTerm.trim() !== '' ? cardsGrid : allCardsGrid}
      </Collapse>
    </Box>
  );
}
