const SUPABASE_URL = "https://mzmhbeqvdlaokzjalmxa.supabase.co";

const SUPABASE_KEY = "sb_publishable_aRH1j7nIKa8dnL5tKR1dHQ_0qqH2a6f";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
console.log("Supabase connected!", supabase);
