import { createClient } from '@supabase/supabase-js';
import getSupabase from '../assets/SupaAPI';

/**
 * Function to fetch user data from Supabase authentication.
 * @async
 * @function
 * @param {Function} setUser - Function to update user state.
 * @returns {Promise<void>} - A promise that resolves after updating the user state.
 */
export default async function getUserData(setUser) {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('getUserData: Error fetching user data:', error);
      setUser(null); // Handle non-logged-in state explicitly
      return;
    }

    const user = data?.user || null;
    setUser(user);
    console.log('getUserData: User data:', user);
  } catch (error) {
    console.error('getUserData: Unexpected error:', error);
    setUser(null); // Handle unexpected errors
  }
}
