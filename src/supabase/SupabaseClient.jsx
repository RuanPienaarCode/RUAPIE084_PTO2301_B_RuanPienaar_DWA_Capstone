// import { createClient } from '@supabase/supabase-js';
// export const VITE_API_URL = 'https://luspkgilingfnlvmjers.supabase.co';
// export const VITE_API_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1c3BrZ2lsaW5nZm5sdm1qZXJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTM5MDIwNywiZXhwIjoyMDE0OTY2MjA3fQ.Q39xLVAbeq5zkcmugmujZu6YchN1TpB4q7imf0hOy9A';

// export const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);

import { createClient } from '@supabase/supabase-js';

export const VITE_API_URL = 'https://luspkgilingfnlvmjers.supabase.co';
export const VITE_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1c3BrZ2lsaW5nZm5sdm1qZXJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTM5MDIwNywiZXhwIjoyMDE0OTY2MjA3fQ.Q39xLVAbeq5zkcmugmujZu6YchN1TpB4q7imf0hOy9A';

export const supabase = createClient(VITE_API_URL, VITE_API_KEY);
