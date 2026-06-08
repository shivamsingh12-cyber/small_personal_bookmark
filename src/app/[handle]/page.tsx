import { listPublicBookmarksByHandle } from "@/server/bookmarks/list-bookmarks";
import { EmptyState } from "@/components/ui/empty-state";
import { notFound } from "next/navigation";

type Props = {
  params: { handle: string };
};

export default async function ProfilePage({ params }: Props) {
  const { handle } = await params;

  if (!handle) {
    notFound();
  }

  const bookmarks = await listPublicBookmarksByHandle(handle as string);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
              Profile
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#142013]">
              @{handle}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#495747]">
              Public bookmarks saved by this user.
            </p>
          </div>
        </div>
      </section>

          {bookmarks.length === 0 ? (
            <EmptyState
              title="No public bookmarks"
              description="This user hasn't shared any bookmarks yet."
            />
          ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <article
              key={bookmark.id}
              className="flex h-full flex-col rounded-[2rem] border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] bg-[#e7f4e1] text-[#295f2d]`}>
                  Public
                </span>
              </div>

              <h2 className="mt-5 line-clamp-2 text-xl font-semibold tracking-tight text-[#142013]">
                {bookmark.title}
              </h2>

              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block break-all text-sm leading-6 text-[#3c6940] underline decoration-[#b8cfb3] underline-offset-4"
              >
                {bookmark.url}
              </a>

              <div className="mt-auto pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#697565]">
                  Saved {new Date(bookmark.created_at).toLocaleDateString()}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
