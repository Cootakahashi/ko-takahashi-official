'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, ExternalLink, Heart, ScrollText } from 'lucide-react';

interface CultureOSShowcaseProps {
  t?: Record<string, unknown>;
}

// メインのMatsuri招待カード
const MatsuriInviteCard: React.FC = () => (
  <motion.a
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    href="https://matsuri.group/ja"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Explore Matsuri Platform — Experience real Japan as an explorer"
    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-amber-950/30 via-rose-950/20 to-slate-950/30 p-10 md:p-14 hover:border-amber-500/40 transition-all duration-700 h-full"
  >
    {/* 背景のソフトなパターン */}
    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_30%,_#FFA07A_0%,_transparent_50%)]" />
    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_70%_70%,_#87CEEB_0%,_transparent_50%)]" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <Compass className="w-6 h-6 text-amber-400/80" />
        <span className="text-xs font-mono text-amber-400/70 tracking-widest uppercase">Explore Real Japan</span>
      </div>
      
      <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 group-hover:text-amber-400 transition-colors duration-500">
        Matsuri
      </h3>
      
      <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-serif">
        温室のガラスを割って、本当の空気を吸おう。
        <br /><br />
        観光客として消費するのではなく、<span className="text-amber-400/90">探求者として触れてほしい</span>。
        路地裏の熱気、地元の人との台本のない会話。
        それが私の届けたい「リアルな日本」。
      </p>
      
      <div className="flex items-center gap-4 text-white/40 group-hover:text-amber-400 transition-colors">
        <span className="font-serif italic">冒険に出る</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
    
    {/* 装飾的な日本語テキスト */}
    <span className="absolute -bottom-8 -right-8 text-[12rem] font-jp text-white/[0.02] select-none pointer-events-none leading-none">
      祭
    </span>
  </motion.a>
);

// Whitepaper カード
const WhitepaperCard: React.FC = () => (
  <motion.a
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.15 }}
    href="https://www.matsuri-dao.com/docs/intro"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Read the Matsuri DAO whitepaper — Matsuri Coin (MTC) on Solana"
    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-indigo-950/30 to-slate-950/50 p-8 flex flex-col justify-between hover:border-violet-400/40 transition-all duration-500"
  >
    {/* Subtle glow effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.08)_0%,_transparent_70%)]" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <ScrollText className="w-5 h-5 text-violet-400/80" />
        <span className="text-xs font-mono text-violet-400/70 tracking-widest uppercase">Matsuri DAO</span>
      </div>
      
      <h4 className="font-serif text-xl text-white mb-3 group-hover:text-violet-300 transition-colors duration-500">Whitepaper</h4>
      
      <p className="text-white/50 text-sm leading-relaxed font-serif">
        Matsuri Coin (MTC) — 文化を通貨に。
        Solana上で日本文化を守るトークン。
      </p>
    </div>
    
    <div className="flex items-center gap-2 text-white/30 group-hover:text-violet-400 transition-colors text-xs font-mono mt-6">
      <span>READ WHITEPAPER</span>
      <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
    </div>
    
    {/* 装飾的テキスト */}
    <span className="absolute -bottom-4 -right-4 text-[8rem] font-jp text-white/[0.02] select-none pointer-events-none leading-none">
      幣
    </span>
  </motion.a>
);

// 仲間たちカード
const TeamCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-8 flex flex-col justify-between"
  >
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-5 h-5 text-blue-400/80" />
        <span className="text-xs font-mono text-blue-400/70 tracking-widest uppercase">Jon & Coo</span>
      </div>
      
      <h4 className="font-serif text-xl text-white mb-3">一人じゃない</h4>
      
      <p className="text-white/50 text-sm leading-relaxed font-serif">
        多様なバックグラウンドを持つ仲間たちと、
        新しい日本の姿を世界に届けている。
      </p>
    </div>
    
    <a 
      href="https://www.jonandcoo.jp/ja"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Meet the Jon & Coo team"
      className="flex items-center gap-2 text-white/40 hover:text-blue-400 transition-colors text-xs font-mono mt-6"
    >
      <span>MEET THE TEAM</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  </motion.div>
);

// ストーリーを読むカード
const StoryLinkCard: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    onClick={onNavigate}
    aria-label="Read the full story of Ko Takahashi"
    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-rose-950/30 to-slate-950/50 p-8 flex flex-col justify-between text-left hover:border-rose-400/40 transition-all duration-500"
  >
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-5 h-5 text-rose-400/80" />
        <span className="text-xs font-mono text-rose-400/70 tracking-widest uppercase">My Story</span>
      </div>
      
      <h4 className="font-serif text-xl text-white mb-3">全てを読む</h4>
      
      <p className="text-white/50 text-sm leading-relaxed font-serif">
        転落から再生まで。
        台本のない人生の物語。
      </p>
    </div>
    
    <div className="flex items-center gap-2 text-white/30 group-hover:text-rose-400 transition-colors text-xs font-mono mt-6">
      <span>READ FULL STORY</span>
      <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.button>
);

const CultureOSShowcase: React.FC<CultureOSShowcaseProps> = ({ t }) => {
  return (
    <section className="mb-32" aria-labelledby="vision-title">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-xs font-mono text-rose-400/80 mb-4 tracking-widest uppercase"
        >
          あなたへの約束
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          id="vision-title"
          className="text-3xl md:text-5xl font-serif text-white tracking-tight"
        >
          私が<span className="text-amber-400 italic font-light">届けたいもの</span>
        </motion.h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <MatsuriInviteCard />
        </div>
        <div className="flex flex-col gap-6">
          <WhitepaperCard />
          <TeamCard />
          <StoryLinkCard />
        </div>
      </div>
    </section>
  );
};

export default CultureOSShowcase;
