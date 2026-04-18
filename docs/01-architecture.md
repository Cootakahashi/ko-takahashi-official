# 01 - アーキテクチャ詳細

## ディレクトリ構造

```
ko-takahashi-official/
├── App.tsx                    # メインアプリ（585行）ルーティング・状態管理・全ビュー統合
├── index.tsx                  # Reactマウント（40行）HelmetProvider + ASCII art
├── index.html                 # HTMLエントリーポイント（90行）静的SEOメタ
├── index.css                  # グローバルCSS（86行）Tailwind + カスタムアニメーション
├── config.ts                  # サイト設定（108行）メタデータ + リンク定義
├── i18n.ts                    # 国際化（256行）5言語翻訳データ
├── types.ts                   # 型定義（18行）LanguageCode, SocialLink, SiteMetadata
├── metadata.json              # サイトメタ情報
│
├── components/
│   ├── Seo.tsx                # SEO + 構造化データ（365行）JSON-LD 6種
│   ├── Hero3D.tsx             # 3Dヒーロー背景（210行）Three.js パーティクル
│   ├── InteractivePortrait.tsx # WebGLポートレート（309行）シェーダー + グリッチ
│   ├── MicroInteractions.tsx  # マイクロインタラクション（378行）8コンポーネント
│   ├── HybridBentoGrid.tsx    # ベントグリッド（186行）3Dフリップカード
│   ├── CultureOSShowcase.tsx  # ショーケース（206行）4カード構成
│   ├── SEOSkillsSection.tsx   # スキル表示（129行）schema.org対応
│   ├── ArchiveGrid.tsx        # アーカイブ（63行）SNSリンクグリッド
│   ├── SmartImage.tsx         # 画像最適化（~80行）フォールバック付き
│   ├── StoryView.tsx          # 物語ページ（800+行）7章の壮大なサガ
│   ├── ScheduleView.tsx       # スケジュール（189行）イベントタイムライン
│   ├── ArticlesView.tsx       # 記事一覧（194行）プラットフォーム混合
│   └── ArticleDetailView.tsx  # 記事詳細（150行）フルリーダー
│
├── lib/
│   └── data-loader.ts         # データローダー（18行）JSON非同期取得
│
├── public/
│   ├── data/
│   │   ├── story.json         # 物語データ（多言語）
│   │   ├── schedule.json      # スケジュールデータ
│   │   ├── articles.json      # 記事メタデータ
│   │   └── blog_posts.json    # 内部記事フルコンテンツ
│   ├── ko/                    # 画像アセット
│   │   ├── takahashi-ko.jpg   # メイン画像（2.6MB）
│   │   ├── ko_takahashi.jpg   # サブ画像（1.4MB）
│   │   ├── ko-takahashi_.jpg  # サブ画像（324KB）
│   │   └── ko-takahashi.png   # 高解像度（8.4MB）
│   └── llms.txt               # AI向け構造化プロフィール
│
├── dist/                      # ビルド出力
├── vite.config.ts             # Vite設定
├── tsconfig.json              # TypeScript設定
├── tailwind.config.js         # Tailwind設定
├── postcss.config.js          # PostCSS設定
└── package.json               # 依存関係
```

## ルーティングシステム

### クライアントサイドルーティング（状態ベース）

```
App.tsx の ViewState 型:
  "home" | "story" | "schedule" | "articles" | "article_detail"
```

URL変更なし（ブラウザの履歴API未使用）。全てReactの`useState`で管理。

```typescript
// App.tsx:164
type ViewState = "home" | "story" | "schedule" | "articles" | "article_detail";

const [view, setView] = useState<ViewState>("home");
```

**ルーティング遷移フロー:**
```
Home → setView("story")     → StoryView
Home → setView("schedule")  → ScheduleView
Home → setView("articles")  → ArticlesView
Articles → handleArticleClick(id, isInternal, url)
  ├── isInternal === true  → setView("article_detail") + setSelectedArticleId(id)
  └── isInternal === false → window.open(url) (外部リンク)
```

> **課題**: URLが変わらないため、ブラウザの戻るボタン、ディープリンク、検索エンジンのページ別インデックスが機能しない。

## データフロー

### 遅延読み込みパターン

```
ユーザーがビューを切り替え
  ↓
useEffect が view の変更を検知
  ↓
対応するJSONがまだ null なら
  ↓
getJsonData("xxx.json") で /public/data/ から fetch
  ↓
React state にキャッシュ（再 fetch しない）
```

```typescript
// App.tsx:184-201
useEffect(() => {
  const loadData = async () => {
    if (view === "story" && !storyData) {
      const data = await getJsonData("story.json");
      setStoryData(data);
    }
    // ... 他のビューも同様
  };
  loadData();
}, [view, storyData, scheduleData, articlesData, blogPostsData]);
```

### データローダー

```typescript
// lib/data-loader.ts
export async function getJsonData(filename: string) {
  try {
    const response = await fetch(`/data/${filename}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return null;
  }
}
```

## コンポーネント依存グラフ

```
App.tsx
├── Seo.tsx ← config.ts, i18n.ts
├── CustomCursor ← MicroInteractions.tsx
├── ScrollProgress ← MicroInteractions.tsx
├── Hero3D.tsx ← Three.js, @react-three/fiber
├── InteractivePortrait.tsx ← Three.js (シェーダー)
├── HybridBentoGrid.tsx ← Framer Motion
├── CultureOSShowcase.tsx ← Framer Motion
├── SEOSkillsSection.tsx ← schema.org
├── ArchiveGrid.tsx ← config.ts (socialLinks)
├── StoryView.tsx ← public/data/story.json
├── ScheduleView.tsx ← public/data/schedule.json
├── ArticlesView.tsx ← public/data/articles.json
└── ArticleDetailView.tsx ← public/data/blog_posts.json
```

## 状態管理

全てApp.tsx内の `useState` で管理。外部ストア（Redux, Zustand等）は未使用。

| State | 型 | 初期値 | 用途 |
|-------|---|--------|------|
| `lang` | LanguageCode | `"ja"` | 表示言語 |
| `view` | ViewState | `"home"` | 現在のビュー |
| `filter` | string | `"All"` | アーカイブのカテゴリフィルタ |
| `storyData` | any | `null` | story.json キャッシュ |
| `scheduleData` | any | `null` | schedule.json キャッシュ |
| `articlesData` | any | `null` | articles.json キャッシュ |
| `blogPostsData` | any | `null` | blog_posts.json キャッシュ |
| `selectedArticleId` | string \| null | `null` | 選択中の記事ID |

## ビルド設定

### Vite (vite.config.ts)
```typescript
{
  server: { port: 3000, host: '0.0.0.0' },
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://jon-and-coo.com', // ← 要修正
      dynamicRoutes: ['/story', '/schedule', '/articles']
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') }
  }
}
```

### TypeScript (tsconfig.json)
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Strict: true

### Tailwind (tailwind.config.js)
カスタムテーマ:
- Colors: `obsidian (#050505)`, `gold (#D4AF37)`, `sumi (#1a1a1a)`
- Fonts: serif (Playfair Display), sans (Inter), jp (Noto Serif JP)
- Background: `ink-wash` グラデーション

## パフォーマンス特性

### 強み
- 遅延データ読み込み（初期バンドル軽量化）
- Viteによる高速HMR・ツリーシェイキング
- Framer Motionの `viewport={{ once: true }}` でアニメーション再実行防止

### 課題
- Three.js のフル読み込みが初回LCPを遅延（3Dヒーロー）
- 画像が未圧縮（合計12.7MB+）
- SPAのためFCP後にJS実行→コンテンツ表示の遅延
- Google Fonts の読み込みが render-blocking の可能性
