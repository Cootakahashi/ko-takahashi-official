'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Map, ArrowRight } from 'lucide-react';

interface BentoCardData {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleJa: string;
  description: string;
  story: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
}

const cardData: BentoCardData[] = [
  {
    id: 'fall',
    icon: <Heart className="w-8 h-8" />,
    title: 'The Fall',
    titleJa: '転落',
    description: 'すべてを失った23歳',
    story: '20歳でペントハウスに住んでいた。60人を率いていた。でも、それはただのエゴだった。23歳で全てが崩壊した時、初めて本当の自分と向き合った。',
    gradientFrom: 'from-rose-950/40',
    gradientTo: 'to-amber-950/20',
    accentColor: 'text-rose-400',
  },
  {
    id: 'silence',
    icon: <BookOpen className="w-8 h-8" />,
    title: 'The Silence',
    titleJa: '沈黙',
    description: '7年間の学びの日々',
    story: '誰とも会わず、ただ学び続けた。言葉を、コードを、歴史を。それは世界ともう一度繋がるための準備だった。',
    gradientFrom: 'from-slate-950/40',
    gradientTo: 'to-blue-950/20',
    accentColor: 'text-blue-400',
  },
  {
    id: 'rebirth',
    icon: <Map className="w-8 h-8" />,
    title: 'The Vision',
    titleJa: '約束',
    description: '本当の日本を届ける',
    story: '観光客として消費するのではなく、探求者として触れてほしい。路地裏の熱気、地元の人との台本のない会話。それが私が届けたいもの。',
    gradientFrom: 'from-emerald-950/40',
    gradientTo: 'to-teal-950/20',
    accentColor: 'text-emerald-400',
  },
];

interface FlipCardProps {
  card: BentoCardData;
  index: number;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative h-[380px] perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Face */}
        <div
          className={`absolute inset-0 rounded-lg border border-white/10 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} backdrop-blur-xl p-8 flex flex-col`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Icon */}
          <div className={`${card.accentColor} mb-6 opacity-80`}>
            {card.icon}
          </div>
          
          {/* Title */}
          <h3 className="font-serif text-3xl text-white mb-2">{card.title}</h3>
          <p className="font-jp text-lg text-white/60 mb-4">{card.titleJa}</p>
          
          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed flex-grow font-serif">
            {card.description}
          </p>
          
          {/* Flip indicator */}
          <div className="flex items-center gap-2 mt-6 text-white/30 text-xs">
            <span className="font-serif italic">続きを読む</span>
            <ArrowRight className="w-3 h-3 animate-pulse" />
          </div>
        </div>

        {/* Back Face - Story */}
        <div
          className={`absolute inset-0 rounded-lg border border-white/10 bg-gradient-to-br ${card.gradientTo} ${card.gradientFrom} backdrop-blur-xl p-8 flex flex-col justify-center`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Story */}
          <p className="text-white/90 text-lg leading-relaxed font-serif italic">
            "{card.story}"
          </p>
          
          {/* Divider */}
          <div className={`h-px w-16 bg-gradient-to-r ${card.accentColor.replace('text-', 'from-')} to-transparent mt-8`} />
        </div>
      </motion.div>
    </motion.div>
  );
};

interface HybridBentoGridProps {
  t?: any;
}

const HybridBentoGrid: React.FC<HybridBentoGridProps> = ({ t }) => {
  return (
    <section className="mb-32" aria-labelledby="journey-title">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-xs font-mono text-amber-500/80 mb-4 tracking-widest uppercase"
        >
          私の物語
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          id="journey-title"
          className="text-3xl md:text-5xl font-serif text-white tracking-tight"
        >
          3つの<span className="text-amber-400 italic font-light">転機</span>
        </motion.h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <FlipCard key={card.id} card={card} index={index} />
        ))}
      </div>
      
      {/* Bottom message */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-white/40 font-serif italic text-sm mt-12"
      >
        "落ちて、学んで、生まれ変わった"
      </motion.p>
    </section>
  );
};

export default HybridBentoGrid;
