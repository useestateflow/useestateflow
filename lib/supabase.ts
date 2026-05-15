import { createClient } from "@supabase/supabase-js";

// We use placeholders here to prevent the Vercel build from failing if the 
// environment variables haven't been set in the dashboard yet.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tmp.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "tmp";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
