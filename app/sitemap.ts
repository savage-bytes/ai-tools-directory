import type { MetadataRoute } from "next";
import tools from "@/data/tools.json";
import type { Tool } from "@/types/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const toolList = tools as Tool[];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolList.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes];
}

