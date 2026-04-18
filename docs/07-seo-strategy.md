# 07 - SEO改善戦略

## 戦略全体像

```
Phase 0: 緊急修正（ドメイン統一・OG画像・サイトマップ）
Phase 1: 技術基盤（SSG/プリレンダリング・URL対応）
Phase 2: オンページSEO（canonical・hreflang・画像最適化）
Phase 3: コンテンツSEO（内部記事・ロングテール戦略）
Phase 4: 分析・計測（GA4・Search Console連携）
```

---

## Phase 0: 緊急修正

### 0-1. サイトマップ hostname 修正

**ファイル**: `vite.config.ts`
```typescript
// Before
Sitemap({ hostname: 'https://jon-and-coo.com', ... })

// After
Sitemap({ hostname: 'https://ko-takahashi.com', ... })
```

### 0-2. OG画像のプレースホルダー修正

**ファイル**: `config.ts`
```typescript
// Before
ogImage: "https://picsum.photos/1200/630"

// After
ogImage: "https://ko-takahashi.com/ko/takahashi-ko.jpg"
```

### 0-3. llms.txt のドメイン修正

**ファイル**: `public/llms.txt`
- LinkedInのURL: `YOUR_CUSTOM_ID_HERE` → `ko-takahashi-jp`
- Vercel URL → `https://ko-takahashi.com`

---

## Phase 1: 技術基盤

### 1-1. プリレンダリング導入

**目的**: ビルド時に各ルートを静的HTMLとして出力し、クローラーがJSなしでコンテンツを読めるようにする。

**選択肢比較**:

| 手法 | メリット | デメリット | 推奨 |
|------|---------|-----------|------|
| `vite-plugin-prerender` | 既存Viteに追加するだけ。最小変更 | 動的ルートに弱い | **推奨** |
| Vike (vite-plugin-ssr) | 本格的SSR/SSG | 学習コスト・移行コスト大 | 将来的に |
| Next.js移行 | 最適なSEO。App Router + RSC | 全面書き直し | 非推奨（現時点） |

**vite-plugin-prerender の導入手順**:
1. `npm install vite-plugin-prerender`
2. vite.config.ts に設定追加
3. プリレンダリング対象ルート: `/`, `/story`, `/schedule`, `/articles`

### 1-2. URL対応（History API）

**目的**: ビュー切替時にURLを変更し、ディープリンク・戻るボタン・SEOインデックスを可能にする。

**現状**: `useState` でビュー管理。URLは常に `/`。

**実装方針**: `window.history.pushState` + `popstate` イベント、または軽量ルーター（react-router-dom 等）の導入。

**対応するURL**:
```
/           → Home
/story      → StoryView
/schedule   → ScheduleView
/articles   → ArticlesView
/articles/:id → ArticleDetailView
```

### 1-3. robots.txt 修正

```
User-agent: *
Allow: /

Sitemap: https://ko-takahashi.com/sitemap.xml
```

---

## Phase 2: オンページSEO

### 2-1. ページ別 canonical URL

**現状**: 全ページが `https://ko-takahashi.com` を指す。

**修正** (Seo.tsx):
```typescript
const canonicalMap: Record<string, string> = {
  home: "https://ko-takahashi.com",
  story: "https://ko-takahashi.com/story",
  articles: "https://ko-takahashi.com/articles",
  schedule: "https://ko-takahashi.com/schedule",
};
```

### 2-2. hreflang タグ追加

```html
<link rel="alternate" hreflang="ja" href="https://ko-takahashi.com/?lang=ja" />
<link rel="alternate" hreflang="en" href="https://ko-takahashi.com/?lang=en" />
<link rel="alternate" hreflang="zh" href="https://ko-takahashi.com/?lang=zh" />
<link rel="alternate" hreflang="ko" href="https://ko-takahashi.com/?lang=ko" />
<link rel="alternate" hreflang="th" href="https://ko-takahashi.com/?lang=th" />
<link rel="alternate" hreflang="x-default" href="https://ko-takahashi.com" />
```

### 2-3. 画像最適化

**必要作業**:
1. 全画像をWebP形式に変換
2. サイズ上限: OG画像 1200x630、プロフィール画像 800x800
3. 圧縮: quality 80%
4. `<img>` に `width`, `height`, `loading="lazy"`, `alt` を必ず指定
5. ko-takahashi.png (8.4MB) は削除またはリサイズ

**目標サイズ**:
| ファイル | 現在 | 目標 |
|---------|------|------|
| takahashi-ko.webp | 2.6MB | < 200KB |
| ko_takahashi.webp | 1.4MB | < 150KB |
| ko-takahashi_.webp | 324KB | < 100KB |

### 2-4. Google Fonts 最適化

```html
<!-- font-display: swap を追加 -->
<link href="...&display=swap" rel="stylesheet" />
```
> 現在 `display=swap` は設定済み（確認済み）。

### 2-5. Three.js 遅延読み込み

Hero3D を React.lazy + Suspense で動的インポート:
```typescript
const Hero3D = React.lazy(() => import('./components/Hero3D'));

<Suspense fallback={<div className="fixed inset-0 bg-obsidian" />}>
  <Hero3D />
</Suspense>
```

---

## Phase 3: コンテンツSEO

### 3-1. 内部記事の充実

**現状**: 2記事のみ（internal_001, internal_002）

**目標**: 10記事以上

**記事案**:

| ID | タイトル案 | ターゲットキーワード |
|----|----------|-----------------|
| internal_003 | 「Rustを独学で習得した方法」 | 高橋高 Rust, Rust 独学 |
| internal_004 | 「Culture OSの技術アーキテクチャ」 | Culture OS, 文化 テクノロジー |
| internal_005 | 「11歳で学校を辞めた理由」 | 高橋高 経歴, 不登校 起業家 |
| internal_006 | 「Solanaでの開発体験」 | Solana 開発 日本語 |
| internal_007 | 「新宿から世界へ：Matsuri Platformの構想」 | Matsuri Platform, 新宿 スタートアップ |
| internal_008 | 「破産から復活した7年間」 | 起業 失敗 復活 |
| internal_009 | 「日本文化とテクノロジーの融合」 | 日本文化 テクノロジー |
| internal_010 | 「Zen-Tech デザイン原則」 | UI UX デザイン 日本 |

### 3-2. 記事のSEOメタデータ

各内部記事にArticle スキーマを追加:
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@id": "#person" },
  "datePublished": "...",
  "dateModified": "...",
  "publisher": { "@id": "#organization" }
}
```

### 3-3. /about ページの独立化

Homeのバイオ情報を独立した `/about` ページに拡張。E-E-A-T シグナルの集約点として機能させる。

---

## Phase 4: 分析・計測

### 4-1. GA4 導入

index.html の `<head>` に GA4 タグを追加:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>
```

### 4-2. イベントトラッキング

| イベント | トリガー |
|---------|---------|
| `page_view` | ビュー切り替え時 |
| `language_change` | 言語切り替え時 |
| `article_click` | 記事クリック時 |
| `external_link_click` | 外部リンククリック時 |
| `story_chapter_view` | ストーリー章の表示時 |

### 4-3. Search Console 最適化

- サイトマップ再送信（修正後）
- URL検査でインデックス状態確認
- パフォーマンスレポートの定期確認
