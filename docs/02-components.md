# 02 - コンポーネント詳細

## コンポーネント一覧

全13コンポーネント。合計約3,500行。

---

## 1. Seo.tsx（365行）— SEO + 構造化データエンジン

### 責務
react-helmet-async を使い、`<head>` 内のメタタグと JSON-LD 構造化データを動的に生成。

### Props
```typescript
interface SeoProps {
  currentLang?: LanguageCode;       // デフォルト: 'ja'
  pageType?: 'home' | 'story' | 'articles' | 'schedule';
  pageOverride?: {
    title?: string;
    description?: string;
    image?: string;
  };
}
```

### 生成するメタタグ
- `<title>` — ページ別のキーワード豊富なタイトル
- `<meta name="description">` — ページ別の説明文
- `<meta name="keywords">` — 40+キーワード（日本語 + 英語）
- `<link rel="canonical">` — `https://ko-takahashi.com`（全ページ共通 — **要修正**）
- `<meta name="robots">` — `index, follow, max-image-preview:large, max-snippet:-1`
- Geo メタ: `geo.region (JP-13)`, `geo.placename`, `geo.position`, `ICBM`
- OG タグ: type, title, description, image, url, locale, profile
- Twitter Card: card, site, creator, title, description, image

### JSON-LD スキーマ（6種）

| スキーマ | @id | 主な情報 |
|---------|-----|---------|
| Person | `#person` | 名前、職業、スキル、言語、SNSリンク |
| Organization | `#organization` | Jon & Coo Inc. の情報 |
| WebSite | `#website` | サイト名、SearchAction |
| ProfilePage | `#profilepage` | mainEntity → Person |
| BreadcrumbList | — | ホーム → 現在ページ |
| FAQPage | — | 4つのQ&A |

### キーワード戦略
日本語19個 + 英語10個 = 29キーワード。
主軸: `高橋高 + {スキル/職業/地名}`

---

## 2. Hero3D.tsx（210行）— 3D背景パーティクルシステム

### 責務
Three.js + @react-three/fiber で夜明け風のパーティクルアニメーション背景を描画。

### サブコンポーネント

#### DawnParticles
- 3000個の頂点
- 球状分布（上半分に集中 = 空のイメージ）
- 色: Moccasin, Light Salmon, Sky Blue, Papaya Whip, Lavender
- useFrame でゆっくり回転（0.0002 rad/frame）

#### FloatingDust
- 500個の微粒子
- 左から右へ流れる動き
- 色: 白系の微小ポイント

#### CameraRig
- マウス位置に応じたカメラのパララックス移動
- lerp（線形補間）でスムーズに追従

### Canvas設定
```typescript
<Canvas
  camera={{ position: [0, 0, 8], fov: 60 }}
  dpr={[1, 2]}
  gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: ACESFilmicToneMapping }}
/>
```

### フィルムグレイン
Canvas上にCSS overlayで `opacity-20` のフィルムグレインテクスチャを重畳。

---

## 3. InteractivePortrait.tsx（309行）— WebGLポートレート

### 責務
プロフィール画像をWebGLシェーダーで描画し、マウスインタラクションで歪み・グリッチ効果を適用。

### シェーダー効果
- **頂点シェーダー**: マウス位置に応じた波状ディスプレースメント
- **フラグメントシェーダー**: RGBスプリット（ホバー時）、金色ビネット
- **グリッチ**: ランダム間隔で発動する画面歪み
- **EdgeParticles**: 画像の縁から流れる500個のパーティクル

### 画像ソース
`/ko/takahashi-ko.jpg`（2.6MB）

### フレーム装飾
金色のコーナーアクセント（CSSボーダー）

---

## 4. MicroInteractions.tsx（378行）— 8つのインタラクティブユーティリティ

| コンポーネント | 行数 | 機能 |
|--------------|------|------|
| `CustomCursor` | ~60 | スプリング物理のカスタムカーソル + ホバー拡大 |
| `MagneticButton` | ~40 | マウスに吸い付くボタン効果 |
| `TextReveal` | ~30 | 文字単位の逐次表示アニメーション |
| `GlitchText` | ~40 | 周期的なシアン/レッドグリッチ効果 |
| `ParallaxSection` | ~25 | スクロールベースのパララックスオフセット |
| `FloatingElement` | ~20 | 微小な浮遊アニメーション |
| `MouseTrail` | ~50 | 15ポイントの軌跡エフェクト |
| `ScrollProgress` | ~25 | 画面上部のゴールドグラデーションプログレスバー |

### 使用箇所
- `CustomCursor` — App.tsx のメインビュー
- `ScrollProgress` — App.tsx のメインビュー
- `GlitchText` — 未使用（エクスポートのみ）
- `MagneticButton` — 未使用（エクスポートのみ）

---

## 5. HybridBentoGrid.tsx（186行）— 3つの転機フリップカード

### 責務
高橋高の人生の3つの転機を、ホバーで裏返る3Dカードで表現。

### カードデータ

| ID | タイトル | 日本語 | テーマ | グラデーション |
|----|---------|--------|-------|--------------|
| fall | The Fall | 転落 | 23歳で破産 | rose → amber |
| silence | The Silence | 沈黙 | 7年間の学び | slate → blue |
| rebirth | The Vision | 約束 | グローバルビジョン | emerald → teal |

### アニメーション
- `perspective-1000` + `rotateY(180deg)` の3Dフリップ
- `framer-motion` の staggered entrance (0.15s間隔)
- カード高さ: 380px固定

---

## 6. CultureOSShowcase.tsx（206行）— ビジョンセクション

### 責務
4つのカードでプロジェクトへの導線を提供。

### レイアウト
```
┌───────────────────────┬───────────┐
│  MatsuriInviteCard    │ Whitepaper │
│  (2col span)          ├───────────┤
│                       │ TeamCard   │
│                       ├───────────┤
│                       │ StoryLink  │
└───────────────────────┴───────────┘
```

### カード詳細

| カード | リンク先 | アクセント色 | アイコン |
|-------|---------|------------|---------|
| MatsuriInviteCard | matsuri.group/ja | amber | Compass |
| WhitepaperCard | matsuri-dao.com/docs/intro | violet | ScrollText |
| TeamCard | jonandcoo.jp/ja | blue | Users |
| StoryLinkCard | (内部遷移) | rose | Heart |

---

## 7. SEOSkillsSection.tsx（129行）— スキルグリッド

### 責務
SEOキーワード密度向上のためのスキル表示。Schema.org `Person` マークアップ付き。

### スキルカテゴリ

| カテゴリ | 項目 |
|---------|------|
| プログラミング言語 | Rust, Python, TypeScript, JavaScript, Solidity |
| フレームワーク・技術 | Next.js, React, Node.js, Solana, Three.js, TailwindCSS |
| 言語能力 | 日本語(Native), English, 中国語, ไทย |
| 経営・ビジネス | スタートアップ経営, 起業, プロダクト開発, チームマネジメント |

### SEO隠しテキスト
`<div class="sr-only">` 内にキーワード豊富なテキストを配置。
> 注: `aria-hidden="true"` と `sr-only` の併用はスクリーンリーダーにも非表示。純粋にクローラー向け。

---

## 8. StoryView.tsx（800+行）— 7章の壮大な物語

### 責務
高橋高の人生を7章+プロローグで語るフルページ体験。

### 章構成

| ID | 年代 | タイトル（日/英） | アクセント色 |
|----|------|-----------------|------------|
| prologue | 1995 | 序章：傲慢な勘違いと、新宿の影 / Prologue: The Shadow of Shinjuku | zinc |
| drifter | 2006 | 第1章：11歳の放浪と、残酷なフォアグラ / The Boy Drifter | amber |
| outlaw | 2013 | 第2章：新宿のネオアウトロー / Neo-Outlaw of Shinjuku | red |
| guillotine | 2018 | 第3章：二重のギロチン / The Double Guillotine | rose |
| bookstore | 2019 | 第4章：北の果ての書店 / Bookstore at the Edge | blue |
| paradox | 2022 | 第5章：世界を知り、日本を知る / Global Paradox | emerald |
| ai_paradox | 2023 | 第6章：AIの衝撃 / The AI Paradox | violet |
| return | 2024 | 第7章：再会と尊厳の回復 / The Return | gold |

### 機能
- スクロール連動のフェードイン/トランスフォーム
- 日/英 言語切り替え
- パララックスセクション
- フィルムグレインオーバーレイ
- 戻るボタン → `onBack()` で Home へ

---

## 9. ScheduleView.tsx（189行）— イベントタイムライン

### データソース
`public/data/schedule.json` — 4つのイベント

### セクション分割
- **Incoming Data** (upcoming) — 未来のイベント
- **Archived Logs** (past) — 過去のイベント

### イベントカード要素
- 日付、タイトル（多言語）、説明、場所、タグ、ステータス、リンク

---

## 10. ArticlesView.tsx（194行）— 記事一覧

### データソース
`public/data/articles.json` — 4記事（Qiita 2, Zenn 2）

### プラットフォーム判定
- `platform === "Internal"` → 内部記事 → ArticleDetailView へ遷移
- その他 → 外部URL (`window.open`)

### カード表示
- プラットフォームバッジ（色分け）
- タイトル + サマリー + 日付 + タグ
- グリッド: 1col → 2col → 3col（レスポンシブ）

---

## 11. ArticleDetailView.tsx（150行）— 記事リーダー

### データソース
`public/data/blog_posts.json` — 2つの内部記事

### コンテンツブロック型

| type | 描画 |
|------|------|
| `h2` | 見出し（金色ボーダー付き） |
| `p` | 段落テキスト |
| `quote` | 引用ブロック（左ボーダー金色） |
| `list` | 箇条書き |
| `code` | コードブロック（金色テキスト） |
| `image` | 画像 |

---

## 12. ArchiveGrid.tsx（63行）— SNSリンクグリッド

### Props
```typescript
{ links: SocialLink[]; t: TranslationData }
```

### レイアウト
- 1col (mobile) → 2col (tablet) → 3col (desktop)
- ホバー: 浮き上がり + ボーダーハイライト
- 外部リンクアイコン (ArrowUpRight)

---

## 13. SmartImage.tsx — フォールバック画像

### 責務
画像読み込み失敗時にUnsplash CDNのフォールバック画像を表示。

### フォールバックマッピング
| テーマ | 画像 |
|-------|------|
| origin | 神社/自然/苔 |
| philosophy | 禅/抽象/石 |
| vision | テック/ネットワーク/金 |
| default | 風景 |
