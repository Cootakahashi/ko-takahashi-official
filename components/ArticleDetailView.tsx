import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { LanguageCode, BlogPostContent, ArticleMeta } from '../types';

interface ArticleDetailViewProps {
  post: BlogPostContent | null;
  meta: ArticleMeta | null;
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

  const dateISO = meta?.date?.replace(/\./g, '-') || '';

  // Article JSON-LD for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "@id": "https://ko-takahashi.com/#person",
      "name": "高橋 高",
      "url": "https://ko-takahashi.com"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://ko-takahashi.com/#organization",
      "name": "Jon & Coo Inc."
    },
    "datePublished": dateISO,
    "dateModified": dateISO,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ko-takahashi.com/articles`
    },
    "inLanguage": lang,
    "keywords": meta?.tags?.join(', ') || ''
  };

  return (
    <motion.div
      className="relative min-h-screen w-full bg-obsidian text-white z-50 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Article Schema */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50" aria-hidden="true">
        <motion.div
          className="h-full bg-gold"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center bg-gradient-to-b from-obsidian via-obsidian/90 to-transparent backdrop-blur-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 font-serif italic focus-visible:ring-2 focus-visible:ring-gold/60"
          aria-label="Back to articles"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Articles</span>
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-32">
        {/* Article Header */}
        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            {meta?.tags?.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gold border border-gold/20 px-2 py-1 rounded-full">
                <Tag className="w-3 h-3" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-white/40 font-mono">
            <time className="flex items-center gap-2" dateTime={dateISO}>
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {meta?.date}
            </time>
            <span aria-hidden="true">|</span>
            <span>高橋高 / Ko Takahashi</span>
          </div>
        </header>

        {/* Article Body — semantic article element with itemprop */}
        <article className="space-y-12" itemScope itemType="https://schema.org/Article">
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="author" content="高橋高" />
          <div itemProp="articleBody">
            {post.content.map((block, index: number) => {
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
                      <img src={block.src} alt={block.alt || ""} className="w-full rounded border border-white/10" loading="lazy" />
                    </figure>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </article>

        {/* Post Footer */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center">
           <button
             type="button"
             onClick={onBack}
             className="inline-block p-4 border border-gold/30 rounded-full hover:border-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold/60"
             aria-label="Back to articles"
           >
             <span className="font-serif italic text-gold text-2xl">End of Scroll</span>
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleDetailView;
