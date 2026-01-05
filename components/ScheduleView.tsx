'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, MapPin, ExternalLink, Calendar, CircleDot } from 'lucide-react';
import { LanguageCode } from '../types';

interface ScheduleViewProps {
  onBack?: () => void;
  initialData?: any;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ onBack, initialData }) => {
  const [lang, setLang] = useState<LanguageCode>('ja');
  
  const events = initialData?.events || [];
  
  // Transform data for current language
  const localizedEvents = events.map((e: any) => ({
    ...e,
    title: e.title[lang] || e.title['ja'] || e.title,
    description: e.description[lang] || e.description['ja'] || e.description
  }));

  const upcomingEvents = localizedEvents.filter((e: any) => e.status === 'upcoming');
  const pastEvents = localizedEvents.filter((e: any) => e.status === 'past');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen w-full bg-obsidian text-white z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <header className="mb-20">
           <h1 className="font-mono text-xs text-gold mb-2 tracking-[0.3em] uppercase">System Timeline</h1>
           <h2 className="font-serif text-5xl md:text-6xl text-white">The Grid</h2>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* Upcoming Section */}
          <section>
            <div className="flex items-center gap-4 mb-12">
               <CircleDot className="w-4 h-4 text-gold animate-pulse" />
               <h3 className="text-xl font-serif text-white">Incoming Data</h3>
               <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="grid gap-6">
              {upcomingEvents.map((event: any) => (
                <EventCard key={event.id} event={event} variants={itemVariants} />
              ))}
            </div>
          </section>

          {/* Past Section */}
          <section className="opacity-60 grayscale-[0.5]">
             <div className="flex items-center gap-4 mb-12">
               <div className="w-2 h-2 rounded-full bg-white/20"></div>
               <h3 className="text-xl font-serif text-white/60">Archived Logs</h3>
               <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="grid gap-6">
              {pastEvents.map((event: any) => (
                <EventCard key={event.id} event={event} variants={itemVariants} />
              ))}
            </div>
          </section>

        </motion.div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/10 pt-8 text-center text-white/30 font-mono text-xs">
          <p>DATA_END_OF_STREAM</p>
        </footer>

      </div>
    </motion.div>
  );
};

const EventCard: React.FC<{ event: any; variants: Variants }> = ({ event, variants }) => {
  return (
    <motion.div 
      variants={variants}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-12 p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.04]"
    >
      {/* Date Column */}
      <div className="md:w-48 shrink-0 flex flex-col justify-start">
        <div className="flex items-center gap-2 text-gold font-mono text-sm tracking-widest mb-2">
          <Calendar className="w-3 h-3" />
          {event.date}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {event.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] uppercase border border-white/10 px-2 py-1 text-white/40">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-1">
        <h4 className="text-2xl font-serif mb-3 text-white group-hover:text-gold transition-colors duration-300">
          {event.title}
        </h4>
        <p className="text-white/60 leading-relaxed mb-6 font-light">
          {event.description}
        </p>
        
        <div className="flex items-center gap-6 text-xs font-mono text-white/40">
           <div className="flex items-center gap-2">
             <MapPin className="w-3 h-3" />
             {event.location}
           </div>
           {event.link && (
             <a 
               href={event.link} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-white transition-colors"
             >
               <ExternalLink className="w-3 h-3" />
               LINK
             </a>
           )}
        </div>
      </div>
    </motion.div>
  );
}

export default ScheduleView;