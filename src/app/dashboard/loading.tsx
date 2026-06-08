
function BookmarkCardSkeleton() {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="h-4 w-24 animate-pulse rounded bg-[#e6ece0]" />
      <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-[#dfe8d7]" />
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#eef4e8]" />
      <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-[#eef4e8]" />
      <div className="mt-6 h-8 w-28 animate-pulse rounded-full bg-[#e6ece0]" />
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
        <div className="h-4 w-28 animate-pulse rounded bg-[#e6ece0]" />
        <div className="mt-5 h-10 w-72 animate-pulse rounded bg-[#dfe8d7]" />
        <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-[#eef4e8]" />
        <div className="mt-2 h-5 w-3/4 max-w-xl animate-pulse rounded bg-[#eef4e8]" />
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <BookmarkCardSkeleton />
        <BookmarkCardSkeleton />
        <BookmarkCardSkeleton />
      </section>
    </main>
  );
}
