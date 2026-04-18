# Changelog

All notable changes to ko-takahashi.com are documented here.

## [2.0.0] - 2026-03-29

### Performance
- Main bundle reduced from 1,200KB to 85KB (93% reduction)
- Images optimized from 12.2MB to 238KB WebP (98% reduction)
- Code split into 14 lazy-loaded chunks (Three.js, Framer Motion, all views)
- CSS reduced from 70KB to 46KB via Tailwind content scoping
- Font loading: preconnect + preload + display=swap strategy

### SEO / GEO
- Domain unified to `ko-takahashi.com` (fixed sitemap, OG, canonical, llms.txt)
- JSON-LD migrated to unified `@graph` pattern (6 schemas: Person, Organization, WebSite, ProfilePage, BreadcrumbList, FAQPage)
- FAQ Schema expanded from 4 to 20 questions
- Page-specific canonical URLs for all routes
- hreflang tags added for 5 languages + x-default
- llms.txt expanded to 200+ lines (Quick Facts, Biography, FAQ, Citation Guide)
- llms-full.txt added (full 7-chapter story in English, project details, timeline)
- robots.txt created with 8 AI crawler explicit permissions
- noscript fallback expanded with full schema.org microdata, all platform links
- OG image created at 1200x630 with proper dimensions meta
- twitter:image meta tag added
- Article JSON-LD schema added to ArticleDetailView
- Event schema.org microdata added to ScheduleView
- SearchAction removed (no search functionality exists)

### New Features
- URL routing via History API (lib/router.ts) — deep links, back/forward, GA4 ready
- /about page — timeline, skills, philosophy, projects (bilingual)
- /links page — self-hosted link hub replacing Linktree (CollectionPage JSON-LD)
- Page transition animations (opacity + Y shift, 0.35s)
- Branded loading experience (gold spinner + shimmer)
- Vercel SPA fallback (vercel.json rewrites)
- Prerender script (scripts/prerender.mjs) for optional SSG

### UI/UX
- Hero text stagger animation (blur → sharp character reveal)
- Name letterSpacing animation (0.5em → 0.15em)
- Gold line draw animation (width: 0 → 48px)
- Scroll indicator with pulsing gold light
- Film grain noise overlay (2.5% SVG texture)
- Custom scrollbar (4px, gold/20)
- GlassCard inner glow + top-edge highlight
- Section gold dividers with centered dots
- CompanyCard hover glow gradient
- ScrollProgress tip glow effect
- About page timeline with vertical gold line + glowing dots
- Mobile navigation expanded to 4 buttons (About, Story, Articles, Links)
- Footer redesigned with serif name, nav links, separated copyright
- Filter chips changed to rounded-full with enhanced glow

### Content
- 6 internal blog articles added (Culture OS, Zen-Tech, Self-teaching, Matsuri, Education, AI Architect)
- 6 external article references (Qiita 2, Zenn 2 + 2 internal links in articles.json)
- Platform profile kit documentation (10 platforms)
- GitHub and Qiita added to socialLinks (10 → 12 sameAs)

### Type Safety
- TypeScript strict mode enabled
- `any` types completely eliminated (was 13, now 0)
- 15+ new type definitions in types.ts
- TranslationData deduplicated (i18n.ts → types.ts)

### Accessibility
- Skip navigation link ("Skip to content")
- prefers-reduced-motion: all animations disabled, canvas hidden, static fallback shown
- Custom cursor disabled for touch devices and reduced-motion users
- All buttons have type="button"
- aria-label on all interactive elements with descriptive language names
- aria-hidden="true" on decorative icons
- role="list/listitem" on article and event grids
- <time dateTime> on all dates
- <article> semantics on cards
- focus-visible gold ring on all interactive elements
- Heading hierarchy fixed (H1 as main title, not decorative label)

### Security
- Security headers added via vercel.json (HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy)
- Cache headers for static assets (1 year immutable), images (30 days), text files (1 day)
- GEMINI_API_KEY removed from client bundle exposure
- TypeScript strict mode for runtime safety

### Documentation
- CLAUDE.md created (AI development context)
- CHANGELOG.md created
- docs/ directory with 14 files covering architecture, components, data models, SEO/GEO strategy, platform strategy, implementation roadmap, content inventory, known issues, platform profile kit

## [1.0.0] - 2025-09-25

### Initial Release
- Vite + React 18 + TypeScript portfolio
- Three.js 3D hero background
- WebGL interactive portrait
- 5-language support (ja, en, zh, ko, th)
- Framer Motion animations
- StoryView with 7-chapter narrative
- ScheduleView, ArticlesView
- SEO meta tags and basic JSON-LD
- Google Site Verification
