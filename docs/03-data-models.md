# 03 - データモデル・型定義

## TypeScript型定義 (types.ts)

```typescript
type LanguageCode = 'ja' | 'en' | 'zh' | 'ko' | 'th';

interface SocialLink {
  platform: string;
  url: string;
  category: 'Business' | 'Tech' | 'Visual' | 'Personal' | 'Corporate' | 'Platform' | 'Media' | 'DAO';
  iconName?: string;
  id?: string;
}

interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  location?: string;
  ogImage?: string;
  twitterId?: string;
}
```

## JSONデータスキーマ

### articles.json

```json
{
  "meta": {
    "ja": { "title": "string", "description": "string" },
    "en": { "title": "string", "description": "string" }
  },
  "articles": [
    {
      "id": "string (例: qiita_001, zenn_001, internal_001)",
      "title": {
        "ja": "string",
        "en": "string"
      },
      "summary": {
        "ja": "string",
        "en": "string"
      },
      "platform": "Qiita | Zenn | Note | Medium | Dev.to | Internal",
      "url": "string (外部URL or 空)",
      "date": "string (YYYY.MM.DD)",
      "tags": ["string"]
    }
  ]
}
```

現在の記事数: **4** (Qiita 2, Zenn 2)

### blog_posts.json

内部記事のフルコンテンツ。`articles.json` の `platform: "Internal"` 記事と `id` で紐付く。

```json
{
  "posts": [
    {
      "id": "string (articles.json の id と一致)",
      "ja": {
        "title": "string",
        "description": "string",
        "content": [
          { "type": "h2", "text": "string" },
          { "type": "p", "text": "string" },
          { "type": "quote", "text": "string" },
          { "type": "list", "items": ["string"] },
          { "type": "code", "text": "string" },
          { "type": "image", "src": "string", "alt": "string" }
        ]
      },
      "en": { /* 同構造 */ }
    }
  ]
}
```

現在の内部記事: **2**
1. `internal_001` — 「Jon & Coo Inc. 創業の哲学: なぜ今、文化OSなのか」
2. `internal_002` — 「デジタルにおける「静寂」のデザイン」

### story.json

```json
{
  "ja": {
    "meta": { "title": "string", "description": "string" },
    "header": { "bg_text": "string", "title": "string" },
    "sections": [
      {
        "id": "origin | philosophy | vision",
        "title": "string (英語)",
        "jpTitle": "string (日本語)",
        "content": "string (長文)",
        "image": "string (パス)",
        "imageCaption": "string"
      }
    ],
    "footer": "string"
  },
  "en": { /* 同構造 */ }
}
```

> 注: story.jsonは3セクションのみ。StoryView.tsx内にハードコードされた7章のデータとは別物。StoryViewの主コンテンツはコンポーネント内の `chapters` 配列（800+行）に直接記述。

### schedule.json

```json
{
  "meta": {
    "ja": { "title": "string", "description": "string" },
    "en": { "title": "string", "description": "string" }
  },
  "events": [
    {
      "id": "string (例: ev_future_01)",
      "date": "string (YYYY-MM-DD)",
      "title": { "ja": "string", "en": "string" },
      "description": { "ja": "string", "en": "string" },
      "location": "string",
      "status": "upcoming | past",
      "tags": ["string"],
      "link": "string (optional)"
    }
  ]
}
```

現在のイベント数: **4**（全て upcoming、2025年の予定）

## 翻訳データ (i18n.ts)

### TranslationData インターフェース

```typescript
interface TranslationData {
  meta_title: string;
  meta_description: string;
  hero_name: string;           // "高橋 高"
  hero_name_sub: string;       // "Ko Takahashi"
  hero_role_titles: string;    // "旅人 / 探求者 / 語り部"
  hero_catchphrase: string;    // "誰かの書いた脚本を、生きていませんか？"
  hero_subcatchphrase: string;
  section_about: string;
  section_ventures: string;
  bio_text: string;            // バイオ段落（長文）
  categories: {
    All, Business, Tech, Visual, Personal,
    Corporate, Platform, Media, DAO
  };
  companies: {
    [key: string]: { description: string; operated_by: string; }
  };
  footer_designed_by: string;
  official_portfolio: string;
}
```

### 対応言語

| コード | 言語 | ヒーローキャッチフレーズ |
|--------|------|----------------------|
| `ja` | 日本語 | 「誰かの書いた脚本を、生きていませんか？」 |
| `en` | English | "Are you living someone else's script?" |
| `zh` | 中国語 | "重新编程文化。" |
| `ko` | 韓国語 | "문화를 리프로그래밍하다." |
| `th` | タイ語 | "รีโปรแกรมวัฒนธรรม" |

## 設定データ (config.ts)

### siteMetadata
```typescript
{
  title: "高橋 高 (Ko Takahashi) | Official Portfolio",
  description: "起業家・哲学者、高橋高の公式ポートフォリオ...",
  keywords: ["高橋高", "Ko Takahashi", "Shinjuku", "Culture OS", ...],
  location: "Shinjuku, Tokyo, Japan",
  ogImage: "https://picsum.photos/1200/630",  // ← プレースホルダー（要修正）
  twitterId: "@zes55ch"
}
```

### companyLinks（4社）
| ID | プラットフォーム | URL | カテゴリ |
|----|----------------|-----|---------|
| jon_coo | Jon & Coo Inc. | jonandcoo.jp/ja | Corporate |
| matsuri | Matsuri Platform | matsuri.group/ja | Platform |
| matsuri_dao | Matsuri DAO | matsuri-dao.com | DAO |
| j_times | The J-Times | j-times.org | Media |

### socialLinks（8件）
| プラットフォーム | URL | カテゴリ |
|----------------|-----|---------|
| LinkedIn | linkedin.com/in/ko-takahashi-jp | Business |
| Zenn | zenn.dev/rust_start | Tech |
| Note | note.com/ko_takahashi_jp | Visual |
| Instagram | instagram.com/ko_takahashi_/ | Visual |
| Medium | medium.com/@ko_takahashi | Business |
| Dev.to | dev.to/ko_takahashi | Tech |
| X (Twitter) | x.com/zes55ch | Personal |
| Pinterest | jp.pinterest.com/kotakahashi_japan/ | Visual |
