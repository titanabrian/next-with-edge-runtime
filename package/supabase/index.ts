import { SupabaseClient, createClient } from "@supabase/supabase-js";

export function init(): SupabaseClient {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!)
}
