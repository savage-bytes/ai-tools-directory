import Image from "next/image";
import Link from "next/link";
import { Tool } from "@/types/tools";

type ToolCardProps = {
  tool: Tool;
  variant?: "full" | "compact";
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export default function ToolCard({ tool, variant = "full" }: ToolCardProps) {
  const tagLimit = variant === "compact" ? 2 : 3;
  const tagline = tool.tagline ?? tool.description;
  const rating = tool.rating ?? 0;
  const reviewCount = tool.reviewCount ?? 0;
  const tags = tool.tags ?? [];

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 ring-1 ring-slate-200/80">
            {tool.logo ? (
              <Image
                src={tool.logo}
                alt={tool.name}
                width={32}
                height={32}
                sizes="32px"
                className="h-8 w-8"
              />
            ) : (
              <span className="text-sm font-semibold text-slate-700">
                {tool.name[0]}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {tool.name}
            </h3>
            <p className="text-sm text-slate-500">{tagline}</p>
          </div>
        </div>
        <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          {tool.pricing}
        </span>
      </div>

      <p
        className={`mt-4 text-sm text-slate-600 ${
          variant === "compact" ? "line-clamp-2" : "line-clamp-3"
        }`}
      >
        {tool.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>{tool.category}</span>
        <span aria-hidden>*</span>
        <span>
          {rating.toFixed(1)} rating ({formatNumber(reviewCount)})
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.slice(0, tagLimit).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs text-slate-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 text-xs font-medium text-slate-500 transition group-hover:text-slate-900">
        View details {"->"}
      </div>
    </Link>
  );
}
