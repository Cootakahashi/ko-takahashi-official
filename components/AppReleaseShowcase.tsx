'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { LanguageCode } from '../i18n';

interface AppRelease {
  id: 'matsuri' | 'j_times';
  title: string;
  subtitle: string;
  jpChar: string;
  appStoreUrl: string;
  tagline: Record<LanguageCode, string>;
  accent: 'amber' | 'emerald';
}

const apps: AppRelease[] = [
  {
    id: 'matsuri',
    title: 'Matsuri',
    subtitle: '祭 — Real Japan, on demand.',
    jpChar: '祭',
    appStoreUrl: 'https://apps.apple.com/us/app/matsuri-%E7%A5%AD/id6761138366',
    tagline: {
      ja: '本当の日本を、探求者として歩く。観光客のためではなく、本物に触れたい人のためのアプリ。',
      en: 'Walk the real Japan as an explorer. For people who want to touch the authentic — not the brochure.',
      zh: '以探索者的身份漫步真实的日本。专为渴望触摸真实的人而生。',
      ko: '진짜 일본을, 탐험자의 시선으로. 진짜를 만지고 싶은 사람을 위한 앱.',
      th: 'เดินทางสำรวจญี่ปุ่นที่แท้จริงในแบบของนักสำรวจ — สำหรับผู้ที่ต้องการสัมผัสของจริง',
    },
    accent: 'amber',
  },
  {
    id: 'j_times',
    title: 'The J-Times',
    subtitle: '日本から世界へ、本物のニュースを。',
    jpChar: '報',
    appStoreUrl: 'https://apps.apple.com/us/app/j-times/id6761513732',
    tagline: {
      ja: '日本から、世界に届けるニュース。テンプレートでは語れない、リアルな日本の声。',
      en: 'News from Japan, voiced to the world. The real Japan, beyond the templates.',
      zh: '从日本传向世界的新闻。模板之外，真实的日本之声。',
      ko: '일본에서 세계로 전하는 뉴스. 템플릿 너머의 진짜 일본의 목소리.',
      th: 'ข่าวสารจากญี่ปุ่นสู่โลก — เสียงที่แท้จริงของญี่ปุ่นที่ไม่มีในแม่แบบ',
    },
    accent: 'emerald',
  },
];

const labels: Record<LanguageCode, {
  badge: string;
  available: string;
  download: string;
  newLabel: string;
  headline: React.ReactNode;
  subhead: string;
}> = {
  ja: {
    badge: 'NEW RELEASE',
    available: 'App Store にて配信中',
    download: 'App Store で入手',
    newLabel: 'NEW',
    headline: <>iOS、<span className="text-gold italic font-light">配信開始。</span></>,
    subhead: '二つの新しいアプリ、いまあなたのポケットへ。',
  },
  en: {
    badge: 'NEW RELEASE',
    available: 'Now on the App Store',
    download: 'Get it on the App Store',
    newLabel: 'NEW',
    headline: <>Now on <span className="text-gold italic font-light">iOS.</span></>,
    subhead: 'Two new apps. Straight to your pocket.',
  },
  zh: {
    badge: 'NEW RELEASE',
    available: 'App Store 现已上线',
    download: 'App Store 下载',
    newLabel: 'NEW',
    headline: <>登陆 <span className="text-gold italic font-light">iOS。</span></>,
    subhead: '两款新应用，现已抵达你的口袋。',
  },
  ko: {
    badge: 'NEW RELEASE',
    available: 'App Store에서 만나보세요',
    download: 'App Store에서 다운로드',
    newLabel: 'NEW',
    headline: <>이제 <span className="text-gold italic font-light">iOS에서.</span></>,
    subhead: '두 개의 새로운 앱, 당신의 주머니로.',
  },
  th: {
    badge: 'NEW RELEASE',
    available: 'มีให้บริการบน App Store',
    download: 'ดาวน์โหลดบน App Store',
    newLabel: 'NEW',
    headline: <>เปิดตัวบน <span className="text-gold italic font-light">iOS</span></>,
    subhead: 'สองแอปใหม่ — พร้อมในกระเป๋าคุณ',
  },
};

const AppleGlyph: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 384 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const accentTheme = {
  amber: {
    gradient: 'from-amber-950/40 via-rose-950/20 to-slate-950/40',
    border: 'hover:border-amber-400/40',
    glow: 'group-hover:shadow-[0_0_60px_rgba(245,158,11,0.08)]',
    title: 'group-hover:text-amber-300',
    ctaBorder: 'group-hover:border-amber-400/60',
    ctaBg: 'group-hover:bg-amber-400/10',
    dot: 'bg-amber-400',
    iconBg: 'bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent',
    iconBorder: 'border-amber-400/30',
    radial: 'bg-[radial-gradient(circle_at_20%_20%,_rgba(251,191,36,0.10)_0%,_transparent_60%)]',
  },
  emerald: {
    gradient: 'from-emerald-950/40 via-teal-950/20 to-slate-950/40',
    border: 'hover:border-emerald-400/40',
    glow: 'group-hover:shadow-[0_0_60px_rgba(16,185,129,0.08)]',
    title: 'group-hover:text-emerald-300',
    ctaBorder: 'group-hover:border-emerald-400/60',
    ctaBg: 'group-hover:bg-emerald-400/10',
    dot: 'bg-emerald-400',
    iconBg: 'bg-gradient-to-br from-emerald-400/20 via-teal-500/10 to-transparent',
    iconBorder: 'border-emerald-400/30',
    radial: 'bg-[radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.10)_0%,_transparent_60%)]',
  },
};

interface AppCardProps {
  app: AppRelease;
  lang: LanguageCode;
  delay: number;
  label: typeof labels.ja;
}

const AppCard: React.FC<AppCardProps> = ({ app, lang, delay, label }) => {
  const theme = accentTheme[app.accent];
  return (
    <motion.a
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      href={app.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label.download} — ${app.title}`}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${theme.gradient} backdrop-blur-sm p-8 md:p-10 transition-all duration-700 ${theme.border} ${theme.glow} h-full flex flex-col justify-between min-h-[420px]`}
    >
      {/* Soft radial accent */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${theme.radial}`} aria-hidden="true" />

      {/* NEW pulse badge */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-black/50 backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.dot} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${theme.dot}`} />
        </span>
        <span className="text-[9px] font-mono tracking-[0.25em] text-white/80 uppercase">{label.newLabel}</span>
      </div>

      {/* Decorative kanji watermark */}
      <span className="absolute -bottom-16 -right-10 text-[16rem] font-jp text-white/[0.03] select-none pointer-events-none leading-none">
        {app.jpChar}
      </span>

      {/* Header / Icon tile */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl border ${theme.iconBorder} ${theme.iconBg} backdrop-blur-sm shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]`}>
            <AppleGlyph className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase">iOS · App Store</span>
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-0.5">{label.available}</span>
          </div>
        </div>

        <h3 className={`font-serif text-4xl md:text-5xl text-white mb-3 transition-colors duration-500 ${theme.title}`}>
          {app.title}
        </h3>
        <p className="font-jp text-sm text-white/40 tracking-wide mb-6">{app.subtitle}</p>

        <p className="font-serif text-base md:text-lg text-white/70 leading-relaxed max-w-md">
          {app.tagline[lang] || app.tagline.en}
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-10">
        <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-md border border-white/15 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ${theme.ctaBorder} ${theme.ctaBg}`}>
          <AppleGlyph className="w-4 h-4 text-white/90" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/85">{label.download}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="w-4 h-4 text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
          />
        </div>
      </div>
    </motion.a>
  );
};

interface AppReleaseShowcaseProps {
  lang: LanguageCode;
}

const AppReleaseShowcase: React.FC<AppReleaseShowcaseProps> = ({ lang }) => {
  const label = labels[lang] || labels.en;

  return (
    <section className="mb-32" aria-labelledby="ios-release-title">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.08)]"
        >
          <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] font-mono text-gold tracking-[0.35em] uppercase">{label.badge}</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          id="ios-release-title"
          className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-5"
        >
          {label.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="text-sm md:text-base text-white/40 font-serif italic"
        >
          {label.subhead}
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className="h-px bg-gold/60 mx-auto mt-8 shadow-[0_0_10px_#D4AF37]"
          aria-hidden="true"
        />
      </div>

      {/* App Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app, i) => (
          <AppCard key={app.id} app={app} lang={lang} delay={0.15 * i} label={label} />
        ))}
      </div>
    </section>
  );
};

export default AppReleaseShowcase;
