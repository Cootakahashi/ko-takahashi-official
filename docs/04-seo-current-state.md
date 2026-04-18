# 04 - SEO現状分析

## 実装済みSEO施策

### メタタグ（index.html — 静的）
- [x] `<title>` — キーワード豊富（高橋高, Ko Takahashi, プログラマー, 起業家, エンジニア, 新宿, Rust, Next.js）
- [x] `<meta name="description">` — 説明文
- [x] `<meta name="keywords">` — 12キーワード
- [x] `<meta name="author">` — 高橋高 (Ko Takahashi)
- [x] `<meta name="robots">` — index, follow, max-image-preview:large
- [x] `<link rel="canonical">` — https://ko-takahashi.com
- [x] Google Site Verification — OmFhJpRAjDejGkuVA92KFJ4dRTYFq_sC__Wy_iuLFxM

### メタタグ（Seo.tsx — 動的）
- [x] ページ別タイトル（home, story, articles, schedule）
- [x] ページ別ディスクリプション
- [x] 40+キーワード
- [x] `<html lang>` 動的切替
- [x] author, creator, publisher メタ
- [x] googlebot メタ
- [x] max-snippet:-1, max-video-preview:-1

### Geo SEO
- [x] `geo.region: JP-13`（東京都）
- [x] `geo.placename: Shinjuku, Tokyo`
- [x] `geo.position: 35.6938;139.7034`
- [x] `ICBM: 35.6938, 139.7034`

### Open Graph
- [x] og:type — `profile`
- [x] og:title, og:description
- [x] og:image — `/ko/takahashi-ko.jpg`（Seo.tsx）/ `https://ko-takahashi.com/ko/takahashi-ko.jpg`（index.html）
- [x] og:url — `https://ko-takahashi.com`
- [x] og:site_name — 高橋高 Official Portfolio
- [x] og:locale — ja_JP（デフォルト）
- [x] og:locale:alternate — en_US, zh_CN, ko_KR, th_TH
- [x] profile:first_name, profile:last_name, profile:username

### Twitter Card
- [x] twitter:card — summary_large_image
- [x] twitter:site — @zes55ch
- [x] twitter:creator — @zes55ch
- [x] twitter:title, twitter:description, twitter:image

### 構造化データ (JSON-LD)
- [x] Person スキーマ（name, jobTitle, knowsAbout, sameAs等）
- [x] Organization スキーマ（Jon & Coo Inc.）
- [x] WebSite スキーマ（SearchAction付き）
- [x] ProfilePage スキーマ
- [x] BreadcrumbList スキーマ
- [x] FAQPage スキーマ（4つのQ&A）

### サイトマップ
- [x] vite-plugin-sitemap による自動生成
- [x] 4ルート: /, /story, /schedule, /articles

### robots.txt
- [x] User-agent: * / Allow: /
- [x] Sitemap ディレクティブ

### Noscript フォールバック
- [x] index.html 内にキーワード豊富な `<noscript>` コンテンツ

### セマンティックHTML
- [x] schema.org/Person の itemScope/itemProp（SEOSkillsSection）
- [x] aria-label 属性
- [x] 意味的な HTML5 要素（section, article, header, footer, nav）

### llms.txt
- [x] AI向けプロフィールファイル設置

---

## 致命的な問題点

### 1. SPA レンダリング問題（最重要）

**状況**: 全コンテンツがクライアントサイドJSで描画。HTMLソースは `<div id="root"></div>` のみ。

**影響**:
- Googlebotは JSを実行するが、レンダリングキューに入るため数日〜数週間の遅延
- AI検索エンジン（Perplexity, ChatGPT Search, Gemini）はJSを実行しない → サイトコンテンツが完全に不可視
- `<noscript>` フォールバックは一部の情報のみで不十分

**深刻度**: Critical

### 2. ドメイン不整合

| ファイル | 使用ドメイン | 用途 |
|---------|------------|------|
| index.html (canonical) | ko-takahashi.com | 正しい |
| Seo.tsx (url変数) | ko-takahashi.com | 正しい |
| vite.config.ts (sitemap) | **jon-and-coo.com** | **間違い** |
| llms.txt (リンク) | **ko-takahashi-official.vercel.app** | **間違い** |
| config.ts (ogImage) | **picsum.photos** | **プレースホルダー** |

**影響**: Googleが正しいドメインをcanonicalとして認識できない。サイトマップ内のURLがcanonicalと不一致。

**深刻度**: Critical

### 3. Canonical URLがページ別でない

全ページが `https://ko-takahashi.com` を指す。`/story`, `/articles`, `/schedule` の個別canonical URLがない。

**影響**: 全ページが同一URLとして扱われ、個別インデックスされない。

**深刻度**: High

### 4. OG画像がプレースホルダー

`config.ts` の `ogImage` が `https://picsum.photos/1200/630`。SNSシェア時にランダム画像が表示される。

> Seo.tsx では `/ko/takahashi-ko.jpg` が使われるが、config.ts の値と不整合。

**深刻度**: High

### 5. 画像未最適化

| ファイル | サイズ | 問題 |
|---------|-------|------|
| ko-takahashi.png | 8.4MB | WebP変換 + 圧縮必須 |
| takahashi-ko.jpg | 2.6MB | 圧縮必須 |
| ko_takahashi.jpg | 1.4MB | 圧縮必須 |

合計: **12.4MB+** の画像アセット

**影響**: LCP（Largest Contentful Paint）悪化、Core Web Vitals 低スコア

**深刻度**: High

### 6. hreflang タグ未設定

5言語対応だが `<link rel="alternate" hreflang="...">` が未設定。

**影響**: Googleが言語別ページを正しく認識できない。重複コンテンツとして扱われるリスク。

**深刻度**: Medium

### 7. アナリティクス未導入

GA4, GTM 共に未設定。効果測定が完全に不可能。

**深刻度**: Medium（SEOには直接影響しないが改善サイクルが回せない）

### 8. URLが変わらない

SPAルーティングが `useState` ベースのため、ブラウザのURLが常に `/` のまま。

**影響**:
- ディープリンク不可
- ブラウザの戻る/進む不可
- Google Search Console のページ別レポート不可
- SNSで特定ページをシェア不可

**深刻度**: High

### 9. SearchAction が機能しない

WebSite スキーマの `SearchAction` に検索URL `ko-takahashi.com/search?q={query}` が設定されているが、検索機能は実装されていない。

**影響**: 構造化データのバリデーションエラー。Google からの信頼性低下。

**深刻度**: Medium

### 10. 内部コンテンツ不足

- articles.json: 4記事のみ（全て外部リンク）
- blog_posts.json: 2記事のみ（内部フル記事）
- サイト内で読めるオリジナルコンテンツが極めて少ない

**影響**: インデックス可能なページ数が少なく、ロングテールキーワードでの流入がほぼゼロ。

**深刻度**: High

---

## Google Search Console 確認事項

以下はGoogle Search Consoleで確認すべき項目:

- [ ] インデックスされているページ数
- [ ] クロールエラー
- [ ] モバイルユーザビリティ
- [ ] Core Web Vitals レポート
- [ ] 構造化データのエラー・警告
- [ ] サイトマップの送信状態
- [ ] 検索パフォーマンス（表示回数・CTR）
