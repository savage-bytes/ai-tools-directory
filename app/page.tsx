import Link from "next/link";
import tools from "@/data/tools.json";
import { Tool } from "@/types/tools";
import ToolCard from "@/components/ToolCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory | Find the Best AI Tools",
  description:
    "Discover and compare the best AI tools for writing, design, video, research, and productivity.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Tools Directory | Find the Best AI Tools",
    description:
      "Discover and compare the best AI tools for writing, design, video, research, and productivity.",
    type: "website",
    url: "/",
  },
};

export default function Home() {
  const toolList = tools as Tool[];
  const categories = Array.from(new Set(toolList.map((tool) => tool.category)));
  const trendingTools = [...toolList]
    .sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0))
    .slice(0, 3);
  const newestTools = [...toolList]
    .sort((a, b) => {
      const bTime = b.addedAt ? new Date(b.addedAt).getTime() : 0;
      const aTime = a.addedAt ? new Date(a.addedAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 3);
  const averageRating =
    toolList.length > 0
      ? toolList.reduce((sum, tool) => sum + (tool.rating ?? 0), 0) /
        toolList.length
      : 0;

  return (
    <div className="pt-10">
      <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Updated weekly for modern teams
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            The fastest way to find the right AI tool for every workflow.
          </h1>
          <p className="text-lg text-slate-600">
            Search, compare, and save the best AI tools for writing, design,
            video, and productivity. Built for teams that move fast.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Browse tools
            </Link>
            <Link
              href="/tools"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:border-slate-400"
            >
              Explore trending
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Tools live
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {toolList.length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Categories
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {categories.length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Avg rating
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Trending now
            </p>
            <Link href="/tools" className="text-xs text-slate-500">
              View all
            </Link>
          </div>
          <div className="grid gap-4">
            {trendingTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            Browse by category
          </h2>
          <Link href="/tools" className="text-sm text-slate-500">
            Explore all tools
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm text-slate-600"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            Newly added
          </h2>
          <Link href="/tools" className="text-sm text-slate-500">
            See everything
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {newestTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} variant="compact" />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Built for fast decisions
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Every tool includes clear pricing, use cases, and ratings so your
            team can move faster.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Trusted comparisons
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Compare tools across the same workflow, stack, and budget in one
            view.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Always current
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            We track new launches and feature updates so your shortlist stays
            sharp.
          </p>
        </div>
      </section>

      <div className="mt-16 rounded-3xl border border-slate-200/70 bg-white/80 p-8">
        <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Build your shortlist faster
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Browse tools by category, scan use cases, and open the best match
              in one click.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
