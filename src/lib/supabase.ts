import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://oyzjvpklvtvdvfuoqbzu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95emp2cGtsdnR2ZHZmdW9xYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNzgyNDYsImV4cCI6MjA2Njk1NDI0Nn0.UNKp31veAn_bmJxANmi-VYCugHwGVq2h9U905bjw4ic';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };