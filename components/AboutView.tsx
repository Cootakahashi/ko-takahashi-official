'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Code2, Globe, Briefcase, Languages, Calendar, BookOpen } from 'lucide-react';
import type { LanguageCode } from '../types';

interface AboutViewProps {
  onBack?: () => void;
  lang?: LanguageCode;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const content = {
  ja: {
    title: '高橋 高について',
    subtitle: 'Ko Takahashi — Entrepreneur, Philosopher, Engineer',
    intro: '1995年6月1日、東京都新宿区生まれ。Jon & Coo Inc. CEO兼創業者。Culture OS、Matsuri Platform、The J-Times、Matsuri DAOの開発・運営を通じて、テクノロジーと日本文化の融合を追求する起業家・哲学者・独学エンジニア。',
    sections: {
      background: {
        title: '経歴',
        items: [
          { year: '1995', text: '東京都新宿区に生まれる' },
          { year: '2006', text: '11歳で学校教育から離脱。国内放浪を開始' },
          { year: '2013', text: '18歳で新宿にて起業' },
          { year: '2015', text: '20歳で60人のチームを率いる事業を展開' },
          { year: '2018', text: '23歳で破産。全てを失う。7年間の沈黙期間に突入' },
          { year: '2019', text: '北海道へ。英語の独学を開始。タイ・欧州へ渡航' },
          { year: '2020', text: 'Jon & Coo Inc. 設立' },
          { year: '2021', text: 'プログラミング独学開始（Rust, Python, TypeScript）' },
          { year: '2024', text: 'Matsuri Platform ローンチ。Culture OS開発開始' },
          { year: '2025', text: 'Matsuri DAO、The J-Times、ブロックチェーン統合' },
        ]
      },
      skills: {
        title: 'スキル・専門性',
        categories: [
          { icon: <Code2 className="w-5 h-5" />, label: 'プログラミング', items: ['Rust', 'Python', 'TypeScript', 'JavaScript', 'Solidity'] },
          { icon: <Globe className="w-5 h-5" />, label: 'フレームワーク', items: ['Next.js', 'React', 'Solana', 'Three.js', 'Django', 'TailwindCSS'] },
          { icon: <Languages className="w-5 h-5" />, label: '言語能力', items: ['日本語（母語）', 'English', '中国語', 'タイ語'] },
          { icon: <Briefcase className="w-5 h-5" />, label: '経営', items: ['スタートアップ経営', 'プロダクト開発', 'チームマネジメント', 'ブランド戦略'] },
        ]
      },
      philosophy: {
        title: '設計哲学: Zen-Tech',
        text: '禅庭園の原則をデジタルインターフェースに適用する設計哲学。「石（コンテンツ）を配置する前に、まず砂（空白）を整えること」。引き算の美学、意味を持った「間（Ma）」の活用、そして「静寂の中でこそ、情報は際立つ」という思想を体現する。',
        principles: [
          '引き算の美学 — 不要な要素を削ぎ落とし、本質のみを表示',
          '間（Ma）の活用 — 空白は単なるスペースではなく、意味を持った沈黙',
          'Obsidian & Gold — 黒を基調に、金のアクセントで視線を導く',
          '感情への共鳴 — 効率の最適化ではなく、人間の感情に響く体験',
        ]
      },
      projects: {
        title: 'プロジェクト',
        items: [
          { name: 'Culture OS', desc: '日本の伝統美学をデジタル基盤に統合するオープンフレームワーク', url: '' },
          { name: 'Matsuri Platform', desc: '日本文化体験のための次世代デジタルプラットフォーム', url: 'https://matsuri.group/ja' },
          { name: 'Jon & Coo Inc.', desc: 'Culture OSと関連プロジェクトを開発するテクノロジー企業', url: 'https://www.jonandcoo.jp/ja' },
          { name: 'The J-Times', desc: 'テクノロジー・デザイン・日本文化に関するグローバルメディア', url: 'https://www.j-times.org/' },
          { name: 'Matsuri DAO', desc: 'Solana上で日本文化を守るトークン (MTC)', url: 'https://www.matsuri-dao.com' },
        ]
      },
      quote: '「誰かの書いた脚本を、生きていませんか？」'
    }
  },
  en: {
    title: 'About Ko Takahashi',
    subtitle: 'Ko Takahashi — Entrepreneur, Philosopher, Engineer',
    intro: 'Born June 1, 1995, in Shinjuku, Tokyo. CEO & Founder of Jon & Coo Inc. A self-taught entrepreneur, philosopher, and engineer pursuing the fusion of technology and Japanese culture through Culture OS, Matsuri Platform, The J-Times, and Matsuri DAO.',
    sections: {
      background: {
        title: 'Background',
        items: [
          { year: '1995', text: 'Born in Shinjuku, Tokyo' },
          { year: '2006', text: 'Left school at age 11. Began wandering Japan' },
          { year: '2013', text: 'Founded first business in Shinjuku at 18' },
          { year: '2015', text: 'Led a team of 60 people by age 20' },
          { year: '2018', text: 'Went bankrupt at 23. Lost everything. 7 years of silence began' },
          { year: '2019', text: 'Fled to Hokkaido. Self-taught English. Traveled to Thailand & Europe' },
          { year: '2020', text: 'Founded Jon & Coo Inc.' },
          { year: '2021', text: 'Self-taught programming (Rust, Python, TypeScript)' },
          { year: '2024', text: 'Launched Matsuri Platform. Began Culture OS development' },
          { year: '2025', text: 'Matsuri DAO, The J-Times, blockchain integration' },
        ]
      },
      skills: {
        title: 'Skills & Expertise',
        categories: [
          { icon: <Code2 className="w-5 h-5" />, label: 'Programming', items: ['Rust', 'Python', 'TypeScript', 'JavaScript', 'Solidity'] },
          { icon: <Globe className="w-5 h-5" />, label: 'Frameworks', items: ['Next.js', 'React', 'Solana', 'Three.js', 'Django', 'TailwindCSS'] },
          { icon: <Languages className="w-5 h-5" />, label: 'Languages', items: ['Japanese (native)', 'English', 'Chinese', 'Thai'] },
          { icon: <Briefcase className="w-5 h-5" />, label: 'Business', items: ['Startup management', 'Product development', 'Team leadership', 'Brand strategy'] },
        ]
      },
      philosophy: {
        title: 'Design Philosophy: Zen-Tech',
        text: 'A design philosophy applying Zen garden principles to digital interfaces. "Before placing stones (content), first rake the sand (void)." Embodying the aesthetics of subtraction, meaningful use of Ma (space), and the belief that "in silence, information stands out."',
        principles: [
          'Subtraction over Addition — Strip away the unnecessary, show only the essence',
          'Ma (間) — Whitespace is not empty, it is meaningful silence',
          'Obsidian & Gold — Dark canvas, gold accents guide the eye',
          'Resonance over Optimization — Technology that echoes with human emotion',
        ]
      },
      projects: {
        title: 'Projects',
        items: [
          { name: 'Culture OS', desc: 'Open framework integrating Japanese traditional aesthetics into digital technology', url: '' },
          { name: 'Matsuri Platform', desc: 'Next-gen digital platform for authentic Japanese cultural experiences', url: 'https://matsuri.group/ja' },
          { name: 'Jon & Coo Inc.', desc: 'Technology company developing Culture OS and related projects', url: 'https://www.jonandcoo.jp/ja' },
          { name: 'The J-Times', desc: 'Global media outlet on technology, design, and Japanese culture', url: 'https://www.j-times.org/' },
          { name: 'Matsuri DAO', desc: 'Solana-based DAO preserving Japanese culture via MTC token', url: 'https://www.matsuri-dao.com' },
        ]
      },
      quote: '"Are you living someone else\'s script?"'
    }
  }
};

const AboutView: React.FC<AboutViewProps> = ({ onBack, lang = 'ja' }) => {
  const t = lang === 'en' ? content.en : content.ja;

  return (
    <main className="min-h-screen bg-obsidian text-white font-sans noise-overlay">
      {/* Header */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full px-6 py-5 md:px-12 z-50 flex items-center gap-6 bg-obsidian/80 backdrop-blur-xl border-b border-white/5"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm font-mono"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">BACK</span>
        </button>
        <h1 className="font-serif text-lg text-white/80">{t.title}</h1>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-24">
        {/* Hero */}
        <motion.header {...fadeIn} className="mb-20">
          <p className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-4">
            Official Profile
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight mb-6 leading-tight">
            {t.title}
          </h2>
          <p className="text-sm font-mono text-white/40 mb-8">{t.subtitle}</p>
          <div className="flex items-center gap-3 text-white/50 text-sm mb-8">
            <MapPin className="w-4 h-4 text-gold/60" />
            <span>Shinjuku, Tokyo, Japan</span>
          </div>
          <p className="text-white/80 text-lg leading-relaxed font-serif max-w-3xl">
            {t.intro}
          </p>
        </motion.header>

        {/* Quote */}
        <motion.blockquote
          {...fadeIn}
          transition={{ delay: 0.1 }}
          className="border-l-2 border-gold/50 pl-6 py-4 mb-20"
        >
          <p className="font-serif italic text-2xl md:text-3xl text-white/70 leading-relaxed">
            {t.sections.quote}
          </p>
        </motion.blockquote>

        {/* Timeline */}
        <motion.section {...fadeIn} transition={{ delay: 0.15 }} className="mb-20">
          <h3 className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-3">
            {t.sections.background.title}
          </h3>
          <div className="h-px w-12 bg-gold/30 mb-10" />
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/20 via-gold/10 to-transparent" aria-hidden="true" />
            <div className="space-y-0">
              {t.sections.background.items.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex gap-6 py-4 group"
                >
                  {/* Year + dot */}
                  <div className="flex items-start gap-3 shrink-0">
                    <span className="font-mono text-sm text-gold/50 w-12 text-right pt-0.5">
                      {item.year}
                    </span>
                    <div className="relative mt-2">
                      <div className="w-2 h-2 rounded-full bg-gold/30 group-hover:bg-gold group-hover:shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300" />
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/90 transition-colors pt-0.5">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section {...fadeIn} transition={{ delay: 0.2 }} className="mb-20">
          <h3 className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-3">
            {t.sections.skills.title}
          </h3>
          <div className="h-px w-12 bg-gold/30 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.sections.skills.categories.map((cat) => (
              <div
                key={cat.label}
                className="p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold/60">{cat.icon}</span>
                  <h4 className="text-sm font-mono text-white/60 uppercase tracking-wide">{cat.label}</h4>
                </div>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="text-white/70 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 bg-gold/40 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Philosophy */}
        <motion.section {...fadeIn} transition={{ delay: 0.25 }} className="mb-20">
          <h3 className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-3">
            {t.sections.philosophy.title}
          </h3>
          <div className="h-px w-12 bg-gold/30 mb-8" />
          <p className="text-white/70 text-base leading-relaxed font-serif mb-8 max-w-3xl">
            {t.sections.philosophy.text}
          </p>
          <div className="space-y-3">
            {t.sections.philosophy.principles.map((p, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-gold/40 font-mono text-xs mt-1 shrink-0">0{i + 1}</span>
                <p className="text-white/60 text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section {...fadeIn} transition={{ delay: 0.3 }} className="mb-20">
          <h3 className="text-xs font-mono text-gold/70 tracking-widest uppercase mb-3">
            {t.sections.projects.title}
          </h3>
          <div className="h-px w-12 bg-gold/30 mb-8" />
          <div className="space-y-4">
            {t.sections.projects.items.map((proj) => (
              <div
                key={proj.name}
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b border-white/5 hover:border-gold/20 transition-colors"
              >
                <h4 className="font-serif text-lg text-white group-hover:text-gold transition-colors shrink-0 sm:w-48">
                  {proj.url ? (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 decoration-gold/30">
                      {proj.name}
                    </a>
                  ) : proj.name}
                </h4>
                <p className="text-white/50 text-sm">{proj.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          {...fadeIn}
          transition={{ delay: 0.35 }}
          className="border-t border-white/5 pt-12 text-center"
        >
          <p className="text-xs font-mono text-white/20 tracking-widest">
            KO TAKAHASHI — SHINJUKU / TOKYO / METAVERSE
          </p>
        </motion.footer>
      </div>
    </main>
  );
};

export default AboutView;
