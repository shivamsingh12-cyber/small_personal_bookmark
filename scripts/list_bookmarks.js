const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function parseDotEnv(envPath) {
  if (!fs.existsSync(envPath)) return {};
  const contents = fs.readFileSync(envPath, 'utf8');
  const lines = contents.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1);
    // remove optional quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function main() {
  const env = parseDotEnv(path.resolve(__dirname, '..', '.env'));

  const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env or environment.');
    process.exit(1);
  }

  const client = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const { data, error } = await client
      .from('bookmarks')
      .select('id, user_id, title, url, is_public, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error querying bookmarks:', error);
      process.exit(1);
    }

    console.log('Bookmarks:');
    console.table(
      (data || []).map((r) => ({
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        url: r.url,
        is_public: r.is_public,
        created_at: r.created_at,
      })),
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

main();
