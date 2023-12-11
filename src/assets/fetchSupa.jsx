// src/assets/fetchSupa.js
import getSupabase from '../assets/SupaAPI';

/**
 * Supabase client instance.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabase = getSupabase();

/**
 * Fetches podcast data from Supabase based on the provided podcast ID.
 *
 * @param {string} podcastId - The ID of the podcast to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the podcast data or null if an error occurs.
 * @throws {Error} Throws an error if there is an issue during the fetch process.
 */
const fetchPodcastData = async (podcastId) => {
  try {
    const { data, error } = await supabase
      .from('podcasts')
      .select('*')
      .eq('id', podcastId)
      .single();

    if (error) {
      console.error('Error fetching podcast data:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchPodcastData:', error.message);
    throw new Error('Unexpected error during data fetch.');
  }
};

export default fetchPodcastData;
