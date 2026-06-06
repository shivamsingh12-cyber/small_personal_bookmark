"use client";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({
  error,
  reset,
}: DashboardErrorProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
      <section className="w-full rounded-[2rem] border border-[#e5b2ab] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8b2b20]">
          Dashboard Error
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#142013]">
          We could not load your bookmarks.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#495747]">
          This usually means the session is stale, the database query failed, or
          the bookmarks table is not ready yet.
        </p>
        <div className="mt-6 rounded-2xl border border-[#f1d2cc] bg-[#fff5f3] p-4 text-sm text-[#8b2b20]">
          {error.message}
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-2xl bg-[#142013] px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
