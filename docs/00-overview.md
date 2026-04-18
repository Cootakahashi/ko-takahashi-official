# 00 - プロジェクト概要

## サイト名
**Ko Takahashi Official Portfolio** — ko-takahashi.com

## 目的
高橋高（Ko Takahashi）の個人ブランドサイト。起業家・哲学者・エンジニアとしてのアイデンティティを世界に発信し、プロジェクト（Matsuri Platform、Culture OS、Jon & Coo Inc.、The J-Times）への導線を最大化する。

## 技術スタック

| レイヤー | 技術 | バージョン |
|---------|------|-----------|
| ランタイム | React + TypeScript | 18.3.1 / 5.8.2 |
| ビルドツール | Vite | 6.2.0 |
| スタイリング | TailwindCSS + PostCSS + Autoprefixer | 3.4.17 |
| 3Dグラフィックス | Three.js + @react-three/fiber + drei | 0.160.0 / 8.15.16 / 9.99.0 |
| アニメーション | Framer Motion | 11.0.8 |
| SEO | react-helmet-async | 2.0.5 |
| サイトマップ | vite-plugin-sitemap | 0.8.2 |
| アイコン | lucide-react | 0.344.0 |
| フォント | Google Fonts (Playfair Display, Inter, Noto Serif JP) | CDN |

## アーキテクチャ概要

```
┌──────────────────────────────────────────────┐
│  index.html (エントリーポイント + 静的SEOメタ)    │
│  ├── index.tsx (React mount + HelmetProvider)  │
│  ├── App.tsx (ルーティング + 状態管理)            │
│  │   ├── Home View (Hero + Bento + Ventures)   │
│  │   ├── StoryView (7章の物語)                   │
│  │   ├── ScheduleView (ロードマップ)              │
│  │   ├── ArticlesView (記事一覧)                 │
│  │   └── ArticleDetailView (記事詳細)            │
│  ├── components/ (UI部品)                       │
│  ├── config.ts (サイト設定 + リンク)              │
│  ├── i18n.ts (5言語翻訳)                        │
│  └── types.ts (型定義)                          │
├──────────────────────────────────────────────┤
│  public/                                       │
│  ├── data/ (JSON: story, schedule, articles)   │
│  ├── ko/ (画像アセット)                          │
│  └── llms.txt (AI向けプロフィール)                │
└──────────────────────────────────────────────┘
```

## レンダリング方式
**クライアントサイドSPA (Single Page Application)**
- サーバーサイドレンダリング（SSR）なし
- 静的サイト生成（SSG）なし
- 全てのコンテンツはJavaScriptのランタイムで描画
- `<noscript>` タグ内にフォールバックコンテンツあり

## ドメイン構成（現状）

| 用途 | ドメイン | 状態 |
|------|---------|------|
| 本番サイト（canonical） | ko-takahashi.com | Seo.tsx, index.htmlで使用 |
| サイトマップ生成 | jon-and-coo.com | vite.config.tsで使用（**不整合**） |
| Vercelデプロイ | ko-takahashi-official.vercel.app | llms.txtで使用 |

> **課題**: ドメインが3つに分散しており、`ko-takahashi.com` への統一が必要。

## デプロイ
- ホスティング: Vercel（推定）
- ビルドコマンド: `vite build`
- 出力先: `/dist/`
- 環境変数: `GEMINI_API_KEY`（.env.local）

## 主な外部連携先

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

## プロジェクト企業体

| 名称 | URL | 役割 |
|------|-----|------|
| Jon & Coo Inc. | jonandcoo.jp | CEO & Founder |
| Matsuri Platform | matsuri.group | Lead Architect |
| Matsuri DAO | matsuri-dao.com | Founder |
| The J-Times | j-times.org | Editor in Chief |
