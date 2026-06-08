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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function queryWithClient(url, key, label) {
  if (!url || !key) {
    console.log(`\n[${label}] missing url or key`);
    return;
  }

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const users = await client.from('auth.users').select('id, email').limit(5);
    const bookmarks = await client.from('bookmarks').select('id, user_id, title, is_public').order('created_at', { ascending: false }).limit(5);

    console.log(`\n[${label}] url: ${url}`);
    console.log(`[${label}] users result:`, users.error ? users.error.message : `${users.data.length} rows`);
    if (users.data) console.table(users.data);
    console.log(`[${label}] bookmarks result:`, bookmarks.error ? bookmarks.error.message : `${bookmarks.data.length} rows`);
    if (bookmarks.data) console.table(bookmarks.data);
  } catch (err) {
    console.error(`[${label}] unexpected error`, err.message || err);
  }
}

async function main() {
  const env = parseDotEnv(path.resolve(__dirname, '..', '.env'));

  const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  console.log('Checking Supabase clients...');

  await queryWithClient(url, service, 'service-role');
  await queryWithClient(url, anon, 'anon');
}

main();
