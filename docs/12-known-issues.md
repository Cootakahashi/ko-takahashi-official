# 12 - 既知の問題・技術的負債

## Critical（即時対応必要）

### ISSUE-001: SPAがAI検索ボットに不可視
- **症状**: サイトコンテンツがPerplexity、ChatGPT Search等で引用されない
- **原因**: 全コンテンツがクライアントサイドJSで描画。HTMLソースは空の `<div id="root">`
- **影響**: GEOが完全に機能しない
- **対策**: SSG/プリレンダリング導入

### ISSUE-002: サイトマップのドメインが間違い
- **症状**: サイトマップ内のURLが `jon-and-coo.com` を指す
- **原因**: `vite.config.ts` の `hostname` が未修正
- **影響**: Google が正しいURLをインデックスできない
- **対策**: hostname を `ko-takahashi.com` に変更

### ISSUE-003: URLが変わらない
- **症状**: どのページに遷移してもURL は `/` のまま
- **原因**: ルーティングが `useState` ベースで、History API未使用
- **影響**: ディープリンク不可、SEOインデックス不可、戻るボタン不可
- **対策**: react-router-dom 導入 or pushState 手動実装

---

## High（早期対応推奨）

### ISSUE-004: OG画像がプレースホルダー
- **症状**: config.ts の ogImage が `picsum.photos`
- **影響**: SNSシェア時にランダム画像が表示される場合がある
- **対策**: 実画像URLに変更

### ISSUE-005: canonical URL が全ページ共通
- **症状**: `/story`, `/articles` 等が全て `https://ko-takahashi.com` を指す
- **影響**: 個別ページのインデックスが困難
- **対策**: Seo.tsx でページ別canonical生成

### ISSUE-006: 画像が未圧縮（合計12.4MB+）
- **ファイル**: `public/ko/` 内の画像群
- **影響**: LCP悪化、モバイルでの読み込み遅延
- **対策**: WebP変換 + 圧縮

### ISSUE-007: SearchAction が架空のURL
- **症状**: WebSite スキーマに `ko-takahashi.com/search?q=...` があるが検索機能なし
- **影響**: 構造化データバリデーションエラー
- **対策**: 検索機能実装 or スキーマから削除

### ISSUE-008: llms.txt のリンクが間違い
- **LinkedIn**: `YOUR_CUSTOM_ID_HERE`（未設定）
- **サイトURL**: Vercel URL使用
- **対策**: 正しいURL に修正

---

## Medium（計画的に対応）

### ISSUE-009: hreflang タグ未設定
- **影響**: 5言語対応だが言語別ページのSEOが最適化されていない
- **対策**: Seo.tsx に hreflang タグ追加

### ISSUE-010: アナリティクス未導入
- **影響**: 効果測定不可、改善サイクルが回せない
- **対策**: GA4 + カスタムイベント導入

### ISSUE-011: コンテンツの二重管理
- **症状**: StoryView.tsx 内にハードコードされた7章 vs story.json の3セクション
- **影響**: コンテンツ更新時に複数箇所の変更が必要
- **対策**: 全コンテンツをJSONに統一

### ISSUE-012: 型安全性の不足
- **症状**: データの型が `any` で定義（`storyData: any`, `scheduleData: any` 等）
- **影響**: ランタイムエラーのリスク
- **対策**: JSONスキーマに対応するTypeScript型を定義

### ISSUE-013: Three.js が初回ロードをブロック
- **症状**: Hero3D がメインバンドルに含まれている
- **影響**: FCP/LCPの遅延
- **対策**: React.lazy + Suspense で動的インポート

### ISSUE-014: フォント読み込み戦略
- **症状**: 3つのGoogle Fontsを一括読み込み
- **影響**: レンダーブロッキングの可能性
- **対策**: `font-display: swap` は設定済みだが、preload の検討

---

## Low（余裕がある時に対応）

### ISSUE-015: 未使用コンポーネントのエクスポート
- **症状**: `GlitchText`, `MagneticButton`, `TextReveal` 等がエクスポートされているが未使用
- **影響**: バンドルサイズの微増
- **対策**: ツリーシェイキングで除去されるはずだが確認必要

### ISSUE-016: importmap の React バージョン不整合
- **症状**: index.html の importmap が React 18.2.0 を指すが、package.json は 18.3.1
- **影響**: 開発時と本番のバージョン不一致の可能性
- **対策**: importmap の更新 or 削除（Viteが管理するため）

### ISSUE-017: scheduleData が2025年で止まっている
- **症状**: schedule.json のイベントが全て2025年
- **影響**: 古い情報として見なされる可能性
- **対策**: 最新のイベント情報に更新

### ISSUE-018: Contact/Privacy リンクがダミー
- **症状**: フッターの CONTACT, PRIVACY が `href="#"`
- **影響**: ユーザー信頼性低下
- **対策**: 実際のページ/情報を設置

---

## セキュリティ注意事項

### SEC-001: 環境変数の扱い
- `GEMINI_API_KEY` が `process.env` でクライアントに公開される設定
- Viteの `define` でビルド時に埋め込まれる
- **対策**: APIキーはサーバーサイドのみで使用すべき

### SEC-002: 外部CDNへのESM依存
- index.html の importmap が `esm.sh` に依存
- CDN障害時にサイトが動作しなくなるリスク
- **対策**: Viteバンドルに統合（本番では不要のはず）
