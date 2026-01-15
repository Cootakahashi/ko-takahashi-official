import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteMetadata, socialLinks, companyLinks } from '../config';
import { LanguageCode, getTranslation } from '../i18n';

interface SeoProps {
  currentLang?: LanguageCode;
  pageType?: 'home' | 'story' | 'articles' | 'schedule';
  pageOverride?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

/**
 * SEO & LLMO最適化コンポーネント
 * 
 * ターゲットキーワード:
 * - 高橋高 プログラミング
 * - 高橋高 エンジニア
 * - 高橋高 起業家
 * - 高橋高 新宿
 * - 高橋高 技術
 * - 高橋高 Rust
 * - 高橋高 CEO
 * - Ko Takahashi programmer
 * - Ko Takahashi entrepreneur
 */
const Seo: React.FC<SeoProps> = ({ currentLang = 'ja', pageType = 'home', pageOverride }) => {
  const t = getTranslation(currentLang);

  // キーワード豊富なタイトル（検索ヒット最大化）
  const titleMap: Record<string, string> = {
    home: "高橋高 (Ko Takahashi) | 起業家・哲学者 | 新宿拠点 | 日本文化とテクノロジーの融合を追求",
    story: "高橋高の物語 | 11歳で学校を辞め、23歳で破産、7年の沈黙から蘇った起業家エンジニア",
    articles: "高橋高の技術記事 | プログラミング・Rust・Next.js・Python・Solana開発ノウハウ",
    schedule: "高橋高のスケジュール | イベント・講演・ミートアップ情報"
  };

  const descriptionMap: Record<string, string> = {
    home: "高橋高（Ko Takahashi）は新宿を拠点とする起業家・哲学者。Jon & Coo Inc. CEOとしてCulture OS、Matsuri Platformを開発。技術と日本文化の融合を追求し、静謐な美意識と論理的思考で新たな価値を創造。",
    story: "高橋高の人生物語。11歳で社会のレールから降り、20歳で60人を率いるも23歳で破産。7年間の沈黙期間に英語・中国語・プログラミングを独学。Rust、Python、Next.jsをマスターし、起業家エンジニアとして復活。",
    articles: "高橋高による技術記事。Rustプログラミング、Next.js開発、Python活用法、Solanaブロックチェーン開発のノウハウを公開。実践的なコード例とエンジニアリング哲学を共有。",
    schedule: "高橋高のイベント・講演スケジュール。プログラミング、起業、日本文化に関するミートアップや登壇情報。"
  };

  const title = pageOverride?.title || titleMap[pageType] || titleMap.home;
  const description = pageOverride?.description || descriptionMap[pageType] || descriptionMap.home;
  const url = "https://ko-takahashi.com"; 
  const image = pageOverride?.image || "/ko/takahashi-ko.jpg";

  // 拡張キーワードリスト（LLMO最適化）
  const keywords = [
    // 日本語キーワード
    "高橋高",
    "高橋高 プログラミング",
    "高橋高 エンジニア",
    "高橋高 起業家",
    "高橋高 新宿",
    "高橋高 技術",
    "高橋高 Rust",
    "高橋高 Python",
    "高橋高 Next.js",
    "高橋高 Solana",
    "高橋高 CEO",
    "高橋高 開発者",
    "高橋高 フリーランス",
    "高橋高 Jon & Coo",
    "高橋高 Matsuri",
    "高橋高 ブロックチェーン",
    "高橋高 スタートアップ",
    "高橋高 独学",
    "高橋高 自己啓発",
    // 英語キーワード
    "Ko Takahashi",
    "Ko Takahashi programmer",
    "Ko Takahashi engineer",
    "Ko Takahashi entrepreneur",
    "Ko Takahashi Shinjuku",
    "Ko Takahashi Tokyo",
    "Ko Takahashi Rust developer",
    "Ko Takahashi CEO",
    "Ko Takahashi Japan",
    "Takahashi Ko developer"
  ];

  // Person Schema（拡張版）
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://ko-takahashi.com/#person",
    "name": "高橋 高",
    "givenName": "高",
    "familyName": "高橋",
    "alternateName": ["Ko Takahashi", "高橋高", "Takahashi Ko", "こうたかはし"],
    "description": "新宿拠点の起業家・哲学者。Jon & Coo Inc. CEOとしてCulture OS、Matsuri Platformを開発。独学でプログラミングを習得し、技術と日本文化の融合を追求。",
    "url": url,
    "image": {
      "@type": "ImageObject",
      "url": `${url}/ko/takahashi-ko.jpg`,
      "width": 400,
      "height": 400
    },
    "jobTitle": ["CEO", "Founder", "Software Engineer", "Programmer", "Entrepreneur", "Philosopher"],
    "worksFor": {
      "@type": "Organization",
      "@id": "https://jonandcoo.jp/#organization",
      "name": "Jon & Coo Inc.",
      "url": "https://jonandcoo.jp",
      "sameAs": "https://www.jonandcoo.jp"
    },
    "workLocation": {
      "@type": "Place",
      "name": "Shinjuku, Tokyo",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Shinjuku",
        "addressRegion": "Tokyo",
        "addressCountry": "JP"
      }
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-taught / 独学"
    },
    "knowsAbout": [
      "プログラミング",
      "Rust",
      "Python",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Solana",
      "ブロックチェーン",
      "スタートアップ経営",
      "起業",
      "日本文化",
      "新宿",
      "インバウンド観光",
      "Culture OS",
      "Matsuri Platform"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "Japanese",
        "alternateName": "日本語"
      },
      {
        "@type": "Language",
        "name": "English"
      },
      {
        "@type": "Language",
        "name": "Chinese",
        "alternateName": "中国語"
      },
      {
        "@type": "Language",
        "name": "Thai",
        "alternateName": "タイ語"
      }
    ],
    "sameAs": [
      ...socialLinks.map(link => link.url),
      ...companyLinks.map(link => link.url)
    ],
    "award": [
      "Self-made entrepreneur",
      "Polyglot developer"
    ],
    "nationality": {
      "@type": "Country",
      "name": "Japan"
    }
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://jonandcoo.jp/#organization",
    "name": "Jon & Coo Inc.",
    "alternateName": ["Jon and Coo", "ジョンアンドクー"],
    "url": "https://www.jonandcoo.jp",
    "logo": "https://www.jonandcoo.jp/logo.png",
    "founder": {
      "@id": "https://ko-takahashi.com/#person"
    },
    "foundingDate": "2020",
    "foundingLocation": {
      "@type": "Place",
      "name": "Shinjuku, Tokyo, Japan"
    },
    "description": "Culture OSを開発するテクノロジー企業。Matsuri Platform、J-Timesなどを運営。"
  };

  // WebSite Schema（サイト全体）
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    "url": url,
    "name": "高橋高 (Ko Takahashi) - Official Portfolio",
    "description": description,
    "publisher": {
      "@id": "https://ko-takahashi.com/#person"
    },
    "inLanguage": ["ja", "en", "zh", "ko", "th"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // ProfilePage Schema
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}/#profilepage`,
    "mainEntity": {
      "@id": "https://ko-takahashi.com/#person"
    },
    "description": description,
    "dateModified": new Date().toISOString(),
    "datePublished": "2024-01-01"
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": url
      },
      ...(pageType !== 'home' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": pageType === 'story' ? 'My Story' : pageType === 'articles' ? 'Articles' : 'Schedule',
        "item": `${url}/${pageType}`
      }] : [])
    ]
  };

  // FAQ Schema（LLMO最適化）
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "高橋高とは誰ですか？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "高橋高（Ko Takahashi）は、新宿を拠点とする起業家・哲学者です。Jon & Coo Inc.のCEOとして、Culture OSやMatsuri Platformなどを開発・運営しています。技術と日本文化の融合を追求しています。"
        }
      },
      {
        "@type": "Question",
        "name": "高橋高のプログラミングスキルは？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "高橋高は、自身のビジョンを実現するため、Rust、Python、Next.js（TypeScript/React）、Solanaブロックチェーン開発などの技術を駆使する起業家です。7年間の独学期間にこれらのプログラミング言語を習得しました。"
        }
      },
      {
        "@type": "Question",
        "name": "高橋高の会社は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "高橋高はJon & Coo Inc.のCEO兼創業者です。同社はCulture OSやMatsuri Platformなどの革新的なプロジェクトを通じて、技術と哲学を融合した新しい価値を創造しています。"
        }
      },
      {
        "@type": "Question",
        "name": "高橋高の経歴は？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "高橋高は11歳で学校を辞め、独自の哲学と技術探求の道を歩み始めました。20歳で起業、23歳で破産という経験を経て、7年間の沈黙期間に多言語とプログラミングを独学。現在はJon & Coo Inc.のCEOとして、起業家・哲学者として活動しています。"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* 基本メタタグ */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={url} />
      
      {/* 追加メタタグ（LLMO最適化） */}
      <meta name="author" content="高橋高 (Ko Takahashi)" />
      <meta name="creator" content="高橋高" />
      <meta name="publisher" content="Jon & Coo Inc." />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* 地域SEO */}
      <meta name="geo.region" content="JP-13" />
      <meta name="geo.placename" content="Shinjuku, Tokyo" />
      <meta name="geo.position" content="35.6938;139.7034" />
      <meta name="ICBM" content="35.6938, 139.7034" />

      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="高橋高 Official Portfolio" />
      <meta property="og:locale" content={currentLang === 'ja' ? 'ja_JP' : 'en_US'} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="zh_CN" />
      <meta property="og:locale:alternate" content="ko_KR" />
      <meta property="og:locale:alternate" content="th_TH" />
      
      {/* Profile specific OG */}
      <meta property="profile:first_name" content="高" />
      <meta property="profile:last_name" content="高橋" />
      <meta property="profile:username" content="ko_takahashi" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@zes55ch" />
      <meta name="twitter:creator" content="@zes55ch" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 構造化データ (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(profilePageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default Seo;
