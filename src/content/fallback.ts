import type { PortfolioContent } from "./types";

export const fallbackContent: PortfolioContent = {
  name: "Myo Myat Thiha",
  portfolioLabel: "Portfolio / 2026",
  availability: "Open to offers",
  heroLead: "1st of 700 at UCL AgentVerse.",
  heroMuted:
    "Then I shipped it — multi-agent AI, Web3 protocols and platforms that run in production.",
  stats: [
    { value: "1st / 700", label: "UCL AgentVerse" },
    { value: "4", label: "Hackathon prizes" },
    { value: "6", label: "Systems shipped" },
  ],
  projects: [
    {
      slug: "afterverse",
      number: "01",
      title: "Afterverse",
      category: "Multi-agent AI",
      filterCategory: "AI",
      year: "2025",
      summary: "Multi-agent system automating post-death legal workflows.",
      meta: "1st prize · 2025",
      award: "1st prize — 700 entrants",
      tags: ["LangGraph", "Gemini", "FastAPI", "Python", "Multi-Agent"],
      githubUrl: "https://github.com/LuLuKar05/Afterversed",
      blocks: [
        {
          heading: "The problem",
          body: "Settling an estate means chasing dozens of institutions with near-identical paperwork, each with its own format, timeline and failure mode. Families do this manually, in grief, for months.",
        },
        {
          heading: "What I built",
          body: "A LangGraph orchestration of specialised agents — document intake, entity extraction, institution routing, correspondence drafting — coordinated by a supervisor that decides which agent runs next and escalates to a human when confidence drops.",
        },
        {
          heading: "Outcome",
          body: "1st place at UCL AgentVerse against 700 participants. The judges pushed on reliability, so the demo ran the full pipeline live on a synthetic estate rather than a recording.",
        },
      ],
    },
    {
      slug: "veriloan",
      number: "02",
      title: "VeriLoan",
      category: "Web3 + DeFi",
      filterCategory: "Web3",
      year: "2025",
      summary: "Under-collateralised lending via a cryptographic identity bridge.",
      meta: "Dual prize · 2025",
      award: "Dual prize winner",
      tags: ["Solidity", "Ethereum", "Concordium", "DeFi", "Smart Contracts"],
      githubUrl: "https://github.com/LuLuKar05/VeriLoan",
      blocks: [
        {
          heading: "The problem",
          body: "DeFi lending demands over-collateralisation because borrowers are anonymous. Real creditworthiness exists — it just lives on chains that do not talk to each other.",
        },
        {
          heading: "What I built",
          body: "A lending protocol that bridges verified identity from Concordium into Ethereum smart contracts, letting a proven identity unlock under-collateralised loans without revealing the underlying personal data.",
        },
        {
          heading: "Outcome",
          body: "Took two prizes at the same hackathon — protocol design and cross-chain integration. Contracts are on the repo with the identity-bridge flow documented.",
        },
      ],
    },
    {
      slug: "drift-land",
      number: "03",
      title: "Drift Land 154",
      category: "Platform",
      filterCategory: "Platform",
      year: "2026",
      summary: "Enterprise event & ticketing platform with live QR validation.",
      meta: "Freelance · 2026",
      tags: ["Next.js 16", "Node.js", "MongoDB", "QR System", "Real-time"],
      githubUrl: "https://github.com/LuLuKar05",
      blocks: [
        {
          heading: "The problem",
          body: "A multi-vendor event needed ticketing, door validation and analytics that worked on venue wifi — meaning intermittent connectivity and hundreds of scans in tight bursts.",
        },
        {
          heading: "What I built",
          body: "A Next.js platform with QR issuance and validation, vendor dashboards, attendee analytics and an automated comms pipeline. Scanning tolerates flaky networks with idempotent validation so a retry never double-admits or double-rejects.",
        },
        {
          heading: "Outcome",
          body: "Shipped and used in production. This is the project I point at when someone asks whether I can run something real, not just win a weekend.",
        },
      ],
    },
    {
      slug: "nutrishield",
      number: "04",
      title: "NutriShield",
      category: "AI + Privacy",
      filterCategory: "AI",
      year: "2026",
      summary: "Zero-knowledge nutrition assistant with threat-adapted planning.",
      meta: "Hackathon · 2026",
      tags: ["FastAPI", "AI Agents", "Zero-Knowledge", "Privacy", "Python"],
      githubUrl: "https://github.com/LuLuKar05/biodefense-nutrition",
      blocks: [
        {
          heading: "The problem",
          body: "Health guidance needs personal data, and personal health data is exactly what people should not hand over. The usual answer is a privacy policy; a better answer is not holding the data at all.",
        },
        {
          heading: "What I built",
          body: "A biodefense nutrition assistant using zero-knowledge proofs so dietary constraints can be verified without being disclosed, with multi-agent orchestration producing real-time, threat-adapted meal plans.",
        },
        {
          heading: "Outcome",
          body: "Working prototype with the ZK verification path implemented end to end rather than mocked.",
        },
      ],
    },
    {
      slug: "starmap",
      number: "05",
      title: "Project Galaxy",
      category: "Interactive 3D",
      filterCategory: "Platform",
      year: "2026",
      summary: "This portfolio: a WebGL galaxy with GPU-compressed planet skins.",
      meta: "Personal · 2026",
      tags: ["React Three Fiber", "KTX2", "Prisma", "PostgreSQL", "Next.js 16"],
      githubUrl: "https://github.com/LuLuKar05/Project0",
      blocks: [
        {
          heading: "The problem",
          body: "A portfolio that renders six textured planets in WebGL will happily download 80MB and stall on a mid-range laptop. Interesting is worthless if it does not load.",
        },
        {
          heading: "What I built",
          body: "Tiered lazy loading: KTX2 GPU-compressed textures, overview planets load diffuse only, and the full PBR set with clouds and displacement loads for the selected planet alone. A loading gate waits on actual texture readiness rather than a timer.",
        },
        {
          heading: "Outcome",
          body: "Server-first data via Prisma with cold-start retry, ISR caching, and graceful empty states so a sleeping database degrades instead of crashing.",
        },
      ],
    },
    {
      slug: "classified",
      number: "06",
      title: "In progress",
      category: "Upcoming",
      filterCategory: "AI",
      year: "2026",
      summary: "Currently building. Details soon.",
      meta: "WIP · 2026",
      tags: ["TypeScript", "TBD"],
      githubUrl: "https://github.com/LuLuKar05",
      blocks: [
        {
          heading: "Status",
          body: "In active development — happy to talk through it in a conversation.",
        },
      ],
    },
  ],
  awards: [
    {
      rank: "1st",
      event: "UCL AgentVerse",
      note: "First place against 700 participants for a multi-agent legal automation system.",
      year: "2025",
      project: "Afterverse",
    },
    {
      rank: "2×",
      event: "Cross-chain hackathon",
      note: "Two prizes in one event — protocol design and cross-chain identity integration.",
      year: "2025",
      project: "VeriLoan",
    },
    {
      rank: "Finalist",
      event: "Biodefense track",
      note: "Zero-knowledge nutrition assistant selected for the final round.",
      year: "2026",
      project: "NutriShield",
    },
    {
      rank: "Shipped",
      event: "Freelance delivery",
      note: "Enterprise ticketing platform delivered and running in production.",
      year: "2026",
      project: "Drift Land 154",
    },
  ],
  skills: [
    { name: "Languages", code: "LNG", items: ["Python", "TypeScript", "JavaScript", "Solidity", "HTML / CSS"] },
    { name: "Frontend", code: "FE", items: ["React 19", "Next.js 16", "Tailwind", "App Router"] },
    { name: "Backend", code: "BE", items: ["Node.js", "Express", "FastAPI", "MongoDB", "PostgreSQL"] },
    { name: "AI / ML", code: "AI", items: ["LangGraph", "Gemini", "FLock LLM", "Multi-Agent"] },
    { name: "Web3", code: "W3", items: ["Ethereum", "Concordium", "Smart Contracts", "DeFi"] },
    { name: "DevOps", code: "OPS", items: ["Git", "Docker", "JWT", "Playwright", "Monorepo"] },
  ],
  timeline: [
    {
      year: "2026",
      role: "Freelance engineer",
      organisation: "Independent",
      note: "Placeholder — delivered the Drift Land 154 ticketing platform and continued building AI + privacy prototypes.",
    },
    {
      year: "2025",
      role: "1st place, UCL AgentVerse",
      organisation: "Hackathon",
      note: "Placeholder — multi-agent legal automation, first of 700 participants.",
    },
    {
      year: "2025",
      role: "Dual prize winner",
      organisation: "Cross-chain hackathon",
      note: "Placeholder — under-collateralised lending protocol across Ethereum and Concordium.",
    },
    {
      year: "2024",
      role: "Add your degree / role here",
      organisation: "Institution",
      note: "Placeholder — send me the real bullets and dates and I will format them.",
    },
  ],
  timelineNote: "Placeholder entries — send me your bullets and I'll set the real ones.",
  aboutTitle: "I like the hard half of the problem.",
  aboutPrimary:
    "Full-stack engineer working across multi-agent AI, blockchain and enterprise platforms. Most of my work starts at a hackathon deadline and ends in production — zero-knowledge proofs, identity bridges between chains, ticketing systems handling live venue traffic.",
  aboutSecondary:
    "I care about systems that survive contact with real users: retries, rate limits, idempotency, graceful degradation. The unglamorous parts are the point.",
  portraitAlt: "Portrait of Myo Myat Thiha",
  contactTitle: "Let's talk.",
  contactCopy: "Hiring, contracting, or just want the résumé — both take one click.",
  contactEmail: "hello@example.com",
  channels: [
    { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
    { label: "GitHub", value: "/LuLuKar05", href: "https://github.com/LuLuKar05" },
    { label: "LinkedIn", value: "/MyoMyatThiha", href: "https://linkedin.com" },
  ],
  portraitUrl: undefined,
  resumeUrl: undefined,
  seoTitle: "Myo Myat Thiha — Full-stack Engineer",
  seoDescription:
    "Portfolio of Myo Myat Thiha, a full-stack engineer building multi-agent AI, Web3 protocols, and production platforms.",
  // Local appearance defaults used until Sanity supplies published settings.
  backgroundColor: "#212123",
  inkColor: "#FFFFFF",
  accentColor: "#A9C4E0",
  showPlanets: true,
  orbitSpeed: 1,
  starDensity: 320,
};
