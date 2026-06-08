import SearchClient from "./search-client";

export default function SearchPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-2xl font-semibold text-[#142013]">Search public profiles</h1>
        <p className="mt-2 text-sm text-[#495747]">Find users by handle and view their public bookmarks.</p>

        <div className="mt-6">
          <SearchClient />
        </div>
      </section>
    </main>
  );
}
