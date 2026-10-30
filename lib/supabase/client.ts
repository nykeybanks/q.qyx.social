import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "./config"

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

// When Supabase is not connected, use an inert endpoint so the UI renders and requests fail as handled errors instead of crashing.
const url = isSupabaseConfigured ? supabaseUrl : "https://supabase-not-configured.invalid"
const key = isSupabaseConfigured ? supabaseKey : "supabase-not-configured"

export function createClient() {
  // During SSR of client components, return a fresh client so no state leaks between requests.
  if (typeof window === "undefined") {
    return createBrowserClient<Database>(url, key)
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(url, key)
  }

  return browserClient
}
