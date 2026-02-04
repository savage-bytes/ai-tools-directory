"use client";

import { useDeferredValue, useMemo, useState } from "react";
import tools from "@/data/tools.json";
import { Tool } from "@/types/tools";
import ToolCard from "@/components/ToolCard";

const sortOptions = ["Trending", "Newest", "A-Z"] as const;

export default function ToolsClient() {
  const toolList = tools as Tool[];
  const categories = [
    "All",
    ...Array.from(new Set(toolList.map((tool) => tool.category))),
  ];
  const pricingTiers = [
    "All",
    ...Array.from(new Set(toolList.map((tool) => tool.pricing))),
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pricing, setPricing] = useState("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Trending");

  const deferredSearch = useDeferredValue(search);

  const filteredTools = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    const matches = toolList.filter((tool) => {
      const toolTags = tool.tags ?? [];
      const toolTagline = tool.tagline ?? "";

      const matchesSearch =
        normalizedSearch.length === 0 ||
        tool.name.toLowerCase().includes(normalizedSearch) ||
        tool.description.toLowerCase().includes(normalizedSearch) ||
        toolTagline.toLowerCase().includes(normalizedSearch) ||
        toolTags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesCategory = category === "All" || tool.category === category;
      const matchesPricing = pricing === "All" || tool.pricing === pricing;

      return matchesSearch && matchesCategory && matchesPricing;
    });

    return matches.sort((a, b) => {
      if (sort === "Newest") {
        const bTime = b.addedAt ? new Date(b.addedAt).getTime() : 0;
        const aTime = a.addedAt ? new Date(a.addedAt).getTime() : 0;
        return bTime - aTime;
      }
      if (sort === "A-Z") {
        return a.name.localeCompare(b.name);
      }
      return (b.trendingScore ?? 0) - (a.trendingScore ?? 0);
    });
  }, [toolList, deferredSearch, category, pricing, sort]);

  const hasFilters =
    search.length > 0 || category !== "All" || pricing !== "All";

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPricing("All");
    setSort("Trending");
  };

  return (
    <div className="pt-10">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Curated for fast shortlists
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          All AI tools
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          Search, filter, and compare the most useful AI tools across writing,
          design, video, and productivity.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr,0.8fr,0.8fr]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Search
          </span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tools, tags, or use cases"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            aria-label="Search tools"
          />
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Pricing
          </label>
          <select
            value={pricing}
            onChange={(event) => setPricing(event.target.value)}
            className="mt-2 w-full bg-transparent text-sm text-slate-700 outline-none"
            aria-label="Filter by pricing"
          >
            {pricingTiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Sort by
          </label>
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as (typeof sortOptions)[number])
            }
            className="mt-2 w-full bg-transparent text-sm text-slate-700 outline-none"
            aria-label="Sort tools"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                category === item
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{filteredTools.length} tools</span>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No tools match those filters yet.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try a different search or clear the filters to see everything.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

