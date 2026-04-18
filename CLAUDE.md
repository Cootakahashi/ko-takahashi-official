# CLAUDE.md — AI Development Context

## Project Overview

Personal portfolio for Ko Takahashi (高橋高), CEO of Jon & Coo Inc.
- **URL**: https://ko-takahashi.com
- **Stack**: Vite + React 18 + TypeScript + TailwindCSS + Three.js + Framer Motion
- **Hosting**: Vercel
- **Design**: "Obsidian & Gold" — Zen-Tech aesthetic (dark backgrounds, gold accents, film grain)

## Architecture

- **SPA** with client-side routing (lib/router.ts, no react-router dependency)
- **Code splitting**: Hero3D, InteractivePortrait, all views are React.lazy
- **Data**: JSON files in public/data/ (story, schedule, articles, blog_posts)
- **i18n**: 5 languages (ja, en, zh, ko, th) via i18n.ts
- **SEO**: react-helmet-async + JSON-LD @graph pattern in Seo.tsx
- **GEO**: llms.txt, llms-full.txt, robots.txt with AI crawler permissions

## Key Conventions

- TypeScript strict mode enabled. **Zero `any` types** — maintain this.
- All components have explicit Props interfaces.
- Data types defined in types.ts. Add new types there, not inline.
- Tailwind for styling. Custom colors: obsidian, gold, gold-light, gold-dim, sumi.
- Framer Motion for animations. Use `whileInView` with `viewport={{ once: true }}`.
- All buttons must have `type="button"` and `aria-label`.
- All decorative icons must have `aria-hidden="true"`.
- External links must have `rel="noopener noreferrer"` + `target="_blank"`.
- Images: Use WebP format. JPG only as OG/fallback.

## File Structure

```
App.tsx          — Main router + Home view (~680 lines)
components/      — 16 components (Seo, Hero3D, Views, MicroInteractions, etc.)
lib/router.ts    — Client-side router (History API)
lib/data-loader.ts — JSON data fetcher
config.ts        — Site metadata + social/company links
i18n.ts          — Translations (imports TranslationData from types.ts)
types.ts         — All TypeScript interfaces (18+ types)
public/data/     — JSON content (articles, blog_posts, schedule, story)
public/ko/       — Images (WebP + JPG fallbacks)
public/llms.txt  — AI-readable profile (200+ lines)
docs/            — Project documentation (13 files)
```

## Build Commands

```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build → dist/
npm run build:prerender  # Build + optional prerender (requires puppeteer)
npm run preview      # Preview production build
```

## Do NOT

- Expose API keys to client bundles (see vite.config.ts comment)
- Use `any` type — find or create the correct type in types.ts
- Add external routing libraries — use lib/router.ts
- Modify index.html meta tags without also updating Seo.tsx (they work together)
- Delete noscript content in index.html (critical for AI crawlers)
- Use `cursor: default` — the site uses a custom cursor (MicroInteractions.tsx)

## Domain

Everything points to `ko-takahashi.com`. Do not introduce other domains.
Sitemap, canonical URLs, OG tags, llms.txt all reference this domain.
