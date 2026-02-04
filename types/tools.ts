export type PricingTier = "Freemium" | "Paid";

export type Tool = {
  // Core identity
  name: string;
  slug: string;
  category: string;
  pricing: PricingTier;
  website: string;

  // Presentation
  description: string;
  logo?: string;
  tagline: string;

  // Discovery + social proof
  tags: string[];
  useCases: string[];
  rating: number; // 0-5
  reviewCount: number;

  // Curation / ranking
  featured?: boolean;
  addedAt: string; // ISO date string (YYYY-MM-DD)
  trendingScore: number; // 0-100
};
