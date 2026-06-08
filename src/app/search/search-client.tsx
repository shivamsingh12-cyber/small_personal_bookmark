"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchClient() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function doSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/public/profiles?query=${encodeURIComponent(q)}`);
      const json = await res.json();
      setResults(json.data ?? []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={doSearch} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search handles (e.g. shivam)"
          className="flex-1 rounded-md border px-3 py-2"
        />
        <button
          onClick={doSearch}
          type="submit"
          className="rounded-md bg-[#142013] px-4 py-2 text-white"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-4">
        {results.length === 0 ? (
          <p className="text-sm text-[#495747]">No handles found</p>
        ) : (
          <ul className="space-y-2">
            {results.map((h) => (
              <li key={h}>
                <Link href={`/${h}`} className="text-[#142013] underline">
                  {h}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
