import { SiteMetadata, SocialLink } from './types';

/**
 * このサイトの正規URL。**ここだけを変えれば全体が追随する。**
 *
 * 🔴 2026-08-31 まで、canonical と og:url が `https://ko-takahashi.com` を
 * 指していた。実測するとあれは **別人（高橋功さん）の Apache 製サイト**で、
 * こちらの所有ではない。外部ドメインを canonical に指定するのは
 * 「このページの正体はそちらです」と検索エンジンに申告することであり、
 * 自分を検索結果から降ろす行為だった。
 *
 * 本番は Vercel 配信の https://www.ko-takahashi.jp（apex は www へ 307）。
 */
import { SITE_URL } from './lib/siteMeta.mjs';
export { SITE_URL };
// 🔴 2026-09-12: ここにも同じ文字列を持っていた（lib/siteMeta.mjs と二重定義）。
//    片方だけ直ると canonical と sitemap が別のドメインを名乗る。定義は siteMeta.mjs の 1 行だけ。
//    scripts/seo-guard.mjs が「ko-takahashi.* の絶対 URL 直書き」をソースから落とす。

/** 末尾スラッシュを付けずに絶対URLを組み立てる。 */
export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '') || SITE_URL;

// Default metadata (JA SEO optimized)
export const siteMetadata: SiteMetadata = {
  title: "高橋 高 (Ko Takahashi) | Official Portfolio",
  description: "起業家・哲学者、高橋高の公式ポートフォリオ。Culture OS、Matsuri Platformの開発者。静謐な美意識と論理的思考で、テクノロジーと日本文化の融合を追求する。新宿を拠点に世界へ。",
  keywords: [
    "高橋高", 
    "高橋 高", 
    "Ko Takahashi", 
    "Shinjuku",
    "新宿",
    "Culture OS", 
    "Matsuri Platform",
    "Engineer",
    "Entrepreneur",
    "Next.js",
    "Python",
    "Design"
  ],
  location: "Shinjuku, Tokyo, Japan",
  ogImage: `${SITE_URL}/ko/og-image.jpg`,
  twitterId: "@zes55ch"
};

// Primary Company/Project Links (Remains as his work)
export const companyLinks: SocialLink[] = [
  {
    platform: "Jon & Coo Inc.",
    url: "https://www.jonandcoo.jp/ja",
    category: "Corporate",
    iconName: "building",
    id: "jon_coo"
  },
  {
    platform: "Matsuri Platform",
    url: "https://matsuri.group/ja",
    category: "Platform",
    iconName: "layers",
    id: "matsuri"
  },
  {
    platform: "Matsuri DAO",
    url: "https://www.matsuri-dao.com",
    category: "DAO",
    iconName: "scroll",
    id: "matsuri_dao"
  },
  {
    platform: "The J-Times",
    url: "https://www.j-times.org/",
    category: "Media",
    iconName: "newspaper",
    id: "j_times"
  }
];

// Verified Master List
export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ko-takahashi-jp",
    category: "Business",
    iconName: "linkedin"
  },
  {
    platform: "Qiita",
    url: "https://qiita.com/rustprogram2022",
    category: "Tech",
    iconName: "file-text"
  },
  {
    platform: "Zenn",
    url: "https://zenn.dev/rust_start",
    category: "Tech",
    iconName: "terminal"
  },
  {
    platform: "Note",
    url: "https://note.com/ko_takahashi_jp",
    category: "Visual",
    iconName: "pen-tool"
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/ko_takahashi_/",
    category: "Visual",
    iconName: "instagram"
  },
  {
    platform: "Medium",
    url: "https://medium.com/@ko_takahashi",
    category: "Business",
    iconName: "layout-list"
  },
  {
    platform: "Dev.to",
    url: "https://dev.to/ko_takahashi",
    category: "Tech",
    iconName: "code-2"
  },
  {
    platform: "X (Twitter)",
    url: "https://x.com/zes55ch",
    category: "Personal",
    iconName: "twitter"
  },
  {
    platform: "Pinterest",
    url: "https://jp.pinterest.com/kotakahashi_japan/",
    category: "Visual",
    iconName: "image"
  }
];