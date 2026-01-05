'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { LanguageCode } from '../types';
import SmartImage from './SmartImage';

interface StoryViewProps {
  onBack?: () => void;
  initialData?: any; 
}

const StoryView: React.FC<StoryViewProps> = ({ onBack, initialData }) => {
  const [lang, setLang] = useState<LanguageCode>('ja');
  
  const content = initialData?.[lang] || initialData?.['ja'];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.0, ease: "easeInOut" }
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  if (!content) {
    return <div className="text-white p-10 font-mono">Loading Data...</div>;
  }

  return (
    <motion.div 
      className="relative min-h-screen w-full bg-obsidian text-white z-50 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none bg-ink-wash opacity-80 z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-obsidian/80 to-transparent backdrop-blur-[2px]">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* Cinematic Header */}
        <header className="mb-32 md:mb-48 text-center relative py-20">
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 0.05 }} 
             transition={{ duration: 3 }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-jp font-bold text-white pointer-events-none select-none blur-sm whitespace-nowrap"
           >
             {content.header.bg_text}
           </motion.div>
           
           <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 1 }}
             className="font-serif text-5xl md:text-8xl mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold-light to-white"
           >
             {content.header.title}
           </motion.h1>
           
           <motion.div 
             initial={{ scaleY: 0 }}
             animate={{ scaleY: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="h-32 w-[1px] bg-gradient-to-b from-gold to-transparent mx-auto mt-8"
           />
        </header>

        {/* Editorial Sections */}
        <div className="space-y-48">
          {content.sections.map((section: any, index: number) => (
            <motion.section 
              key={section.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className={`flex flex-col gap-12 items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              
              {/* Image Block */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="overflow-hidden rounded-sm border border-white/5 bg-white/5">
                  <SmartImage
                    src={section.image}
                    fallbackKey={section.id} // Matches 'origin', 'philosophy', 'vision'
                    alt={section.title}
                    motionProps={{ variants: imageVariants }}
                    className="w-full h-[50vh] lg:h-[70vh] object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                {section.imageCaption && (
                  <p className="absolute -bottom-8 left-0 text-xs font-mono text-gold/40 tracking-widest uppercase">
                    Fig.0{index + 1} — {section.imageCaption}
                  </p>
                )}
                
                {/* Decorative floating title for Image */}
                <h2 className="absolute -top-10 -left-10 text-8xl font-jp font-bold text-white/5 pointer-events-none z-0 hidden lg:block">
                  {section.jpTitle}
                </h2>
              </div>

              {/* Text Block */}
              <div className="w-full lg:w-1/2 lg:px-12 relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <span className="h-px w-12 bg-gold"></span>
                    <span className="text-gold text-xs tracking-[0.3em] uppercase">Chapter 0{index + 1}</span>
                 </div>
                 
                 <h3 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
                   {section.title}
                 </h3>
                 
                 <p className="font-serif text-lg md:text-xl text-white/70 leading-relaxed text-justify">
                   {section.content}
                 </p>
              </div>

            </motion.section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-48 mb-24 text-center">
          <p className="text-white/40 font-serif italic text-lg mb-8">{content.footer}</p>
          <div className="w-2 h-2 bg-gold rounded-full mx-auto animate-pulse"></div>
        </footer>

      </div>
    </motion.div>
  );
};

export default StoryView;