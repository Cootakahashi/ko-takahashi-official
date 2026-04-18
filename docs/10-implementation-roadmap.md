# 10 - 実装ロードマップ

## 優先度定義

- **P0 (Critical)**: SEO/GEO基盤が壊れている。即修正。
- **P1 (High)**: 効果が大きく、比較的低コスト。1週間以内。
- **P2 (Medium)**: 中期的な効果。2-4週間で実施。
- **P3 (Low)**: 長期的な効果。1-3ヶ月で段階的に。

---

## P0: 即時修正（所要時間: 1-2時間）

### P0-1. サイトマップ hostname 修正
- **ファイル**: `vite.config.ts`
- **変更**: `hostname: 'https://jon-and-coo.com'` → `'https://ko-takahashi.com'`
- **効果**: Google がサイトマップを正しく認識

### P0-2. OG画像プレースホルダー修正
- **ファイル**: `config.ts`
- **変更**: `ogImage: "https://picsum.photos/1200/630"` → `"https://ko-takahashi.com/ko/takahashi-ko.jpg"`
- **効果**: SNSシェア時に正しい画像表示

### P0-3. llms.txt のリンク修正
- **ファイル**: `public/llms.txt`
- **変更**:
  - LinkedIn URL修正: `YOUR_CUSTOM_ID_HERE` → `ko-takahashi-jp`
  - Vercel URL → `https://ko-takahashi.com`
- **効果**: AI検索での正しいリンク参照

### P0-4. ページ別 canonical URL
- **ファイル**: `components/Seo.tsx`
- **変更**: `url` 変数をページタイプに応じて変更
- **効果**: 各ページが個別にインデックスされる

---

## P1: 1週間以内（所要時間: 各2-4時間）

### P1-1. llms.txt 大幅強化
- Quick Facts セクション追加
- FAQ 15-20問追加
- 記事リスト追加
- Citation Guide 追加
- **効果**: GEO即効性。AI検索での引用率大幅向上

### P1-2. JSON-LD @graph パターン統合
- 6つの独立ブロック → 1つの @graph 配列
- エンティティ間の @id 参照を整備
- **効果**: AIがエンティティ関係を正確に理解

### P1-3. FAQ Schema 拡充（4問 → 20問）
- プロフィール系、技術系、事業系、哲学系の質問を追加
- **効果**: AI検索での回答範囲拡大

### P1-4. robots.txt 修正
- Sitemap ディレクティブのドメイン修正
- **効果**: クローラーの正しいサイトマップ参照

---

## P2: 2-4週間（技術的改善）

### P2-1. プリレンダリング導入
- `vite-plugin-prerender` または類似ツール
- 対象: `/`, `/story`, `/schedule`, `/articles`
- ビルド時にHTMLを生成
- **効果**: クローラーがJSなしでコンテンツ取得可能

### P2-2. History API 対応（URL変更）
- react-router-dom または手動 pushState
- `/story`, `/schedule`, `/articles`, `/articles/:id` のURL対応
- **効果**: ディープリンク、戻るボタン、SEOインデックス

### P2-3. 画像最適化
- 全画像をWebP変換
- サイズ圧縮（合計12MB → 500KB以下）
- `loading="lazy"` 属性追加
- **効果**: Core Web Vitals (LCP) 大幅改善

### P2-4. hreflang タグ追加
- 5言語 + x-default
- **効果**: 多言語SEO最適化

### P2-5. GA4 導入
- index.html にタグ追加
- カスタムイベントトラッキング
- **効果**: 効果測定の基盤構築

### P2-6. Three.js 遅延読み込み
- React.lazy + Suspense
- **効果**: 初回ロード速度向上

---

## P3: 1-3ヶ月（コンテンツ・外部連携）

### P3-1. 内部記事追加（10本以上）
- blog_posts.json に記事追加
- articles.json にメタデータ追加
- 各記事にArticle Schema
- **効果**: インデックスページ増、ロングテール流入

### P3-2. llms-full.txt 追加
- 全物語テキスト
- 詳細プロジェクト情報
- **効果**: AI検索での深掘り対応

### P3-3. /about ページ独立化
- E-E-A-T シグナル集約
- **効果**: ナレッジパネル表示促進

### P3-4. 各プラットフォームプロフィール統一
- 全8プラットフォームのバイオ統一
- ko-takahashi.com リンク設定
- **効果**: エンティティ認識強化

### P3-5. Medium英語記事投稿開始
- 週1本の英語記事
- **効果**: グローバルGEO、英語圏AI検索での引用

### P3-6. SearchAction 対応
- 検索機能の実装 or スキーマから削除
- **効果**: 構造化データエラー解消

---

## 実装チェックリスト

```
[ ] P0-1: vite.config.ts hostname修正
[ ] P0-2: config.ts ogImage修正
[ ] P0-3: llms.txt リンク修正
[ ] P0-4: Seo.tsx canonical URL修正
[ ] P1-1: llms.txt 大幅強化
[ ] P1-2: JSON-LD @graph統合
[ ] P1-3: FAQ Schema 20問に拡充
[ ] P1-4: robots.txt 修正
[ ] P2-1: プリレンダリング導入
[ ] P2-2: History API対応
[ ] P2-3: 画像WebP変換・圧縮
[ ] P2-4: hreflang タグ追加
[ ] P2-5: GA4導入
[ ] P2-6: Three.js遅延読み込み
[ ] P3-1: 内部記事10本追加
[ ] P3-2: llms-full.txt作成
[ ] P3-3: /aboutページ
[ ] P3-4: プラットフォームプロフィール統一
[ ] P3-5: Medium英語記事開始
[ ] P3-6: SearchAction対応
```

---

## 効果予測

| Phase | 期待効果 |
|-------|---------|
| P0完了後 | サイトマップ・OG画像が正しく機能。基本的なSEOシグナル修復 |
| P1完了後 | AI検索での「高橋高」引用率が大幅向上。FAQがAI回答に反映 |
| P2完了後 | Google検索での個別ページインデックス。Core Web Vitals改善 |
| P3完了後 | ロングテール流入開始。英語圏でのGEO効果。エンティティ認識確立 |
