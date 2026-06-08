import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect root to the public search page so visitors land on discovery first
  redirect("/search");
}
