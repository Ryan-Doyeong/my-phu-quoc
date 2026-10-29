/**
 * Deployment-ready public Supabase configuration.
 * The publishable key is designed to be exposed to browser clients and is protected by RLS.
 * No Hostinger environment variables are required for the core site.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables. Do not fallback to production keys.");
}

// My Phu Quoc: base production domain is https://myphuquoc.net
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://myphuquoc.net';
