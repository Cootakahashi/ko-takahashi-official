'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Briefcase, Languages, Award } from 'lucide-react';

/**
 * SEOSkillsSection
 * キーワード最適化のためのセマンティックHTMLセクション
 * 「高橋高 + スキル名」で検索ヒットを狙う
 */

interface Skill {
  category: string;
  categoryEn: string;
  icon: React.ReactNode;
  items: string[];
}

const skills: Skill[] = [
  {
    category: 'プログラミング言語',
    categoryEn: 'Programming Languages',
    icon: <Code2 className="w-5 h-5" />,
    items: ['Rust', 'Python', 'TypeScript', 'JavaScript', 'Solidity']
  },
  {
    category: 'フレームワーク・技術',
    categoryEn: 'Frameworks & Technologies',
    icon: <Globe className="w-5 h-5" />,
    items: ['Next.js', 'React', 'Node.js', 'Solana', 'Three.js', 'TailwindCSS']
  },
  {
    category: '言語能力',
    categoryEn: 'Languages',
    icon: <Languages className="w-5 h-5" />,
    items: ['日本語 (Native)', 'English', '中国語', 'ไทย (Thai)']
  },
  {
    category: '経営・ビジネス',
    categoryEn: 'Business',
    icon: <Briefcase className="w-5 h-5" />,
    items: ['スタートアップ経営', '起業', 'プロダクト開発', 'チームマネジメント']
  }
];

const SEOSkillsSection: React.FC = () => {
  return (
    <section 
      className="mb-24"
      aria-labelledby="skills-title"
      itemScope 
      itemType="https://schema.org/Person"
    >
      {/* 隠しメタデータ（SEO用） */}
      <meta itemProp="name" content="高橋高" />
      <meta itemProp="alternateName" content="Ko Takahashi" />
      <meta itemProp="jobTitle" content="プログラマー・起業家・エンジニア" />
      <meta itemProp="workLocation" content="新宿, 東京" />

      {/* Section Header */}
      <header className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-xs font-mono text-amber-500/80 mb-3 tracking-widest uppercase"
        >
          Skills & Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="skills-title"
          className="text-2xl md:text-4xl font-serif text-white tracking-tight"
        >
          高橋高の<span className="text-amber-400 italic">スキル</span>
        </motion.h2>
      </header>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.article
            key={skill.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
            itemProp="knowsAbout"
          >
            <header className="flex items-center gap-3 mb-4">
              <span className="text-amber-400/70">{skill.icon}</span>
              <h3 className="text-sm font-mono text-white/70 uppercase tracking-wide">
                {skill.category}
              </h3>
            </header>
            
            <ul className="space-y-2">
              {skill.items.map((item) => (
                <li 
                  key={item} 
                  className="text-white/60 text-sm font-serif flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-amber-400/50 rounded-full" />
                  <span itemProp="knowsAbout">{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      {/* SEO Hidden Keywords (for crawlers) */}
      <div className="sr-only" aria-hidden="true">
        <h3>高橋高のプログラミングスキル</h3>
        <p>高橋高はRust、Python、Next.js、TypeScript、Solanaなどのプログラミング技術に精通しています。</p>
        <p>高橋高 プログラミング、高橋高 エンジニア、高橋高 起業家、高橋高 新宿、高橋高 技術、高橋高 Rust、高橋高 Python、高橋高 CEO</p>
        <h3>Ko Takahashi Programming Skills</h3>
        <p>Ko Takahashi is a programmer, entrepreneur, and engineer based in Shinjuku, Tokyo. Expert in Rust, Python, Next.js, and Solana development.</p>
      </div>
    </section>
  );
};

export default SEOSkillsSection;
