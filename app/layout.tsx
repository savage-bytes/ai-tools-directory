import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "AI Tools Directory",
  description:
    "Discover, compare, and save the best AI tools for every workflow.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Tools Directory",
    description:
      "Discover, compare, and save the best AI tools for every workflow.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Directory",
    description:
      "Discover, compare, and save the best AI tools for every workflow.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} min-h-screen text-slate-900`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-sky-200/70 blur-[140px]" />
          <div className="absolute bottom-[-25%] left-[-10%] h-[520px] w-[520px] rounded-full bg-amber-200/70 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
        </div>

        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                AI
              </span>
              <div className="leading-tight">
                <span className="block text-sm font-semibold">
                  AI Tools Directory
                </span>
                <span className="block text-xs text-slate-500">
                  Curated and ranked for builders
                </span>
              </div>
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
              <Link href="/tools" className="hover:text-slate-900">
                Tools
              </Link>
              <Link href="/#categories" className="hover:text-slate-900">
                Categories
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/tools"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
              >
                Browse tools
              </Link>
            </div>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-6xl px-6 pb-24">
          {children}
        </main>

        <footer className="border-t border-slate-200/70 bg-white/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <span>(c) 2026 AI Tools Directory. All rights reserved.</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Built for fast decisions
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
