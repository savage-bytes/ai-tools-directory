AI Tools Directory - a premium, fast AI tools listing site built with Next.js App Router.

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

## Environment

Set the public site URL for correct canonical + sitemap URLs:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, it falls back to `http://localhost:3000`.

## Data Model

Tools live in `data/tools.json`. Required fields:
- `name`, `slug`, `category`, `pricing`, `description`, `website`

Optional enrichment fields (supported by UI but not required):
- `logo`, `tagline`, `tags`, `useCases`, `rating`, `reviewCount`, `addedAt`, `trendingScore`, `featured`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
