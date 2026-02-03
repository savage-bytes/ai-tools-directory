import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Tools Directory",
  description: "A curated directory of AI tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <header className="border-b p-4 font-semibold">
          AI Tools Directory
        </header>

        <main className="max-w-6xl mx-auto">{children}</main>

        <footer className="border-t p-4 text-sm text-gray-500">
          © 2026 AI Tools Directory
        </footer>
      </body>
    </html>
  );
}
