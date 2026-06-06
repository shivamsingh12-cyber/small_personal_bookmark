import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth";
import { listBookmarksForCurrentUser } from "@/server/bookmarks/list-bookmarks";
import { CreateBookmarkForm } from "./create-bookmark-form";
import { EditBookmarkForm } from "./edit-bookmark-form";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const bookmarks = await listBookmarksForCurrentUser();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
              Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#142013]">
              Your bookmarks
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#495747]">
              Review everything saved to your account, including visibility
              status for each bookmark.
            </p>
          </div>
          <div className="rounded-3xl border bg-[#f8faf5] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5b48]">
              Signed in as
            </p>
            <p className="mt-2 text-sm text-[#142013]">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <CreateBookmarkForm />
      </section>

      {bookmarks.length === 0 ? (
        <section className="mt-8 rounded-[2rem] border border-dashed bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
            No bookmarks yet
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#142013]">
            Your library is empty.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#495747]">
            Once bookmarks are created, they will appear here with their title,
            destination URL, and public visibility status.
          </p>
        </section>
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <article
              key={bookmark.id}
              className="flex h-full flex-col rounded-[2rem] border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
                    bookmark.is_public
                      ? "bg-[#e7f4e1] text-[#295f2d]"
                      : "bg-[#f1f4ef] text-[#495747]"
                  }`}
                >
                  {bookmark.is_public ? "Public" : "Private"}
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

              <EditBookmarkForm bookmark={bookmark} />
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
