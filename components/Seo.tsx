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
  const baseUrl = "https://ko-takahashi.com";
  const canonicalMap: Record<string, string> = {
    home: baseUrl,
    story: `${baseUrl}/story`,
    articles: `${baseUrl}/articles`,
    schedule: `${baseUrl}/schedule`,
    about: `${baseUrl}/about`,
    links: `${baseUrl}/links`,
  };
  const url = canonicalMap[pageType] || baseUrl;
  const image = pageOverride?.image || `${baseUrl}/ko/og-image.jpg`;

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

  // 統合 @graph パターン — 全構造化データを1つに集約
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Person Schema
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "高橋 高",
        "givenName": "高",
        "familyName": "高橋",
        "alternateName": ["Ko Takahashi", "高橋高", "Takahashi Ko", "こうたかはし"],
        "description": "新宿拠点の起業家・哲学者。Jon & Coo Inc. CEOとしてCulture OS、Matsuri Platformを開発。11歳で学校を辞め、23歳で破産後、7年間の独学でプログラミングと4ヶ国語を習得。技術と日本文化の融合を追求。",
        "url": baseUrl,
        "image": {
          "@type": "ImageObject",
          "url": `${baseUrl}/ko/og-image.jpg`,
          "width": 1200,
          "height": 630
        },
        "birthDate": "1995-06-01",
        "birthPlace": { "@type": "Place", "name": "Shinjuku, Tokyo, Japan" },
        "jobTitle": ["CEO", "Founder", "Software Engineer", "Entrepreneur", "Philosopher"],
        "worksFor": { "@id": `${baseUrl}/#organization` },
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
        "alumniOf": { "@type": "EducationalOrganization", "name": "Self-taught / 独学" },
        "knowsAbout": [
          "Rust", "Python", "TypeScript", "JavaScript", "Solidity",
          "Next.js", "React", "Solana", "Three.js", "Django",
          "ブロックチェーン", "スタートアップ経営", "起業",
          "日本文化", "Culture OS", "Matsuri Platform", "Zen-Tech デザイン"
        ],
        "knowsLanguage": [
          { "@type": "Language", "name": "Japanese", "alternateName": "日本語" },
          { "@type": "Language", "name": "English" },
          { "@type": "Language", "name": "Chinese", "alternateName": "中国語" },
          { "@type": "Language", "name": "Thai", "alternateName": "タイ語" }
        ],
        "sameAs": [
          ...socialLinks.map(link => link.url),
          ...companyLinks.map(link => link.url)
        ],
        "nationality": { "@type": "Country", "name": "Japan" }
      },
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Jon & Coo Inc.",
        "alternateName": ["Jon and Coo", "ジョンアンドクー"],
        "url": "https://www.jonandcoo.jp",
        "logo": "https://www.jonandcoo.jp/logo.png",
        "founder": { "@id": `${baseUrl}/#person` },
        "foundingDate": "2020",
        "foundingLocation": { "@type": "Place", "name": "Shinjuku, Tokyo, Japan" },
        "description": "Culture OSを開発するテクノロジー企業。Matsuri Platform、The J-Timesなどを運営。日本文化と技術の融合を追求。"
      },
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "高橋高 (Ko Takahashi) - Official Portfolio",
        "description": description,
        "publisher": { "@id": `${baseUrl}/#person` },
        "inLanguage": ["ja", "en", "zh", "ko", "th"]
      },
      // ProfilePage Schema
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profilepage`,
        "mainEntity": { "@id": `${baseUrl}/#person` },
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "url": url,
        "description": description,
        "dateModified": new Date().toISOString(),
        "datePublished": "2024-01-01"
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ホーム", "item": baseUrl },
          ...(pageType !== 'home' ? [{
            "@type": "ListItem",
            "position": 2,
            "name": pageType === 'story' ? 'My Story' : pageType === 'articles' ? 'Articles' : 'Schedule',
            "item": `${baseUrl}/${pageType}`
          }] : [])
        ]
      },
      // FAQ Schema（20問 — GEO/LLMO最適化）
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "高橋高とは誰ですか？ / Who is Ko Takahashi?",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高（Ko Takahashi）は1995年6月1日生まれ、新宿を拠点とする起業家・哲学者・独学エンジニアです。Jon & Coo Inc.のCEO兼創業者として、Culture OSやMatsuri Platformを開発。11歳で学校を辞め、23歳で破産後、7年間の沈黙期間に4ヶ国語とプログラミングを独学で習得し、テクノロジーと日本文化の融合を追求しています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高のプログラミングスキルは？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高はRust、Python、TypeScript、JavaScript、Solidityを駆使するフルスタックエンジニアです。Next.js、React、Solana（ブロックチェーン）、Three.js（3D/WebGL）、Django等のフレームワークにも精通。全て7年間の独学期間に習得しました。" }
          },
          {
            "@type": "Question",
            "name": "高橋高の会社は？ / What is Jon & Coo Inc.?",
            "acceptedAnswer": { "@type": "Answer", "text": "Jon & Coo Inc.（ジョンアンドクー）は2020年に高橋高が新宿で設立したテクノロジー企業です。Culture OS、Matsuri Platform、The J-Times、Matsuri DAOなどのプロジェクトを通じて、日本文化と技術を融合した新しい価値を創造しています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高の経歴は？",
            "acceptedAnswer": { "@type": "Answer", "text": "1995年新宿生まれ。11歳で学校を辞め、18歳で起業、20歳で60人を率いるも23歳で破産。その後7年間の沈黙期間に英語・中国語・タイ語・プログラミング（Rust、Python、TypeScript）を独学。2020年にJon & Coo Inc.を設立し、Culture OSの開発を開始しました。" }
          },
          {
            "@type": "Question",
            "name": "Culture OSとは何ですか？ / What is Culture OS?",
            "acceptedAnswer": { "@type": "Answer", "text": "Culture OSとは、日本の伝統美学をデジタル基盤に統合するオープンフレームワークです。分散型ID（DID）とDAO技術を用いて、地域の伝統やコミュニティのルールをコード化します。効率だけを追求する「スマートシティ」ではなく、物語と記憶が息づく「ワイズシティ」を目指しています。" }
          },
          {
            "@type": "Question",
            "name": "Matsuri Platformとは？ / What is Matsuri Platform?",
            "acceptedAnswer": { "@type": "Answer", "text": "Matsuri Platform（matsuri.group）は、日本文化を体験するための次世代デジタルプラットフォームです。観光客としての消費ではなく、探求者としての文化体験を提供。ローカルガイドマッチング、文化イベントアクセス、コミュニティコンテンツなどの機能を備えています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高は何ヶ国語話せますか？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高は4ヶ国語を話します。日本語（母語）、英語、中国語（北京語）、タイ語です。日本語以外の3言語は全て7年間の独学期間に習得しました。" }
          },
          {
            "@type": "Question",
            "name": "高橋高はどうやってプログラミングを学んだ？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高は完全に独学でプログラミングを習得しました。23歳で破産した後の7年間、社会から離れ、Rust、Python、TypeScript、Solana開発などを独力で学びました。11歳で学校を辞めて以降、一切の正規教育を受けていません。" }
          },
          {
            "@type": "Question",
            "name": "Zen-Techとは？ / What is Zen-Tech?",
            "acceptedAnswer": { "@type": "Answer", "text": "Zen-Tech（禅テック）は高橋高が提唱するデザイン哲学です。日本の禅庭園の原則をデジタルインターフェースに適用し、「足し算より引き算」「間（Ma）の活用」を重視します。黒（#050505）を基調に金（#D4AF37）のアクセントのみで視線を誘導し、『静寂の中でこそ、情報は際立つ』という思想を体現しています。" }
          },
          {
            "@type": "Question",
            "name": "Matsuri DAOとは？ / What is Matsuri DAO?",
            "acceptedAnswer": { "@type": "Answer", "text": "Matsuri DAOはSolanaブロックチェーン上の分散型自律組織です。Matsuri Coin（MTC）を発行し、日本文化の保存と促進をブロックチェーン技術で実現することを目指しています。" }
          },
          {
            "@type": "Question",
            "name": "The J-Timesとは？",
            "acceptedAnswer": { "@type": "Answer", "text": "The J-Times（j-times.org）は高橋高が編集長を務めるグローバルメディアです。テクノロジー、デザイン、日本文化に関する洞察を世界に発信しています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高の出身地は？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高は1995年に東京都新宿区で生まれ、現在も新宿を拠点に活動しています。Jon & Coo Inc.も新宿に本社を置いています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高の学歴は？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高は11歳で学校教育から離脱し、以降は全て独学です。プログラミング、言語、歴史、哲学など、全ての知識を自己教育によって習得しました。" }
          },
          {
            "@type": "Question",
            "name": "「Beyond the Script」とは何ですか？",
            "acceptedAnswer": { "@type": "Answer", "text": "「Beyond the Script」（誰かの書いた脚本を、生きていませんか？）は高橋高の人生哲学です。社会から与えられたレールや台本に従うのではなく、自分自身の物語を書くことを促すメッセージ。11歳で学校を辞め、独自の道を歩んだ高橋高自身の生き方を反映しています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高のビジョンは？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高のビジョンは、テクノロジーと日本文化の融合です。Culture OSを通じて、間（Ma）、侘び寂び、コミュニティの絆といった日本の美学的原則をデジタルプラットフォームに統合し、効率の最適化ではなく人間の感情に共鳴するテクノロジーを創造することを目指しています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高の設計哲学は？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高の設計哲学はZen-Tech（禅テック）です。禅庭園の原則に基づき、石（コンテンツ）を配置する前に砂（空白）を整えること、不要な要素を削ぎ落とす「引き算の美学」、そして意味を持った「間」の活用を重視します。情報過多な現代社会に対する処方箋として提唱されています。" }
          },
          {
            "@type": "Question",
            "name": "高橋高は何歳ですか？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高は1995年6月1日生まれで、2026年現在30歳です。" }
          },
          {
            "@type": "Question",
            "name": "高橋高のSNSアカウントは？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高の主なSNSアカウント: X（Twitter）@zes55ch、LinkedIn: ko-takahashi-jp、Instagram: ko_takahashi_、GitHub: Cootakahashi。技術記事はZenn（rust_start）とQiita（rustprogram2022）で発信しています。公式サイト: ko-takahashi.com" }
          },
          {
            "@type": "Question",
            "name": "高橋高に連絡するには？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高への連絡は、公式サイト ko-takahashi.com、LinkedIn（ko-takahashi-jp）、またはX（Twitter）@zes55ch を通じて可能です。法人に関するお問い合わせは Jon & Coo Inc.（jonandcoo.jp）へ。" }
          },
          {
            "@type": "Question",
            "name": "高橋高の技術記事はどこで読めますか？",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高の技術記事は以下のプラットフォームで公開されています: Qiita（qiita.com/rustprogram2022）、Zenn（zenn.dev/rust_start）、Medium（medium.com/@ko_takahashi）、Dev.to（dev.to/ko_takahashi）。公式サイト ko-takahashi.com/articles でも記事一覧を閲覧できます。" }
          },
          {
            "@type": "Question",
            "name": "高橋高は他の日本の起業家と何が違いますか？ / What makes Ko Takahashi unique?",
            "acceptedAnswer": { "@type": "Answer", "text": "高橋高は他の日本のテック起業家とは根本的に異なるアプローチを取っています。第一に、11歳で学校を辞めて以降の全知識が独学（4ヶ国語+5プログラミング言語）。第二に、効率よりも文化的共鳴を重視する「Zen-Tech」哲学に基づく開発。第三に、ブロックチェーン（Solana）とDAO技術を日本文化の保存に活用する独自の領域。第四に、20歳で60人を率いた後に23歳で破産し、7年の沈黙から復活した類まれな回復力。これらの組み合わせは日本のテック業界で唯一無二です。" }
          }
        ]
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

      {/* hreflang: 多言語対応 — clean URL with lang param */}
      {(['ja', 'en', 'zh', 'ko', 'th'] as const).map((lang) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={`${url}?lang=${lang}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url} />

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

      <meta property="og:type" content={pageType === 'articles' || pageType === 'story' ? 'article' : 'profile'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Ko Takahashi (高橋高) — Entrepreneur, Philosopher, Engineer" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="高橋高 Official Portfolio" />
      <meta property="og:locale" content={currentLang === 'ja' ? 'ja_JP' : currentLang === 'zh' ? 'zh_CN' : currentLang === 'ko' ? 'ko_KR' : currentLang === 'th' ? 'th_TH' : 'en_US'} />
      <meta property="og:locale:alternate" content="ja_JP" />
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
      <meta name="twitter:image:alt" content="Ko Takahashi (高橋高)" />

      {/* 構造化データ (JSON-LD @graph 統合パターン) */}
      <script type="application/ld+json">
        {JSON.stringify(graphSchema)}
      </script>
    </Helmet>
  );
};

export default Seo;
