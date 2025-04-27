
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zfyrluaedwqyiosuggoi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeXJsdWFlZHdxeWlvc3VnZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5Mzc1NjcsImV4cCI6MjA1OTUxMzU2N30.Hz8Ps6Se1sdZojPXasKJdjTBO00AHbYlroPiJLStS8s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
