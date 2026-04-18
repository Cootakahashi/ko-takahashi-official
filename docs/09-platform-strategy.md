# 09 - プラットフォーム連携戦略

## 連携全体図

```
                    ko-takahashi.com
                   (ハブ・権威の中心)
                    ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
        ┌───┬───┬───┼───┼───┬───┬───┬───┐
        │   │   │   │   │   │   │   │   │
      Qiita Zenn Medium Dev Note LinkedIn X  IG/Pin
        │   │   │       │   │
        └───┼───┘       └───┘
            │ (相互引用で権威構築)
            └── 技術記事ネットワーク
```

**原則**: 全プラットフォームは `ko-takahashi.com` へのバックリンク源。各プラットフォームの強みを活かしつつ、サイトをハブとして機能させる。

---

## プラットフォーム別詳細戦略

### 1. Qiita（技術記事 — 日本語SEO/GEO）

**アカウント**: qiita.com/rustprogram2022
**現在の記事数**: 2記事

**戦略**:
- **投稿頻度**: 月2-4本
- **記事形式**: 実践的チュートリアル、技術深掘り
- **ターゲットタグ**: `Rust`, `Python`, `Solana`, `AI`, `TypeScript`

**サイト連携**:
- 記事末尾に「筆者プロフィール」セクション追加
  ```
  ## 筆者
  高橋高 (Ko Takahashi) — Jon & Coo Inc. CEO
  ポートフォリオ: https://ko-takahashi.com
  ```
- Qiita記事のサマリーを `articles.json` に追加してサイトからリンク
- プロフィールに `ko-takahashi.com` 設定

**記事案**:
| タイトル | タグ |
|---------|------|
| 「Rustで始めるSolanaプログラム開発」 | Rust, Solana, Web3 |
| 「Three.jsでポートフォリオをリッチにする実践ガイド」 | Three.js, React, WebGL |
| 「Python + Django でAI記憶システムを構築」 | Python, Django, AI |
| 「TypeScriptの型システム活用術」 | TypeScript, React |

---

### 2. Zenn（ナレッジ共有 — 日本語GEO重要）

**アカウント**: zenn.dev/rust_start
**現在の記事数**: 2記事

**戦略**:
- **投稿頻度**: 月2本
- **記事形式**: 深い技術解説、設計哲学
- **Zenn Books**: シリーズ化コンテンツ → 長期的なSEO資産

**Zenn Books 案**:
| タイトル | 章数 | テーマ |
|---------|------|-------|
| 「Culture OS 開発日記」 | 10+ | 開発過程・設計思想 |
| 「Rust×Solana入門」 | 8+ | 技術チュートリアル |
| 「個人ブランドサイトの作り方」 | 6+ | Vite+React+Three.js |

**サイト連携**: Qiita同様のプロフィール・リンク戦略

---

### 3. Medium（英語コンテンツ — グローバルGEO最重要）

**アカウント**: medium.com/@ko_takahashi
**現在の記事数**: 不明

**戦略**:
- **投稿頻度**: 週1本
- **言語**: 英語のみ
- **記事形式**: Thought leadership、技術エッセイ

**重要度が高い理由**:
- AI検索エンジンは英語コンテンツを圧倒的に多く引用
- Medium は Perplexity/ChatGPT Search に頻繁に引用されるドメイン
- 英語圏での「Ko Takahashi」ブランド構築

**Publications への投稿**:
- Better Programming
- The Startup
- Towards Data Science
- Level Up Coding

**記事案**:
| タイトル | テーマ |
|---------|-------|
| "Why I Dropped Out at 11 and Built a Tech Company" | 起業ストーリー |
| "Culture OS: Bringing Japanese Aesthetics to Digital Design" | プロジェクト紹介 |
| "The Zen-Tech Design Philosophy" | デザイン哲学 |
| "Building with Rust and Solana: Lessons from the Trenches" | 技術 |
| "7 Years of Silence: How I Taught Myself to Code" | 独学体験 |

**サイト連携**:
- 記事内に `ko-takahashi.com` へのバックリンク
- Bio: "Read more at ko-takahashi.com"

---

### 4. Dev.to（英語テックコミュニティ）

**アカウント**: dev.to/ko_takahashi
**現在の記事数**: 不明

**戦略**:
- **投稿頻度**: 月2本
- **記事形式**: チュートリアル、ハウツー
- **クロスポスト**: Qiita/Zenn 記事の英訳版

**Dev.to の強み**:
- コミュニティエンゲージメントが高い
- Google検索でのインデックス速度が速い
- 技術者からの信頼性シグナル

---

### 5. Note（日本語エッセイ — 日本語GEO）

**アカウント**: note.com/ko_takahashi_jp

**戦略**:
- **投稿頻度**: 月2本
- **記事形式**: エッセイ、物語、哲学
- **テーマ**: ストーリー系（StoryViewのコンテンツを再構成）

**Note の強み**:
- 日本語AI検索に強い（Perplexity 日本語版等）
- SEOドメインオーソリティが高い
- クリエイター/文化系の読者層

**マガジン作成**:
| マガジン名 | コンテンツ |
|-----------|----------|
| 「テクノロジーと哲学」 | Zen-Tech、Culture OS哲学 |
| 「台本のない旅」 | 人生の物語、起業体験 |

---

### 6. LinkedIn（E-E-A-T・権威性構築）

**アカウント**: linkedin.com/in/ko-takahashi-jp

**戦略**:
- **投稿頻度**: 週2-3回
- **形式**: 短文投稿（300-500文字）、記事リンク共有
- **Recommendations（推薦文）**: 5件以上獲得を目標

**投稿パターン**:
| 曜日 | 形式 | 内容 |
|------|------|------|
| 月 | 知見共有 | 技術的な学び・インサイト |
| 水 | プロジェクト進捗 | Matsuri/Culture OS の更新 |
| 金 | 記事リンク | 他プラットフォームの記事共有 |

**Profile最適化**:
- Headline: "CEO at Jon & Coo Inc. | Culture OS Architect | Bridging Japanese Culture & Technology"
- Summary: 詳細なプロフィール + `ko-takahashi.com` リンク
- Featured: サイト、主要記事をピン留め

---

### 7. X (Twitter)（リアルタイム・発見性）

**アカウント**: x.com/zes55ch

**戦略**:
- **投稿頻度**: 毎日1-3回
- **形式**: スレッド、画像付き投稿
- **プロフィールリンク**: ko-takahashi.com

**投稿パターン**:
- 技術スレッド → 最後にサイトリンク
- プロジェクト更新
- 日本語 + 英語のバイリンガル投稿
- 引用可能なステートメント（GEO向け）

---

### 8. Instagram / Pinterest（ビジュアルブランディング）

**Instagram**: instagram.com/ko_takahashi_/
**Pinterest**: jp.pinterest.com/kotakahashi_japan/

**Instagram 戦略**:
- フィード: プロジェクトビジュアル、デザイン哲学
- ストーリー: サイト更新・記事公開の告知
- Bio: `ko-takahashi.com`
- リンク in Bio: Linktree等で全リンク集約

**Pinterest 戦略**:
- インフォグラフィック（技術スタック、プロジェクト概要）
- デザインシステムのビジュアル
- ボード: "Zen-Tech Design", "Culture OS", "Tech Stack"

---

## クロスプラットフォーム連携ルール

### 統一プロフィール

全プラットフォームに以下を統一的に含める:

```
名前: 高橋高 (Ko Takahashi)
肩書: CEO & Founder, Jon & Coo Inc.
一行説明: Bridging Japanese culture and technology through Culture OS.
リンク: https://ko-takahashi.com
プロフィール画像: takahashi-ko.jpg（統一画像）
```

### コンテンツ配信フロー

```
1. ko-takahashi.com に元記事（canonical）を公開
2. 日本語版 → Qiita/Zenn/Note にクロスポスト
3. 英語版 → Medium/Dev.to にクロスポスト
4. 各記事のサマリー → articles.json に追加
5. SNS（X, LinkedIn, Instagram）で告知
6. 各記事から ko-takahashi.com へバックリンク
```

### canonical URL ルール

| パターン | canonical | クロスポスト先の対応 |
|---------|----------|-------------------|
| サイト発の記事 | ko-takahashi.com | 各プラットフォームでcanonical設定 |
| プラットフォーム発の記事 | 各プラットフォーム | サイトからリンク（canonical設定なし） |
| サイト独自コンテンツ | ko-takahashi.com | クロスポストなし |

---

## KPI

| 指標 | 現在 | 3ヶ月目標 | 6ヶ月目標 |
|------|------|----------|----------|
| Qiita記事数 | 2 | 8 | 20 |
| Zenn記事数 | 2 | 6 | 15 |
| Medium記事数 | 0 | 12 | 24 |
| Dev.to記事数 | 0 | 6 | 12 |
| Note記事数 | 0 | 4 | 10 |
| 内部記事数 | 2 | 6 | 12 |
| LinkedIn投稿 | — | 24 | 48 |
| バックリンク数 | — | 30+ | 80+ |
