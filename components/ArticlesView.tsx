'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, ExternalLink, Leaf, FileText, Code2, PenTool, BookOpen } from 'lucide-react';
import { LanguageCode } from '../types';

interface ArticlesViewProps {
  onBack?: () => void;
  initialData?: any;
  onArticleClick?: (articleId: string, isInternal: boolean, url: string) => void;
}

const ArticlesView: React.FC<ArticlesViewProps> = ({ onBack, initialData, onArticleClick }) => {
  const [lang, setLang] = useState<LanguageCode>('ja');
  
  const articlesRaw = initialData?.articles || [];
  
  // Localize
  const articles = articlesRaw.map((a: any) => ({
    ...a,
    title: a.title[lang] || a.title['ja'],
    summary: a.summary[lang] || a.summary['ja']
  }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleCardClick = (articleId: string, isInternal: boolean, url: string) => {
    if (onArticleClick) {
      onArticleClick(articleId, isInternal, url);
    } else {
      if (isInternal) {
        console.log(`Internal navigation to ${articleId}`);
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen w-full bg-obsidian text-white z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Organic Background: Golden Veins */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="veins" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
             <path d="M100 0 C 120 50, 150 50, 200 100 C 150 150, 120 150, 100 200 C 80 150, 50 150, 0 100 C 50 50, 80 50, 100 0 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#veins)" />
          <radialGradient id="fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="0"/>
            <stop offset="100%" stopColor="black" stopOpacity="1"/>
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#fade)"/>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-obsidian to-transparent">
        {onBack ? (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 font-serif italic"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return</span>
          </button>
        ) : (
          <a 
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 font-serif italic"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </a>
        )}
        <button onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')} className="text-xs font-mono text-gold border border-gold/30 px-3 py-1 rounded-full">
          {lang.toUpperCase()}
        </button>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <header className="mb-20 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
             <Leaf className="w-5 h-5 text-gold" />
             <h1 className="font-mono text-xs text-gold tracking-[0.3em] uppercase">Knowledge Garden</h1>
           </div>
           <h2 className="font-serif text-5xl md:text-6xl text-white">Articles & Insights</h2>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article: any) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variants={itemVariants} 
              onClick={() => handleCardClick(article.id, article.platform === 'Internal', article.url)}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/10 pt-8 text-center text-white/30 font-serif italic text-sm">
          <p>Cultivating wisdom, one line at a time.</p>
        </footer>

      </div>
    </motion.div>
  );
};

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform) {
    case 'Internal': return <BookOpen className="w-4 h-4" />;
    case 'Note': return <PenTool className="w-4 h-4" />;
    case 'Zenn': return <Code2 className="w-4 h-4" />;
    case 'Qiita': return <FileText className="w-4 h-4" />;
    default: return <Leaf className="w-4 h-4" />;
  }
};

const ArticleCard: React.FC<{ article: any; variants: Variants; onClick: () => void }> = ({ article, variants, onClick }) => {
  const isInternal = article.platform === 'Internal';
  
  return (
    <motion.div 
      variants={variants}
      onClick={onClick}
      className={`group relative flex flex-col justify-between p-8 bg-white/[0.02] border backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 rounded-sm cursor-pointer ${isInternal ? 'border-gold/30 hover:border-gold hover:bg-gold/[0.05]' : 'border-white/5 hover:border-gold/40'}`}
    >
      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-8 h-8 -translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 rounded-bl-3xl ${isInternal ? 'bg-gold/30' : 'bg-gold/10'}`}></div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <span className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest border px-2 py-1 rounded-full ${isInternal ? 'text-gold border-gold/40 bg-gold/10' : 'text-gold/80 border-gold/20 bg-gold/5'}`}>
             <PlatformIcon platform={article.platform} />
             {article.platform}
          </span>
          <span className="text-xs text-white/30 font-serif italic">{article.date}</span>
        </div>

        <h3 className="font-serif text-2xl text-white mb-4 leading-tight group-hover:text-gold transition-colors duration-300">
          {article.title}
        </h3>
        
        <p className="text-sm text-white/60 leading-relaxed font-light line-clamp-3 mb-6">
          {article.summary}
        </p>
      </div>

      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-wrap gap-2">
           {article.tags.map((tag: string) => (
             <span key={tag} className="text-[10px] text-white/30 uppercase tracking-wider">#{tag}</span>
           ))}
        </div>
        {isInternal ? (
          <BookOpen className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors duration-300" />
        ) : (
          <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors duration-300" />
        )}
      </div>
    </motion.div>
  );
}

export default ArticlesView;