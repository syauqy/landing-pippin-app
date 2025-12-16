import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing from environment variables."
  );
}

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     // Recommended settings for Capacitor/React Native
//     storage: typeof window !== "undefined" ? window.localStorage : undefined, // Use localStorage if available
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false, // We are handling it manually now
//   },
// });

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
