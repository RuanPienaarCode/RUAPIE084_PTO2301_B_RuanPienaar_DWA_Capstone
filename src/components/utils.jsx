// src/components/utils.js

export const mapGenreIdToTitle = (id) => {
  const genreMap = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  return genreMap[id] || 'Uncategorized';
};
