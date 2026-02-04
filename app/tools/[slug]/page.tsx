import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import tools from "@/data/tools.json";
import { Tool } from "@/types/tools";
import ToolCard from "@/components/ToolCard";

type Props = {
  params: Promise<{ slug: string }>;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const toolList = tools as Tool[];
  const { slug } = await params;
  const tool = toolList.find((item) => item.slug === slug);

  if (!tool) {
    return { title: "Tool not found" };
  }

  return {
    title: `${tool.name} | AI Tools Directory`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} | AI Tools Directory`,
      description: tool.description,
      type: "article",
      url: `/tools/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | AI Tools Directory`,
      description: tool.description,
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const toolList = tools as Tool[];
  const tool = toolList.find((item) => item.slug === slug);

  if (!tool) {
    notFound();
  }

  const tagline = tool.tagline ?? tool.description;
  const tags = tool.tags ?? [];
  const useCases = tool.useCases ?? [];
  const rating = tool.rating ?? 0;
  const reviewCount = tool.reviewCount ?? 0;
  const addedAt = tool.addedAt;
  const trendingScore = tool.trendingScore ?? 0;

  const relatedTools = toolList
    .filter((item) => item.category === tool.category && item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="pt-10">
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
      >
        <span aria-hidden>{"<-"}</span>
        <span>Back to tools</span>
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr,0.7fr]">
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/5 ring-1 ring-slate-200/80">
                {tool.logo ? (
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={48}
                    height={48}
                    sizes="48px"
                    className="h-12 w-12"
                  />
                ) : (
                  <span className="text-2xl font-semibold text-slate-700">
                    {tool.name[0]}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">
                  {tool.name}
                </h1>
                <p className="text-sm text-slate-500">{tagline}</p>
              </div>
            </div>
            <span className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              {tool.pricing}
            </span>
          </div>

          <p className="mt-6 text-base text-slate-600">{tool.description}</p>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Best for
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-sm text-slate-600"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Tags
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200/80 bg-white px-3 py-1 text-sm text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick facts
            </h2>
            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <dt>Category</dt>
                <dd className="font-medium text-slate-900">{tool.category}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Rating</dt>
                <dd className="font-medium text-slate-900">
                  {rating.toFixed(1)} ({reviewCount.toLocaleString()})
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Added</dt>
                <dd className="font-medium text-slate-900">
                  {addedAt ? formatDate(addedAt) : "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Trending</dt>
                <dd className="font-medium text-slate-900">
                  {trendingScore}/100
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Actions
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                Visit website {"->"}
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:border-slate-400"
              >
                Save to collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {relatedTools.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              More in {tool.category}
            </h2>
            <Link href="/tools" className="text-sm text-slate-500">
              Explore all tools
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((related) => (
              <ToolCard key={related.slug} tool={related} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
