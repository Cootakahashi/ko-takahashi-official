# Ko Takahashi Official — プロジェクトドキュメント

## 目次

| # | ドキュメント | 概要 |
|---|------------|------|
| 00 | [プロジェクト概要](./00-overview.md) | 技術スタック、ドメイン構成、外部連携先、アーキテクチャ全体像 |
| 01 | [アーキテクチャ詳細](./01-architecture.md) | ディレクトリ構造、ルーティング、データフロー、コンポーネント依存、状態管理、ビルド設定 |
| 02 | [コンポーネント詳細](./02-components.md) | 全13コンポーネントの責務、Props、内部ロジック、使用技術 |
| 03 | [データモデル・型定義](./03-data-models.md) | TypeScript型、JSONスキーマ（articles/blog_posts/story/schedule）、i18n構造、設定データ |
| 04 | [SEO現状分析](./04-seo-current-state.md) | 実装済み施策一覧、10個の致命的問題点、Search Console確認事項 |
| 05 | [GEO現状分析](./05-geo-current-state.md) | AI検索エンジンの仕組み、現状の対応状況、引用パターン分析 |
| 06 | [スタイリング・デザインシステム](./06-styling-design-system.md) | カラーパレット、タイポグラフィ、グラスモーフィズム、アニメーション、レスポンシブ設計 |
| 07 | [SEO改善戦略](./07-seo-strategy.md) | Phase 0-4の段階的SEO改善計画。技術的SEO、コンテンツSEO、分析基盤 |
| 08 | [GEO改善戦略](./08-geo-strategy.md) | llms.txt強化、FAQ拡充、@graphパターン、引用可能ステートメント、外部シグナル |
| 09 | [プラットフォーム連携戦略](./09-platform-strategy.md) | 8プラットフォームの個別戦略、クロスポスト戦略、統一プロフィール、KPI |
| 10 | [実装ロードマップ](./10-implementation-roadmap.md) | P0-P3の優先度別タスク一覧、実装チェックリスト、効果予測 |
| 11 | [コンテンツ棚卸し](./11-content-inventory.md) | 全コンテンツ一覧、StoryView7章概要、ブログ記事詳細、ギャップ分析 |
| 12 | [既知の問題・技術的負債](./12-known-issues.md) | 18個の問題（Critical 3, High 5, Medium 6, Low 4）+ セキュリティ注意事項 |

## ドメイン統一方針

全てのドメインを **`ko-takahashi.com`** に統一する。

| 現状 | 統一後 |
|------|--------|
| vite.config.ts: `jon-and-coo.com` | `ko-takahashi.com` |
| llms.txt: `ko-takahashi-official.vercel.app` | `ko-takahashi.com` |
| config.ts ogImage: `picsum.photos` | `ko-takahashi.com/ko/takahashi-ko.jpg` |

## 最優先実装事項

1. **P0**: ドメイン統一（vite.config.ts, llms.txt, config.ts）
2. **P0**: canonical URL のページ別化
3. **P1**: llms.txt 大幅強化（GEO即効性）
4. **P1**: FAQ Schema 20問拡充
5. **P2**: プリレンダリング導入（SEO/GEO根本解決）
