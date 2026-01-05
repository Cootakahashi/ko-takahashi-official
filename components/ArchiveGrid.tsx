import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SocialLink } from '../types';

interface ArchiveGridProps {
  links: SocialLink[];
  t: any;
}

const CategoryBadge: React.FC<{ category: string; label: string }> = ({ category, label }) => {
  const colors = {
    Business: 'text-blue-200 border-blue-900 bg-blue-950/30',
    Tech: 'text-emerald-200 border-emerald-900 bg-emerald-950/30',
    Visual: 'text-purple-200 border-purple-900 bg-purple-950/30',
    Personal: 'text-gray-200 border-gray-800 bg-gray-900/30',
  };

  const style = colors[category as keyof typeof colors] || colors.Personal;

  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${style}`}>
      {label}
    </span>
  );
};

const LinkCard: React.FC<{ link: SocialLink; t: any }> = ({ link, t }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col justify-between p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-1"
  >
    <div className="flex justify-between items-start mb-4">
      <CategoryBadge category={link.category} label={t.categories[link.category] || link.category} />
      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-300" />
    </div>
    
    <div>
      <h3 className="font-serif text-lg text-white/90 group-hover:text-white transition-colors duration-300 tracking-wide">
        {link.platform}
      </h3>
      <p className="text-xs text-white/40 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 truncate">
        {new URL(link.url).hostname}
      </p>
    </div>
  </a>
);

const ArchiveGrid: React.FC<ArchiveGridProps> = ({ links, t }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <LinkCard key={link.url} link={link} t={t} />
      ))}
    </section>
  );
};

export default ArchiveGrid;