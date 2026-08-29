# Myo Myat Thiha — Portfolio

A responsive, accessible developer portfolio built with Next.js, TypeScript, CSS Modules, Sanity CMS, and Resend. It features interactive case studies, an animated orbital interface, editable content, SEO, analytics, and automated testing.

The production site is intended for [myomyatthiha.com](https://myomyatthiha.com).

## Features

- Responsive desktop, tablet, and mobile layouts
- Locally hosted Barlow, JetBrains Mono, and Nasalization fonts
- Canvas star field and animated CSS orbital system
- Project filtering and interactive case-study views
- Scroll reveals, cursor previews, hero animations, and résumé modal
- Embedded Sanity Studio at `/studio`
- Local fallback content when Sanity is unavailable or not configured
- Contact form delivery through Resend
- SEO metadata, canonical URLs, JSON-LD, Open Graph image, sitemap, and robots rules
- Vercel Web Analytics and Speed Insights
- Keyboard navigation, focus management, semantic markup, and automated accessibility checks
- Unit, component, desktop, and mobile end-to-end tests

## Technology

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript |
| Styling | CSS Modules |
| Content | Sanity CMS |
| Email | Resend |
| Validation | Zod |
| Hosting | Vercel with Cloudflare DNS |
| Analytics | Vercel Web Analytics and Speed Insights |
| Testing | Vitest, Testing Library, Playwright, Axe |

## How it works

The home page loads content on the server and passes it to the interactive portfolio component:

```text
Sanity CMS ──┐
             ├── getPortfolioContent() ── PortfolioExperience
Fallback data┘
```

If Sanity is not configured, cannot be reached, or has missing collections, the application uses the placeholder content in `src/content/fallback.ts`. Published Sanity content replaces those fallbacks without requiring code changes.

The contact form posts to `POST /api/contact`. The Route Handler validates and sanitises the request before sending it through Resend. API credentials remain server-only.

## Getting started

### Requirements

- Node.js 20.9 or newer
- npm

### Installation

```bash
git clone <repository-url>
cd Portfolio
npm install
```

Create the local environment file on Windows:

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The portfolio works immediately with local placeholder content.

## Environment variables

Configure these values in `.env.local` and in the Vercel project settings:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL="Portfolio <portfolio@myomyatthiha.com>"
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset, normally `production` |
| `RESEND_API_KEY` | Server-only Resend API key |
| `CONTACT_TO_EMAIL` | Private inbox that receives portfolio enquiries |
| `CONTACT_FROM_EMAIL` | Sender on the Resend-verified domain |

Only the two `NEXT_PUBLIC_` values are exposed to the browser.

## Managing content with Sanity

1. Create a Sanity project and production dataset at [sanity.io/manage](https://www.sanity.io/manage).
2. Add the Sanity project ID and dataset to `.env.local`.
3. Add `http://localhost:3000` and `https://myomyatthiha.com` to the project's allowed CORS origins.
4. Restart the development server.
5. Open [http://localhost:3000/studio](http://localhost:3000/studio).
6. Create and publish one **Site settings** document.
7. Create and publish **Project** documents in display order.

### Site settings

The Site settings document controls:

- Hero text, availability, and statistics
- Recognition, skills, timeline, and about content
- Portrait image and alternative text
- Contact channels and résumé PDF
- SEO title and description
- Background, text, and accent colours
- Planet visibility, orbit speed, and star density

### Projects

Each Project document supports:

- Display order, number, title, and generated slug
- Category, filter category, year, summary, and metadata
- Award label and technology tags
- GitHub and live-demo URLs
- Case-study sections
- Project image, hotspot, and alternative text

Sanity stores uploaded images and files and serves them through its CDN. After publishing, an update can take up to 60 seconds to appear because content requests are revalidated.

For local-only content, edit `src/content/fallback.ts`. Static files can be placed in `public/` and referenced from the root, such as `/project-image.jpg`.

## Visual customisation

Most content and appearance values are available in **Sanity Studio → Site settings → Appearance**. Local defaults live near the bottom of `src/content/fallback.ts`.

The main visual tokens are at the top of `src/components/portfolio-experience.module.css`:

```css
--bg: #212123;
--line-rgb: 169, 196, 224;
--orbit-line-width: 1px;
--orbit-line-opacity: 0.34;
```

The orbit consists of two fixed ring paths and animated planet tracks. Orbit durations are derived from the CMS `orbitSpeed` value in `portfolio-experience.tsx`. The orbit is explicitly configured to keep animating even when reduced motion is requested; other decorative motion continues to respect the user's reduced-motion preference.

## Configuring Resend

1. Add and verify `myomyatthiha.com` in Resend.
2. Add the DNS records supplied by Resend to Cloudflare.
3. Create a Resend API key.
4. Set `RESEND_API_KEY` in `.env.local` and Vercel.
5. Set `CONTACT_TO_EMAIL` to the private recipient inbox.
6. Keep `CONTACT_FROM_EMAIL` on the verified domain.

The email displayed publicly through Sanity can be different from the private delivery address.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run Playwright desktop and mobile tests |
| `npm run check` | Run lint, type-check, unit tests, and production build |

Install Playwright's Chromium runtime once per machine:

```bash
npx playwright install chromium
```

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it into Vercel as a Next.js project.
3. Add all production environment variables.
4. Enable Web Analytics and Speed Insights.
5. Deploy the project.

### Cloudflare domain

1. Add `myomyatthiha.com` and `www.myomyatthiha.com` under **Vercel → Settings → Domains**.
2. Choose the preferred hostname and redirect the other hostname to it.
3. Add the exact A or CNAME records supplied by Vercel to Cloudflare.
4. Use **DNS only** while initially verifying the domain.

If Cloudflare proxying is enabled later, ensure Vercel Analytics requests under `/_vercel/insights/*` continue to reach Vercel.

## Project structure

```text
src/
├── app/
│   ├── api/contact/       # Resend contact endpoint
│   ├── studio/            # Embedded Sanity Studio
│   ├── layout.tsx         # Fonts, metadata, and analytics
│   └── page.tsx           # Server-rendered portfolio page
├── components/
│   ├── portfolio-experience.tsx
│   └── portfolio-experience.module.css
├── content/
│   ├── fallback.ts        # Local placeholder content
│   └── types.ts
└── sanity/
    ├── lib/               # Client, queries, and content loading
    └── schemaTypes/       # Site settings and project schemas

tests/e2e/                 # Playwright and Axe tests
sanity.config.ts           # Sanity Studio configuration
```

## Quality checks

Before opening a pull request or deploying:

```bash
npm run check
npm run test:e2e
```

The automated suite covers core interactions, keyboard-accessible dialogs, desktop/mobile behavior, orbit animation, and WCAG A/AA checks with Axe.
