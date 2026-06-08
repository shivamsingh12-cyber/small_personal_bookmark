import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
        <Skeleton className="h-8 w-48" />
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </main>
  );
}
