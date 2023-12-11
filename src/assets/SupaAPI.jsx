import { createClient } from '@supabase/supabase-js';

/**
 * Returns a Supabase client instance.
 *
 * @function
 * @example
 * // Example usage of getSupabase function
 * const supabase = getSupabase();
 * @returns {object} Supabase client instance.
 */
export default function getSupabase() {
  // Replace these with your actual Supabase URL and API key
  const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
  const SUPABASE_API = 'your-supabase-api-key';

  // Create and return the Supabase client instance
  const supabase = createClient(SUPABASE_URL, SUPABASE_API);
  return supabase;
}

// Additional comments:
// - Ensure to replace the placeholder values for SUPABASE_URL and SUPABASE_API with your actual Supabase URL and API key.
// - Consider using environment variables to securely store your Supabase API key.
// - Provide clear instructions or documentation on how to use this function in your project.
