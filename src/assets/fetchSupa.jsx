// src/assets/fetchSupa.js
import getSupabase from '../assets/api';

const supabase = getSupabase();

const fetchPodcastData = async (podcastId) => {
  try {
    const { data, error } = await supabase.from('podcasts').select('*').eq('id', podcastId).single();

    if (error) {
      console.error('Error fetching podcast data:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchPodcastData:', error.message);
    return null;
  }
};

export default fetchPodcastData;
