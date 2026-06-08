import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ui/toast-provider";
import Header from "@/components/header.client";

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
      <body>
        <Header />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
