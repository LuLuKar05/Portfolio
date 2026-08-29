import "server-only";

import { fallbackContent } from "@/content/fallback";
import type { PortfolioContent, PortfolioProject } from "@/content/types";

import { isSanityConfigured } from "../env";
import { client } from "./client";
import { portfolioQuery } from "./queries";

type SanityPortfolioResult = {
  settings?: Partial<PortfolioContent> | null;
  projects?: PortfolioProject[] | null;
};

const withFallbackArray = <T>(value: T[] | null | undefined, fallback: T[]) =>
  value && value.length > 0 ? value : fallback;

function mergeContent(result: SanityPortfolioResult): PortfolioContent {
  const settings = result.settings ?? {};

  return {
    ...fallbackContent,
    ...settings,
    stats: withFallbackArray(settings.stats, fallbackContent.stats),
    awards: withFallbackArray(settings.awards, fallbackContent.awards),
    skills: withFallbackArray(settings.skills, fallbackContent.skills),
    timeline: withFallbackArray(settings.timeline, fallbackContent.timeline),
    channels: withFallbackArray(settings.channels, fallbackContent.channels),
    projects: withFallbackArray(result.projects, fallbackContent.projects),
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  if (!isSanityConfigured) {
    return fallbackContent;
  }

  try {
    const result = await client.fetch<SanityPortfolioResult>(
      portfolioQuery,
      {},
      { next: { revalidate: 60, tags: ["portfolio"] } },
    );

    return mergeContent(result);
  } catch (error) {
    console.error("Sanity content fetch failed; using local placeholders.", error);
    return fallbackContent;
  }
}
