AI Tools Directory - a premium, fast AI tools listing site built with Next.js App Router.

![Uploading image.png…]()


## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/layout.tsx`: global layout + global SEO defaults (metadataBase, OpenGraph, Twitter).
- `app/page.tsx`: marketing home page.
- `app/tools/page.tsx`: server page exporting SEO metadata for the tools list.
- `app/tools/ToolsClient.tsx`: client-only search/filter/sort UI (kept separate so the route can export metadata).
- `app/tools/[slug]/page.tsx`: tool detail page + `generateMetadata()` per tool.
- `app/sitemap.ts`: sitemap generated from `data/tools.json`.
- `app/robots.ts`: robots.txt + sitemap URL.
- `data/tools.json`: the source of truth for tools.
- `components/ToolCard.tsx`: reusable tool card.

## SEO Approach (Per Page)

This project uses Next.js App Router metadata APIs:

- Global defaults in `app/layout.tsx`:
  - `metadataBase` (set via `NEXT_PUBLIC_SITE_URL`)
  - OpenGraph/Twitter defaults
- Home page metadata in `app/page.tsx`.
- Tools listing metadata in `app/tools/page.tsx`.
- Tool detail metadata in `app/tools/[slug]/page.tsx` via `generateMetadata()`:
  - unique title/description
  - canonical URL: `/tools/{slug}`
  - OpenGraph/Twitter values per tool

Additionally:
- `app/sitemap.ts` generates `/sitemap.xml` from `data/tools.json`.
- `app/robots.ts` exposes `/robots.txt` pointing to the sitemap.

If unset, it falls back to `http://localhost:3000`.

## Data Model

Tools live in `data/tools.json`. Required fields:
- `name`, `slug`, `category`, `pricing`, `description`, `website`

Optional enrichment fields (supported by UI but not required):
- `logo`, `tagline`, `tags`, `useCases`, `rating`, `reviewCount`, `addedAt`, `trendingScore`, `featured`




