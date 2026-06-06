import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark App",
  description: "Production-ready bookmark manager scaffold",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
