import { SiteMetadata, SocialLink } from './types';

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
  ogImage: "https://picsum.photos/1200/630", // Placeholder, ideally should be a real OGP image
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
    url: "https://www.linkedin.com/in/YOUR_CUSTOM_ID_HERE",
    category: "Business",
    iconName: "linkedin"
  },
  {
    platform: "GitHub",
    url: "https://github.com/Cootakahashi",
    category: "Tech",
    iconName: "github"
  },
  {
    platform: "Qiita",
    url: "https://qiita.com/rustprogram2022",
    category: "Tech",
    iconName: "code"
  },
  {
    platform: "Zenn",
    url: "https://zenn.dev/rust_start",
    category: "Tech",
    iconName: "terminal"
  },
  {
    platform: "Note",
    url: "https://note.com/ko_takahashi",
    category: "Visual",
    iconName: "pen-tool"
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