const fs = require('fs');
const path = require('path');
const fetch = globalThis.fetch || require('node-fetch');

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

async function main() {
  const env = parseDotEnv(path.resolve(__dirname, '..', '.env'));
  const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  const id = process.argv[2] || process.env.BOOKMARK_ID;
  const base = `${url.replace(/\/$/, '')}/rest/v1/bookmarks`;
  const restUrl = id ? `${base}?id=eq.${id}&select=id,user_id,title,is_public` : `${base}?select=id,user_id,title,is_public`;

  try {
    const res = await fetch(restUrl, {
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
      },
    });

    console.log('status', res.status);
    const text = await res.text();
    try {
      console.log('body', JSON.parse(text));
    } catch (e) {
      console.log('body (raw)', text);
    }
  } catch (err) {
    console.error('request failed', err.message || err);
  }
}

main();
