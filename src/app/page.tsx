import type { Metadata } from "next";

import { PortfolioExperience } from "@/components/portfolio-experience";
import { getPortfolioContent } from "@/sanity/lib/fetch-site";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPortfolioContent();

  return {
    title: { absolute: content.seoTitle },
    description: content.seoDescription,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: "/",
    },
    twitter: {
      title: content.seoTitle,
      description: content.seoDescription,
    },
  };
}

export default async function Home() {
  const content = await getPortfolioContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.name,
    url: "https://myomyatthiha.com",
    jobTitle: "Full-stack Engineer",
    description: content.seoDescription,
    sameAs: content.channels
      .map((channel) => channel.href)
      .filter((href) => href.startsWith("https://")),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioExperience content={content} />
    </>
  );
}
