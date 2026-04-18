export type LanguageCode = 'ja' | 'en' | 'zh' | 'ko' | 'th';

export type CategoryType = 'Business' | 'Tech' | 'Visual' | 'Personal' | 'Corporate' | 'Platform' | 'Media' | 'DAO';

export interface SocialLink {
  platform: string;
  url: string;
  category: CategoryType;
  iconName?: string;
  id?: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  location?: string;
  ogImage?: string;
  twitterId?: string;
}

// --- Data model types ---

export interface MultiLangText {
  ja: string;
  en: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

// Articles
export interface ArticleMeta {
  id: string;
  title: MultiLangText;
  summary: MultiLangText;
  platform: 'Qiita' | 'Zenn' | 'Note' | 'Medium' | 'Dev.to' | 'Internal';
  url: string;
  date: string;
  tags: string[];
}

export interface ArticlesData {
  meta: Record<LanguageCode, PageMeta>;
  articles: ArticleMeta[];
}

// Blog Posts (internal full articles)
export type ContentBlockType = 'h2' | 'p' | 'quote' | 'list' | 'code' | 'image';

export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

export interface BlogPostContent {
  title: string;
  description: string;
  content: ContentBlock[];
}

export interface BlogPost {
  id: string;
  ja: BlogPostContent;
  en: BlogPostContent;
}

export interface BlogPostsData {
  posts: BlogPost[];
}

// Schedule
export interface ScheduleEvent {
  id: string;
  date: string;
  title: MultiLangText;
  description: MultiLangText;
  location: string;
  status: 'upcoming' | 'past';
  tags: string[];
  link?: string;
}

export interface ScheduleData {
  meta: Record<LanguageCode, PageMeta>;
  events: ScheduleEvent[];
}

// Story
export interface StorySection {
  id: string;
  title: string;
  jpTitle: string;
  content: string;
  image: string;
  imageCaption: string;
}

export interface StoryLangData {
  meta: PageMeta;
  header: { bg_text: string; title: string };
  sections: StorySection[];
  footer: string;
}

export interface StoryData {
  ja: StoryLangData;
  en: StoryLangData;
}

// i18n
export interface TranslationData {
  meta_title: string;
  meta_description: string;
  hero_name: string;
  hero_name_sub: string;
  hero_role_titles: string;
  hero_catchphrase: string;
  hero_subcatchphrase: string;
  section_about: string;
  section_ventures: string;
  bio_text: string;
  official_portfolio: string;
  categories: Record<string, string>;
  companies: Record<string, { description: string; operated_by: string }>;
  footer_designed_by: string;
}