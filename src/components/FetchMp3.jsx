// /component/FetchMp3.jsx
import React from 'react';
import AudioPlayer from './AudioPlayer';

function FetchMp3() {
  const episodeData = {
    url: 'https://example.com/audio.mp3', // Replace with the actual episode URL
    // Add other necessary properties for the episode
  };

  return (
    <div>
      {/* Other components or content */}
      <AudioPlayer episode={episodeData} />
      {/* Other components or content */}
    </div>
  );
}

export default FetchMp3;
