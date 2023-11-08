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

// <div>
//   <h1>Podcast Shows</h1>
//   <ul>
//     {shows.map((show) => (
//       <li key={show.id} onClick={() => setSelectedShow(show)}>
//         {show.title}
//       </li>
//     ))}
//   </ul>
//   {selectedShow && <Show show={selectedShow} />}
//   {selectedShow && (
//     <div>
//       <h2>Seasons and Episodes</h2>
//       {selectedShow.seasons.map((season) => (
//         <Item key={season.title} item={season} />
//       ))}
//     </div>
//   )}
// </div>

// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href='https://vitejs.dev' target='_blank'>
//           <img src={viteLogo} className='logo' alt='Vite logo' />
//         </a>
//         <a href='https://react.dev' target='_blank'>
//           <img src={reactLogo} className='logo react' alt='React logo' />
//         </a>
//       </div>
//       <h1>My App</h1>
//       <div className='card'>
//         <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
//     </>
//   );
// }

// export default App;
