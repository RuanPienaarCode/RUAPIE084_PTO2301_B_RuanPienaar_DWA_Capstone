//App.jsx
import React, { useEffect, useState } from 'react';
import ShowsList from './components/ShowsList';
import './App.css';
import './index.css';

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Podcast Shows Test</h1>
      <ShowsList shows={shows} setSelectedShow={setSelectedShow} />
      {selectedShow && <Show show={selectedShow} />}
    </div>
  );
}

export default App;
