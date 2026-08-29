export type ProjectCategory = "AI" | "Web3" | "Platform";

export type ProjectBlock = {
  heading: string;
  body: string;
};

export type PortfolioProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  filterCategory: ProjectCategory;
  year: string;
  summary: string;
  meta: string;
  award?: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  blocks: ProjectBlock[];
};

export type PortfolioStat = {
  value: string;
  label: string;
};

export type PortfolioAward = {
  rank: string;
  event: string;
  note: string;
  year: string;
  project: string;
};

export type SkillGroup = {
  name: string;
  code: string;
  items: string[];
};

export type TimelineEntry = {
  year: string;
  role: string;
  organisation: string;
  note: string;
};

export type SocialChannel = {
  label: string;
  value: string;
  href: string;
};

export type PortfolioContent = {
  name: string;
  portfolioLabel: string;
  availability: string;
  heroLead: string;
  heroMuted: string;
  stats: PortfolioStat[];
  projects: PortfolioProject[];
  awards: PortfolioAward[];
  skills: SkillGroup[];
  timeline: TimelineEntry[];
  timelineNote: string;
  aboutTitle: string;
  aboutPrimary: string;
  aboutSecondary: string;
  portraitUrl?: string;
  portraitAlt: string;
  contactTitle: string;
  contactCopy: string;
  contactEmail: string;
  channels: SocialChannel[];
  resumeUrl?: string;
  seoTitle: string;
  seoDescription: string;
  backgroundColor: string;
  inkColor: string;
  accentColor: string;
  showPlanets: boolean;
  orbitSpeed: number;
  starDensity: number;
};
