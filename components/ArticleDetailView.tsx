import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Share2, Calendar, Tag } from 'lucide-react';
import { LanguageCode } from '../types';

interface Block {
  type: 'h1' | 'h2' | 'p' | 'quote' | 'list' | 'code' | 'image';
  text?: string;
  items?: string[];
  src?: string;
  caption?: string;
}

interface ArticleDetailViewProps {
  post: any; // The specific post data for the current language
  meta: any; // Metadata like date, tags from the article list
  onBack: () => void;
  lang: LanguageCode;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ post, meta, onBack, lang }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  if (!post) return <div className="p-20 text-center text-gold">Post Not Found</div>;

  return (
    <motion.div 
      className="relative min-h-screen w-full bg-obsidian text-white z-50 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Progress Bar (Simple) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-gold"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }} // Simplified scroll indicator simulation
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center bg-gradient-to-b from-obsidian via-obsidian/90 to-transparent backdrop-blur-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 font-serif italic"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Articles</span>
        </button>
        <button className="text-white/50 hover:text-gold transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-32">
        {/* Article Header */}
        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            {meta?.tags?.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold border border-gold/20 px-2 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-white/40 font-mono">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {meta?.date}
            </span>
            <span>|</span>
            <span>Jon & Coo Inc.</span>
          </div>
        </header>

        {/* Article Body */}
        <article className="space-y-12">
          {post.content.map((block: Block, index: number) => {
            switch (block.type) {
              case 'h2':
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-serif text-gold mt-12 mb-6">
                    {block.text}
                  </h2>
                );
              case 'p':
                return (
                  <p key={index} className="text-lg leading-loose text-white/80 font-light font-sans tracking-wide">
                    {block.text}
                  </p>
                );
              case 'quote':
                return (
                  <blockquote key={index} className="border-l-2 border-gold pl-6 py-2 my-8 italic text-xl text-white/60 font-serif">
                    "{block.text}"
                  </blockquote>
                );
              case 'list':
                return (
                  <ul key={index} className="list-disc pl-6 space-y-4 text-white/80 font-light">
                    {block.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              case 'code':
                return (
                  <pre key={index} className="bg-white/5 p-6 rounded border border-white/10 overflow-x-auto my-8">
                    <code className="font-mono text-sm text-gold/80">{block.text}</code>
                  </pre>
                );
              case 'image':
                return (
                  <figure key={index} className="my-12">
                    <img src={block.src} alt={block.caption || ""} className="w-full rounded border border-white/10" />
                    {block.caption && <figcaption className="text-center text-xs text-white/30 mt-2">{block.caption}</figcaption>}
                  </figure>
                );
              default:
                return null;
            }
          })}
        </article>
        
        {/* Post Footer */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center">
           <div className="inline-block p-4 border border-gold/30 rounded-full">
             <span className="font-serif italic text-gold text-2xl">End of Scroll</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleDetailView;