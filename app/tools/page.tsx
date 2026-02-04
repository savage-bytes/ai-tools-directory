import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "All AI Tools | AI Tools Directory",
  description:
    "Browse and filter the best AI tools across writing, design, video, research, and productivity.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "All AI Tools | AI Tools Directory",
    description:
      "Browse and filter the best AI tools across writing, design, video, research, and productivity.",
    type: "website",
    url: "/tools",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
