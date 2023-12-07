// SupaAPI.js
import { createClient } from '@supabase/supabase-js';

export default function getSupabase() {
  const SUPABASE_URL = 'https://lrsjharzzhdxvoytjsoo.supabase.co';
  const SUPABASE_API =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyc2poYXJ6emhkeHZveXRqc29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0OTM1MjYsImV4cCI6MjAxNzA2OTUyNn0.W9CZ8mBZRdqUIadhYOF9Nb8Z-PpmG8_IKoPMmmSv0YY';

  const supabase = createClient(SUPABASE_URL, SUPABASE_API);
  return supabase;
}
