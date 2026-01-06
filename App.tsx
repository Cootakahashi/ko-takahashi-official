import React, { useState, useEffect } from "react";
import { socialLinks, companyLinks } from "./config";
import { LanguageCode, getTranslation } from "./i18n";
import Hero3D from "./components/Hero3D";
import Seo from "./components/Seo";
import ArchiveGrid from "./components/ArchiveGrid";
import StoryView from "./components/StoryView";
import ScheduleView from "./components/ScheduleView";
import ArticlesView from "./components/ArticlesView";
import ArticleDetailView from "./components/ArticleDetailView";
import { getJsonData } from "./lib/data-loader";
import {
  ArrowUpRight,
  Building2,
  Layers,
  Newspaper,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { SocialLink } from "./types";
import { motion } from "framer-motion";

// --- UI Components ---

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-sm ${className}`}
  >
    {children}
  </div>
);

const LanguageSwitcher: React.FC<{
  current: LanguageCode;
  onChange: (lang: LanguageCode) => void;
}> = ({ current, onChange }) => {
  const languages: { code: LanguageCode; label: string }[] = [
    { code: "ja", label: "JA" },
    { code: "en", label: "EN" },
    { code: "zh", label: "ZH" },
    { code: "ko", label: "KO" },
    { code: "th", label: "TH" },
  ];

  return (
    <div className="flex gap-1 items-center bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
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

const CompanyCard: React.FC<{ link: SocialLink; t: any }> = ({ link, t }) => {
  const Icon =
    link.iconName === "newspaper"
      ? Newspaper
      : link.iconName === "layers"
      ? Layers
      : Building2;

  const companyData =
    link.id && t.companies[link.id]
      ? t.companies[link.id]
      : { description: "", operated_by: "" };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden flex flex-col justify-between p-10 min-h-[280px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-700 hover:border-gold/40 backdrop-blur-sm"
    >
      <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-gold transition-colors" />
      </div>

      <div className="relative z-10 mb-8">
        <CategoryBadge
          category={link.category}
          label={t.categories[link.category] || link.category}
        />
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex items-center gap-4 mb-4 text-white group-hover:text-gold transition-colors duration-500">
          <Icon className="w-6 h-6 stroke-[1.5]" />
          <h3 className="font-serif text-3xl tracking-wide font-medium">
            {link.platform}
          </h3>
        </div>
        <div className="h-px w-12 bg-white/10 mb-4 group-hover:w-full group-hover:bg-gold/30 transition-all duration-700" />
        <p className="text-white/70 text-sm font-light leading-relaxed mb-4">
          {companyData.description}
        </p>
        <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
          {companyData.operated_by}
        </p>
      </div>
    </a>
  );
};

// --- Main App ---

type ViewState = "home" | "story" | "schedule" | "articles" | "article_detail";

const App: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>("ja");
  const [view, setView] = useState<ViewState>("home");
  const [filter, setFilter] = useState<string>("All");

  // Data State
  const [storyData, setStoryData] = useState<any>(null);
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [articlesData, setArticlesData] = useState<any>(null);
  const [blogPostsData, setBlogPostsData] = useState<any>(null);

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );

  const t = getTranslation(lang);

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
      setView("article_detail");
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const categories = ["All", "Business", "Tech", "Visual", "Personal"];
  const filteredLinks =
    filter === "All"
      ? socialLinks
      : socialLinks.filter((link) => link.category === filter);

  // --- Sub-View Render Logic ---
  if (view === "story" && storyData)
    return (
      <>
        <Seo currentLang={lang} pageOverride={storyData[lang]?.meta} />
        <StoryView onBack={() => setView("home")} initialData={storyData} />
      </>
    );
  if (view === "schedule" && scheduleData)
    return (
      <>
        <Seo currentLang={lang} pageOverride={scheduleData.meta?.[lang]} />
        <ScheduleView
          onBack={() => setView("home")}
          initialData={scheduleData}
        />
      </>
    );
  if (view === "articles" && articlesData)
    return (
      <>
        <Seo currentLang={lang} pageOverride={articlesData.meta?.[lang]} />
        <ArticlesView
          onBack={() => setView("home")}
          initialData={articlesData}
          onArticleClick={handleArticleClick}
        />
      </>
    );
  if (view === "article_detail" && blogPostsData && articlesData) {
    const postContainer = blogPostsData.posts.find(
      (p: any) => p.id === selectedArticleId
    );
    const postContent = postContainer
      ? postContainer[lang] || postContainer["ja"]
      : null;
    const metaRaw = articlesData.articles.find(
      (a: any) => a.id === selectedArticleId
    );
    return (
      <>
        <Seo currentLang={lang} pageOverride={{ title: postContent?.title }} />
        <ArticleDetailView
          post={postContent}
          meta={metaRaw}
          onBack={() => setView("articles")}
          lang={lang}
        />
      </>
    );
  }

  // --- Main Home View ---
  return (
    <main className="relative min-h-screen bg-obsidian text-white selection:bg-gold selection:text-obsidian overflow-hidden font-sans">
      <Seo currentLang={lang} />

      {/* 3D Universe Background */}
      <div className="fixed inset-0 pointer-events-none">
        <Hero3D />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-50 flex justify-between items-start pointer-events-none"
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
              { id: "story", label: "My Story" },
              { id: "schedule", label: "Schedule" },
              { id: "articles", label: "Articles" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewState)}
                className="relative group text-xs font-mono font-medium tracking-widest uppercase text-white/80 hover:text-white transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex gap-2">
            <button
              onClick={() => setView("story")}
              className="text-[10px] bg-black/50 border border-white/20 backdrop-blur px-3 py-1 rounded text-white"
            >
              Story
            </button>
            <button
              onClick={() => setView("schedule")}
              className="text-[10px] bg-black/50 border border-white/20 backdrop-blur px-3 py-1 rounded text-white"
            >
              Events
            </button>
          </div>

          <LanguageSwitcher current={lang} onChange={setLang} />
        </div>
      </motion.nav>

      {/* HERO SECTION - GRID LAYOUT */}
      <section className="relative min-h-screen w-full grid grid-cols-12 grid-rows-[1fr_auto_1fr] md:grid-rows-1 gap-4 px-6 md:px-12 lg:px-24 items-center z-10 pt-32 pb-12">
        {/* Left Column: Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="col-span-12 md:col-span-7 flex flex-col justify-center relative"
        >
          {/* Main Title Group */}
          <div className="relative z-10">
            {/* Huge English Watermark */}
            <h2 className="font-serif text-[12vw] md:text-[8vw] leading-none text-white/5 absolute -top-[0.6em] left-0 select-none pointer-events-none mix-blend-overlay">
              {t.hero_name_sub}
            </h2>

            {/* Sharp Japanese Title */}
            <h1 className="font-jp font-medium text-[12vw] md:text-[6vw] text-white tracking-widest drop-shadow-2xl leading-[1.1]">
              {t.hero_name}
            </h1>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="h-[2px] w-12 bg-gold shadow-[0_0_10px_#D4AF37]"></div>
            <p className="font-mono text-xs md:text-sm text-gold tracking-[0.3em] uppercase font-bold drop-shadow-md">
              {t.hero_role_titles}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Bio Card - Personal Signature Style */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="col-span-12 md:col-start-9 md:col-span-4 flex flex-col justify-center mt-8 md:mt-0"
        >
          <GlassCard className="p-8 border-l-4 border-l-gold/80 hover:bg-black/50 transition-colors duration-500">
            {/* Header: Personal Identity & Location */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif italic text-gold text-2xl">
                  Ko Takahashi
                </h3>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Official Identity
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]"></div>
                <span className="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  Tokyo, Japan
                </span>
              </div>
            </div>

            <p className="font-serif text-lg leading-relaxed text-white/90 drop-shadow-sm text-justify">
              {t.bio_text}
            </p>
            <div className="mt-8 flex gap-4 pt-4">
              <button
                onClick={() => setView("story")}
                className="text-xs font-mono text-gold hover:text-white transition-colors underline underline-offset-4 decoration-gold/50"
              >
                READ MY STORY
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="col-span-12 flex justify-center items-end h-full pb-8 pointer-events-none md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
              Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gold/0 via-gold to-gold/0"></div>
          </div>
        </motion.div>
      </section>

      {/* Content Container - Solid background starts here for readability */}
      <div className="relative bg-obsidian z-20">
        {/* Gradient Transition from 3D to Solid */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-obsidian -translate-y-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
          {/* PRIMARY VENTURES */}
          <section className="mb-48">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-8">
              <h3 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
                Core{" "}
                <span className="text-gold italic font-light">Ventures</span>
              </h3>
              <span className="hidden md:block text-xs font-mono text-white/30 mb-2 tracking-widest">
                01 — SELECT PROJECTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {companyLinks.map((link, index) => (
                <motion.div
                  key={link.url}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <CompanyCard link={link} t={t} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ARCHIVE GRID */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <span className="block text-xs font-mono text-gold mb-2 tracking-widest">
                  DIGITAL PRESENCE
                </span>
                <h3 className="text-4xl md:text-5xl font-serif text-white/90">
                  The <span className="text-white italic">Archive</span>
                </h3>
              </div>

              {/* Filter Chips */}
              <nav className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-[10px] md:text-xs px-5 py-2 rounded-sm border transition-all duration-300 tracking-wider uppercase font-mono ${
                      filter === cat
                        ? "border-gold text-obsidian bg-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {t.categories[cat as keyof typeof t.categories] || cat}
                  </button>
                ))}
              </nav>
            </div>

            <ArchiveGrid links={filteredLinks} t={t} />
          </section>

          {/* Footer */}
          <footer className="mt-48 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 font-mono">
            <div className="flex flex-col gap-2 mb-4 md:mb-0 text-center md:text-left">
              <p>
                &copy; {new Date().getFullYear()} Ko Takahashi. All Rights
                Reserved.
              </p>
              <p className="tracking-widest">TOKYO / KYOTO / METAVERSE</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-gold transition-colors">
                CONTACT
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                PRIVACY
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default App;
