'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Github, Linkedin, Instagram,
  Twitter, Code2, FileText, PenTool, Layers, Building2,
  Newspaper, ScrollText, Image, BookOpen, Terminal
} from 'lucide-react';
import { socialLinks, companyLinks } from '../config';
import type { SocialLink } from '../types';

interface LinksViewProps {
  onBack?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  'file-text': <FileText className="w-5 h-5" />,
  'pen-tool': <PenTool className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  'layout-list': <BookOpen className="w-5 h-5" />,
  'code-2': <Code2 className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  image: <Image className="w-5 h-5" />,
  building: <Building2 className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  scroll: <ScrollText className="w-5 h-5" />,
  newspaper: <Newspaper className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  Business: 'border-blue-500/30 hover:border-blue-400/60 hover:bg-blue-950/20',
  Tech: 'border-emerald-500/30 hover:border-emerald-400/60 hover:bg-emerald-950/20',
  Visual: 'border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-950/20',
  Personal: 'border-white/20 hover:border-white/40 hover:bg-white/5',
  Corporate: 'border-gold/30 hover:border-gold/60 hover:bg-gold/5',
  Platform: 'border-blue-400/30 hover:border-blue-300/60 hover:bg-blue-950/20',
  Media: 'border-emerald-400/30 hover:border-emerald-300/60 hover:bg-emerald-950/20',
  DAO: 'border-violet-400/30 hover:border-violet-300/60 hover:bg-violet-950/20',
};

const categoryTextColors: Record<string, string> = {
  Business: 'text-blue-400',
  Tech: 'text-emerald-400',
  Visual: 'text-purple-400',
  Personal: 'text-white/60',
  Corporate: 'text-gold',
  Platform: 'text-blue-300',
  Media: 'text-emerald-300',
  DAO: 'text-violet-300',
};

// JSON-LD for the links page — explicitly connects all platforms
const linksPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "高橋高 (Ko Takahashi) — Official Links",
  "description": "All official links and profiles for Ko Takahashi (高橋高). CEO & Founder of Jon & Coo Inc. Entrepreneur, philosopher, and self-taught engineer based in Shinjuku, Tokyo.",
  "url": "https://ko-takahashi.com/links",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://ko-takahashi.com/#person",
    "name": "高橋 高",
    "alternateName": ["Ko Takahashi", "Takahashi Ko"],
    "sameAs": [
      ...socialLinks.map(l => l.url),
      ...companyLinks.map(l => l.url),
    ]
  }
};

const LinkButton: React.FC<{ link: SocialLink; index: number }> = ({ link, index }) => {
  const icon = iconMap[link.iconName || ''] || <ExternalLink className="w-5 h-5" />;
  const borderColor = categoryColors[link.category] || categoryColors.Personal;
  const textColor = categoryTextColors[link.category] || 'text-white/60';

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`group flex items-center gap-4 px-6 py-4 border rounded-lg bg-white/[0.02] backdrop-blur-sm transition-all duration-300 ${borderColor}`}
      aria-label={`${link.platform} — ${link.category}`}
    >
      <span className={`shrink-0 ${textColor} group-hover:scale-110 transition-transform`}>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <span className="block font-serif text-white group-hover:text-gold transition-colors text-base">
          {link.platform}
        </span>
        <span className="block text-[11px] text-white/30 font-mono truncate">
          {link.url.replace(/^https?:\/\/(www\.)?/, '')}
        </span>
      </div>
      <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-gold shrink-0 transition-colors" aria-hidden="true" />
    </motion.a>
  );
};

const LinksView: React.FC<LinksViewProps> = ({ onBack }) => {
  return (
    <main className="min-h-screen bg-obsidian text-white font-sans noise-overlay">
      <Helmet>
        <title>高橋高 (Ko Takahashi) — Official Links | 全公式リンク</title>
        <meta name="description" content="高橋高（Ko Takahashi）の全公式リンク。LinkedIn、GitHub、Zenn、Qiita、Medium、Dev.to、Note、Instagram、X、Jon & Coo、Matsuri Platform、The J-Times。" />
        <link rel="canonical" href="https://ko-takahashi.com/links" />
        <script type="application/ld+json">{JSON.stringify(linksPageSchema)}</script>
      </Helmet>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full px-6 py-5 md:px-12 z-50 bg-obsidian/80 backdrop-blur-xl border-b border-white/5"
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm font-mono focus-visible:ring-2 focus-visible:ring-gold/60"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>BACK</span>
        </button>
      </motion.nav>

      <div className="max-w-lg mx-auto px-6 pt-28 pb-24">
        {/* Profile Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Profile Image */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gold/30 overflow-hidden bg-sumi shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <img
              src="/ko/takahashi-ko.webp"
              alt="Ko Takahashi"
              className="w-full h-full object-cover"
              width={96}
              height={96}
              loading="eager"
            />
          </div>

          <h1 className="font-serif text-2xl text-white mb-1">高橋 高</h1>
          <p className="text-sm text-gold/70 font-mono tracking-wider mb-3">Ko Takahashi</p>
          <p className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">
            CEO & Founder, Jon & Coo Inc.
          </p>
          <p className="text-sm text-white/50 font-serif italic max-w-sm mx-auto leading-relaxed">
            Bridging Japanese culture and technology.
            <br />
            テクノロジーと日本文化の融合を追求。
          </p>
        </motion.header>

        {/* Company Links */}
        <section className="mb-8" aria-label="Projects & Companies">
          <h2 className="text-[10px] font-mono text-gold/50 tracking-widest uppercase mb-4 px-1">
            Projects
          </h2>
          <div className="space-y-3">
            {companyLinks.map((link, i) => (
              <LinkButton key={link.url} link={link} index={i} />
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-8" aria-label="Social & Technical Profiles">
          <h2 className="text-[10px] font-mono text-gold/50 tracking-widest uppercase mb-4 px-1">
            Profiles
          </h2>
          <div className="space-y-3">
            {socialLinks.map((link, i) => (
              <LinkButton key={link.url} link={link} index={i + companyLinks.length} />
            ))}
          </div>
        </section>

        {/* Website Link */}
        <section className="mb-12" aria-label="Official Website">
          <motion.a
            href="https://ko-takahashi.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="block text-center py-4 px-6 border border-gold/40 rounded-lg bg-gold/5 hover:bg-gold/10 transition-colors"
          >
            <span className="font-serif text-gold text-sm">ko-takahashi.com</span>
            <span className="block text-[10px] text-white/30 font-mono mt-1">OFFICIAL PORTFOLIO</span>
          </motion.a>
        </section>

        {/* SEO Footer — crawlable text */}
        <footer className="text-center border-t border-white/5 pt-8">
          <p className="text-[10px] text-white/15 font-mono tracking-widest">
            SHINJUKU / TOKYO / METAVERSE
          </p>
        </footer>
      </div>

      {/* Hidden SEO content for crawlers */}
      <div className="sr-only">
        <h2>高橋高の全公式リンク / All Official Links for Ko Takahashi</h2>
        <p>高橋高（Ko Takahashi）は新宿拠点の起業家・哲学者・エンジニア。Jon & Coo Inc. CEO。</p>
        <p>Ko Takahashi is a Japanese entrepreneur based in Shinjuku, Tokyo. CEO of Jon & Coo Inc.</p>
        <ul>
          {[...companyLinks, ...socialLinks].map(l => (
            <li key={l.url}>{l.platform}: {l.url}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default LinksView;
