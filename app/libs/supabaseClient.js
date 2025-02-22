import { createClient } from "@supabase/supabase-js";
export const getSupabaseClient = () => {
  return createClient(
    "https://txqsdzdcmmozvzhpswrj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cXNkemRjbW1venZ6aHBzd3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDM3OTAsImV4cCI6MjA1NTExOTc5MH0.MYdxektrL6M--F5hjjqg-HROf5cvTLBZ_GySD7lhkyE",
    {}
  );
};