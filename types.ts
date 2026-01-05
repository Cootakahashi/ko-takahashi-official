export type LanguageCode = 'ja' | 'en' | 'zh' | 'ko' | 'th';

export interface SocialLink {
  platform: string;
  url: string;
  category: 'Business' | 'Tech' | 'Visual' | 'Personal' | 'Corporate' | 'Platform' | 'Media';
  iconName?: string;
  id?: string; // key for translation lookup
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
}