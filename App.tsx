import React, { useState, useEffect, Suspense, lazy } from "react";
import { socialLinks, companyLinks } from "./config";
import { LanguageCode, getTranslation } from "./i18n";
import Seo from "./components/Seo";
import ArchiveGrid from "./components/ArchiveGrid";
import HybridBentoGrid from "./components/HybridBentoGrid";
import CultureOSShowcase from "./components/CultureOSShowcase";
import SEOSkillsSection from "./components/SEOSkillsSection";
import { CustomCursor, ScrollProgress } from "./components/MicroInteractions";
import { getJsonData } from "./lib/data-loader";
import { resolveRoute, navigateTo, onPopState, getInitialLang, updateLangParam } from "./lib/router";
import {
  ArrowUpRight,
  Building2,
  Layers,
  Newspaper,
  ScrollText,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { SocialLink, TranslationData, StoryData, ScheduleData, ArticlesData, BlogPostsData } from "./types";
import { motion } from "framer-motion";

// Lazy-loaded heavy components (code splitting)
const Hero3D = lazy(() => import("./components/Hero3D"));
const InteractivePortrait = lazy(() => import("./components/InteractivePortrait"));
const StoryView = lazy(() => import("./components/StoryView"));
const ScheduleView = lazy(() => import("./components/ScheduleView"));
const ArticlesView = lazy(() => import("./components/ArticlesView"));
const ArticleDetailView = lazy(() => import("./components/ArticleDetailView"));
const AboutView = lazy(() => import("./components/AboutView"));
const LinksView = lazy(() => import("./components/LinksView"));

// --- UI Components ---

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <aside
    className={`relative backdrop-blur-xl bg-black/40 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.03)] rounded-sm overflow-hidden ${className}`}
  >
    {/* Subtle inner glow at top */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
    {children}
  </aside>
);

const LanguageSwitcher: React.FC<{
  current: LanguageCode;
  onChange: (lang: LanguageCode) => void;
}> = ({ current, onChange }) => {
  const languages: { code: LanguageCode; label: string; name: string }[] = [
    { code: "ja", label: "JA", name: "Japanese" },
    { code: "en", label: "EN", name: "English" },
    { code: "zh", label: "ZH", name: "Chinese" },
    { code: "ko", label: "KO", name: "Korean" },
    { code: "th", label: "TH", name: "Thai" },
  ];

  return (
    <div
      className="flex gap-1 items-center bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg"
      role="group"
      aria-label="Language selection"
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          type="button"
          aria-label={`Switch to ${lang.name}`}
          aria-pressed={current === lang.code}
          className={`text-[10px] font-mono w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            current === lang.code
              ? "bg-gold text-obsidian font-bold shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              : "text-white/50 hover:text-white hover:bg-white/10"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const CategoryBadge: React.FC<{ category: string; label: string }> = ({
  category,
  label,
}) => {
  const colors = {
    Corporate: "text-gold border-gold/40 bg-gold/5",
    Platform: "text-blue-300 border-blue-400/40 bg-blue-400/5",
    Media: "text-emerald-300 border-emerald-400/40 bg-emerald-400/5",
    DAO: "text-violet-300 border-violet-400/40 bg-violet-400/5",
  };
  const style =
    colors[category as keyof typeof colors] || "text-white border-white";

  return (
    <span
      className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm border ${style}`}
    >
      {label}
    </span>
  );
};

const CompanyCard: React.FC<{ link: SocialLink; t: TranslationData }> = ({ link, t }) => {
  const Icon =
    link.iconName === "newspaper"
      ? Newspaper
      : link.iconName === "layers"
      ? Layers
      : link.iconName === "scroll"
      ? ScrollText
      : Building2;

  const companyData =
    link.id && t.companies[link.id]
      ? t.companies[link.id]
      : { description: "", operated_by: "" };

  return (
    <article className="h-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.platform} - ${companyData.description}`}
        className="group relative overflow-hidden flex flex-col justify-between p-10 min-h-[280px] h-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 hover:border-gold/30 backdrop-blur-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.06)]"
      >
        {/* Hover glow gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 group-hover:from-gold/[0.03] group-hover:via-transparent group-hover:to-gold/[0.02] transition-all duration-700 pointer-events-none" aria-hidden="true" />

        <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
          <ArrowUpRight
            aria-hidden="true"
            className="w-5 h-5 text-white group-hover:text-gold transition-colors"
          />
        </div>

        <div className="relative z-10 mb-8">
          <CategoryBadge
            category={link.category}
            label={t.categories[link.category] || link.category}
          />
        </div>

        <div className="relative z-10 mt-auto">
          <div className="flex items-center gap-4 mb-4 text-white group-hover:text-gold transition-colors duration-500">
            <Icon aria-hidden="true" className="w-6 h-6 stroke-[1.5]" />
            <h3 className="font-serif text-3xl tracking-wide font-medium">
              {link.platform}
            </h3>
          </div>
          <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full group-hover:bg-gold/30 transition-all duration-700" />
          <p className="text-white/70 text-sm font-light leading-relaxed mb-4">
            {companyData.description}
          </p>
          <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">
            {companyData.operated_by}
          </p>
        </div>
      </a>
    </article>
  );
};

// --- Main App ---

type ViewState = "home" | "story" | "schedule" | "articles" | "article_detail" | "about" | "links";

const App: React.FC = () => {
  // Resolve initial state from URL
  const initialRoute = resolveRoute();
  const initialLang = getInitialLang();

  const [lang, setLang] = useState<LanguageCode>(
    (initialLang as LanguageCode) || "ja"
  );
  const [view, setView] = useState<ViewState>(
    (initialRoute.view as ViewState) || "home"
  );
  const [filter, setFilter] = useState<string>("All");

  // Data State (typed)
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [articlesData, setArticlesData] = useState<ArticlesData | null>(null);
  const [blogPostsData, setBlogPostsData] = useState<BlogPostsData | null>(null);

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );

  const t = getTranslation(lang);

  // Sync view changes to URL
  const handleNavigate = (newView: ViewState, articleId?: string) => {
    setView(newView);
    if (articleId) setSelectedArticleId(articleId);
    navigateTo(newView, articleId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle browser back/forward
  useEffect(() => {
    return onPopState((state) => {
      setView((state.view as ViewState) || "home");
      if (state.articleId) setSelectedArticleId(state.articleId);
      window.scrollTo({ top: 0 });
    });
  }, []);

  // Sync language to URL
  const handleLangChange = (newLang: LanguageCode) => {
    setLang(newLang);
    updateLangParam(newLang);
  };

  // Fetch Data on View Change
  useEffect(() => {
    const loadData = async () => {
      if (view === "story" && !storyData) {
        const data = await getJsonData("story.json");
        setStoryData(data);
      } else if (view === "schedule" && !scheduleData) {
        const data = await getJsonData("schedule.json");
        setScheduleData(data);
      } else if (view === "articles" && !articlesData) {
        const data = await getJsonData("articles.json");
        setArticlesData(data);
      } else if (view === "article_detail" && !blogPostsData) {
        const data = await getJsonData("blog_posts.json");
        setBlogPostsData(data);
      }
    };
    loadData();
  }, [view, storyData, scheduleData, articlesData, blogPostsData]);

  const handleArticleClick = (
    articleId: string,
    isInternal: boolean,
    url: string
  ) => {
    if (isInternal) {
      setSelectedArticleId(articleId);
      handleNavigate("article_detail", articleId);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const categories = ["All", "Business", "Tech", "Visual", "Personal"];
  const filteredLinks =
    filter === "All"
      ? socialLinks
      : socialLinks.filter((link) => link.category === filter);

  // Branded loading experience
  const viewFallback = (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="w-12 h-12 border border-gold/20 rounded-full" />
        <div className="absolute inset-0 w-12 h-12 border-t border-gold rounded-full animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-serif italic text-white/40 text-sm">Loading</span>
        <div className="w-24 h-px animate-shimmer rounded" />
      </div>
    </div>
  );

  // Page transition wrapper
  const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );

  // --- Sub-View Render Logic ---
  if (view === "about")
    return (
      <Suspense fallback={viewFallback}>
        <PageTransition>
          <Seo currentLang={lang} pageType="home" pageOverride={{ title: "About 高橋高 (Ko Takahashi) | 起業家・哲学者・エンジニア", description: "高橋高の経歴、スキル、設計哲学、プロジェクト一覧。11歳で学校を辞め、23歳で破産後、7年間の独学でプログラミングと4ヶ国語を習得した起業家エンジニアの全て。" }} />
          <AboutView onBack={() => handleNavigate("home")} lang={lang} />
        </PageTransition>
      </Suspense>
    );
  if (view === "links")
    return (
      <Suspense fallback={viewFallback}>
        <PageTransition>
          <LinksView onBack={() => handleNavigate("home")} />
        </PageTransition>
      </Suspense>
    );
  if (view === "story" && storyData)
    return (
      <Suspense fallback={viewFallback}>
        <PageTransition>
          <Seo currentLang={lang} pageType="story" pageOverride={storyData[lang]?.meta} />
          <StoryView onBack={() => handleNavigate("home")} initialData={storyData} />
        </PageTransition>
      </Suspense>
    );
  if (view === "schedule" && scheduleData)
    return (
      <Suspense fallback={viewFallback}>
        <PageTransition>
          <Seo currentLang={lang} pageType="schedule" pageOverride={scheduleData.meta?.[lang]} />
          <ScheduleView
            onBack={() => handleNavigate("home")}
            initialData={scheduleData}
          />
        </PageTransition>
      </Suspense>
    );
  if (view === "articles" && articlesData)
    return (
      <Suspense fallback={viewFallback}>
        <PageTransition>
          <Seo currentLang={lang} pageType="articles" pageOverride={articlesData.meta?.[lang]} />
          <ArticlesView
            onBack={() => handleNavigate("home")}
            initialData={articlesData}
            onArticleClick={handleArticleClick}
          />
        </PageTransition>
      </Suspense>
    );
  if (view === "article_detail" && blogPostsData && articlesData) {
    const postContainer = blogPostsData.posts.find(
      (p) => p.id === selectedArticleId
    );
    const postContent = postContainer
      ? postContainer[lang] || postContainer["ja"]
      : null;
    const metaRaw = articlesData.articles.find(
      (a) => a.id === selectedArticleId
    );
    return (
      <Suspense fallback={viewFallback}>
        <PageTransition>
          <Seo currentLang={lang} pageOverride={{ title: postContent?.title }} />
          <ArticleDetailView
            post={postContent}
            meta={metaRaw}
            onBack={() => handleNavigate("articles")}
            lang={lang}
          />
        </PageTransition>
      </Suspense>
    );
  }

  // --- Main Home View ---
  return (
    <main className="relative min-h-screen bg-obsidian text-white selection:bg-gold selection:text-obsidian overflow-hidden font-sans cursor-none md:cursor-none noise-overlay">
      {/* Skip Navigation — accessibility first */}
      <a href="#main-content" className="skip-nav">
        Skip to content
      </a>

      {/* Screen reader announcement for page changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {view !== 'home' ? `Navigated to ${view} page` : ''}
      </div>

      <Seo currentLang={lang} />

      {/* World-class micro-interactions */}
      <CustomCursor />
      <ScrollProgress />

      {/* 3D Universe Background — lazy loaded, hidden for reduced-motion users */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={<div className="fixed inset-0 bg-obsidian" />}>
          <Hero3D />
        </Suspense>
        {/* Static fallback for prefers-reduced-motion */}
        <div className="reduced-motion-fallback fixed inset-0 bg-gradient-to-br from-obsidian via-sumi to-obsidian" />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-50 flex justify-between items-start pointer-events-none"
        aria-label="Main navigation"
      >
        {/* Logo - Personal Branding */}
        <div className="flex flex-col pointer-events-auto">
          <span className="font-serif italic text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">
            Ko Takahashi
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-gold/90 uppercase mt-1">
            Official Portfolio
          </span>
        </div>

        <div className="flex flex-col items-end gap-6 pointer-events-auto">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center bg-black/60 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 gap-8 shadow-xl">
            {[
              { id: "about", label: "About" },
              { id: "story", label: "My Story" },
              { id: "articles", label: "Articles" },
              { id: "links", label: "Links" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavigate(item.id as ViewState)}
                className="relative group text-xs font-mono font-medium tracking-widest uppercase text-white/80 hover:text-white transition-colors"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu — full navigation */}
          <div className="md:hidden flex flex-wrap gap-1.5 justify-end">
            {[
              { id: "about", label: "About" },
              { id: "story", label: "Story" },
              { id: "articles", label: "Articles" },
              { id: "links", label: "Links" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id as ViewState)}
                className="text-[10px] bg-black/60 border border-white/15 backdrop-blur-md px-3 py-1.5 rounded-full text-white/70 hover:text-gold hover:border-gold/30 transition-all"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <LanguageSwitcher current={lang} onChange={handleLangChange} />
        </div>
      </motion.nav>

      {/* HERO SECTION - GRID LAYOUT */}
      <section
        className="relative min-h-screen w-full grid grid-cols-12 grid-rows-[1fr_auto_1fr] md:grid-rows-1 gap-4 px-6 md:px-12 lg:px-24 items-center z-10 pt-32 pb-12"
        id="main-content"
        aria-label="Hero Section"
      >
        {/* Left Column: Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="col-span-12 md:col-span-7 flex flex-col justify-center relative"
        >
          {/* Main Title Group */}
          <div className="relative z-10">
            {/* Subtle Watermark Background */}
            <span
              className="font-serif text-[12vw] md:text-[8vw] leading-none text-white/[0.03] absolute -top-[0.6em] left-0 select-none pointer-events-none block"
              aria-hidden="true"
            >
              旅
            </span>

            {/* Main Catchphrase — word-level stagger (performant, cinematic) */}
            <h1 className="font-serif text-[8vw] md:text-[4vw] lg:text-[3.5vw] text-white tracking-tight leading-[1.2] mb-6">
              {t.hero_catchphrase.split(/(?<=[\s、。？])/).map((segment: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline"
                >
                  {segment}
                </motion.span>
              ))}
            </h1>

            {/* Sub Catchphrase — warm tone fade */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="font-serif italic text-base md:text-lg text-amber-400/80 mb-8 max-w-xl leading-relaxed"
            >
              {t.hero_subcatchphrase}
            </motion.p>

            {/* Name — elegant reveal */}
            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.15em' }}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-jp font-normal text-2xl md:text-3xl text-white/60"
            >
              {t.hero_name}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-8 flex items-center gap-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 2.4, duration: 0.6, ease: 'easeOut' }}
              className="h-[2px] bg-gold shadow-[0_0_10px_#D4AF37]"
              aria-hidden="true"
            />
            <p className="font-mono text-xs md:text-sm text-gold tracking-[0.3em] uppercase font-bold drop-shadow-md">
              {t.hero_role_titles}
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Bio Card - Personal Signature Style */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="col-span-12 md:col-start-9 md:col-span-4 flex flex-col justify-center mt-8 md:mt-0"
        >
          <GlassCard className="p-8 border-l-4 border-l-gold/80 hover:bg-black/50 transition-colors duration-500">
            {/* Interactive WebGL Portrait — lazy loaded */}
            <div className="mb-8 h-72 relative">
              <Suspense fallback={
                <div className="w-full h-full bg-gradient-to-br from-sumi to-obsidian rounded-sm animate-pulse" />
              }>
                <InteractivePortrait className="w-full h-full" />
              </Suspense>
            </div>

            {/* Header: Personal Identity & Location */}
            <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-serif italic text-gold text-2xl">
                  Ko Takahashi
                </h2>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                  Official Identity
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <div
                  className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]"
                  aria-hidden="true"
                ></div>
                <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  Shinjuku, Tokyo
                </span>
              </div>
            </header>

            <p className="font-serif text-lg leading-relaxed text-white/90 drop-shadow-sm text-justify">
              {t.bio_text}
            </p>
            <div className="mt-8 flex gap-4 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => handleNavigate("story")}
                className="group relative text-xs font-mono text-gold hover:text-white transition-all duration-500 py-3"
                aria-label="Read my full story"
              >
                <span className="relative z-10 tracking-[0.2em]">READ MY STORY</span>
                <span className="absolute bottom-2 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-500" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("about")}
                className="group relative text-xs font-mono text-white/40 hover:text-gold transition-all duration-500 py-3 ml-auto"
                aria-label="About Ko Takahashi"
              >
                <span className="relative z-10 tracking-[0.2em]">ABOUT</span>
                <span className="absolute bottom-2 left-0 h-px w-0 bg-gold/50 group-hover:w-full transition-all duration-500" />
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scroll Indicator — cinematic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.2 }}
          className="col-span-12 flex justify-center items-end h-full pb-8 pointer-events-none md:absolute md:bottom-12 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase">
              Scroll
            </span>
            <div className="relative w-[1px] h-16">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/0 via-gold/20 to-gold/0" />
              <motion.div
                className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-gold/0 via-gold to-gold/0"
                animate={{ y: [0, 48, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Container */}
      <div className="relative bg-obsidian z-20">
        {/* Cinematic gradient transition from 3D to solid */}
        <div
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-transparent via-obsidian/80 to-obsidian -translate-y-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">

          {/* Section divider — thin gold accent */}
          <div className="flex items-center gap-6 mb-24" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <span className="text-[10px] font-mono text-gold/30 tracking-[0.4em] uppercase">Beyond the Surface</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>

          {/* THE HYBRID - Three Faces */}
          <HybridBentoGrid t={t} onNavigate={() => handleNavigate("story")} />

          {/* CULTURE OS SHOWCASE */}
          <CultureOSShowcase t={t} />

          {/* SEO SKILLS SECTION */}
          <SEOSkillsSection />

          {/* Section divider */}
          <div className="flex items-center gap-6 mb-24 mt-8" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
            <div className="w-1.5 h-1.5 bg-gold/30 rounded-full" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          </div>

          {/* PRIMARY VENTURES */}
          <section className="mb-48" aria-labelledby="ventures-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-8"
            >
              <h2
                id="ventures-title"
                className="text-5xl md:text-7xl font-serif text-white tracking-tight"
              >
                Core{" "}
                <span className="text-gold italic font-light">Ventures</span>
              </h2>
              <span
                className="hidden md:block text-xs font-mono text-white/30 mb-2 tracking-widest"
                aria-hidden="true"
              >
                01 — SELECT PROJECTS
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyLinks.map((link, index) => (
                <motion.div
                  key={link.url}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <CompanyCard link={link} t={t} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section divider */}
          <div className="flex items-center gap-6 mb-24" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
            <div className="w-1.5 h-1.5 bg-gold/30 rounded-full" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          </div>

          {/* ARCHIVE GRID */}
          <section aria-labelledby="archive-title">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
            >
              <div>
                <span
                  className="block text-xs font-mono text-gold mb-2 tracking-widest"
                  aria-hidden="true"
                >
                  DIGITAL PRESENCE
                </span>
                <h2
                  id="archive-title"
                  className="text-4xl md:text-5xl font-serif text-white/90"
                >
                  The <span className="text-white italic">Archive</span>
                </h2>
              </div>

              {/* Filter Chips */}
              <nav
                className="flex flex-wrap gap-2"
                aria-label="Category filter"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    aria-label={`Filter by ${
                      t.categories[cat as keyof typeof t.categories] || cat
                    }`}
                    aria-pressed={filter === cat}
                    className={`text-[10px] md:text-xs px-5 py-2 rounded-full border transition-all duration-300 tracking-wider uppercase font-mono ${
                      filter === cat
                        ? "border-gold text-obsidian bg-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {t.categories[cat as keyof typeof t.categories] || cat}
                  </button>
                ))}
              </nav>
            </motion.div>

            <ArchiveGrid links={filteredLinks} t={t} />
          </section>

          {/* Footer — refined */}
          <footer className="mt-48 border-t border-white/5 pt-16 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col gap-3 text-center md:text-left">
                <span className="font-serif italic text-lg text-white/20">Ko Takahashi</span>
                <p className="text-[10px] font-mono text-white/15 tracking-widest uppercase">
                  Shinjuku / Tokyo / Metaverse
                </p>
              </div>
              <nav className="flex items-center gap-8 text-xs font-mono text-white/25" aria-label="Footer navigation">
                <button
                  type="button"
                  onClick={() => handleNavigate("about")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  ABOUT
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("links")}
                  className="hover:text-gold transition-colors duration-300"
                >
                  LINKS
                </button>
                <a
                  href="https://www.linkedin.com/in/ko-takahashi-jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300"
                >
                  CONTACT
                </a>
              </nav>
            </div>
            <div className="mt-12 text-center">
              <p className="text-[10px] font-mono text-white/10">
                &copy; {new Date().getFullYear()} Ko Takahashi. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default App;
