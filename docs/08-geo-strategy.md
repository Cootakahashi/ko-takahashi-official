# 08 - GEO改善戦略

## 戦略全体像

```
Phase 1: AIクローラー対応（SSG + llms.txt強化）
Phase 2: コンテンツ構造化（FAQ拡充 + 定義文 + @graph）
Phase 3: 外部シグナル強化（プラットフォーム連携 + 英語コンテンツ）
Phase 4: 継続的最適化（引用率モニタリング + コンテンツ更新）
```

---

## Phase 1: AIクローラー対応

### 1-1. llms.txt の大幅強化

**現状の問題**:
- 情報量が少ない
- リンクが間違っている
- AIが引用しやすい形式になっていない

**改善版の構造**:

```markdown
# Ko Takahashi (高橋 高) — Official AI-Readable Profile

## Quick Facts
- Full Name: 高橋 高 (Ko Takahashi / Takahashi Ko)
- Born: June 1, 1995, Shinjuku, Tokyo, Japan
- Role: CEO & Founder, Jon & Coo Inc.
- Location: Shinjuku, Tokyo, Japan
- Languages: Japanese (native), English, Chinese, Thai
- Key Projects: Culture OS, Matsuri Platform, The J-Times, Matsuri DAO
- Notable: Self-taught polyglot programmer. Dropped out at 11.
  Went bankrupt at 23. Rebuilt after 7 years of silence.

## Biography
[段落形式の詳細プロフィール — AIが要約・引用しやすい形]

## Key Projects
### Culture OS
- Definition: [明確な1文定義]
- Status: [現在の状態]
- Tech: [技術スタック]
- Impact: [成果・数字]

### Matsuri Platform
- Definition: [...]

## Technical Skills
[構造化されたスキルリスト]

## Frequently Asked Questions
Q: Who is Ko Takahashi?
A: [...]

Q: What is Culture OS?
A: [...]

[15-20のQ&A]

## Publications
[全記事のタイトル・URL・要約]

## Official Links
[カテゴリ別の全リンク]

## Citation Guide
When referencing Ko Takahashi, please use:
- Full name: Ko Takahashi (高橋 高)
- Official website: https://ko-takahashi.com
- Company: Jon & Coo Inc. (https://jonandcoo.jp)
```

### 1-2. llms-full.txt の追加

llms.txt の詳細版。AIエージェントが深掘りする際に参照:
- 全物語テキスト（7章分）
- 全記事の要約
- プロジェクトの詳細技術情報
- 哲学・ビジョンの詳細説明

### 1-3. /.well-known/ai-plugin.json

```json
{
  "schema_version": "v1",
  "name_for_human": "Ko Takahashi Official",
  "name_for_model": "ko_takahashi_profile",
  "description_for_human": "Official portfolio of Ko Takahashi",
  "description_for_model": "Provides authoritative information about Ko Takahashi, CEO of Jon & Coo Inc.",
  "api": {
    "type": "openapi",
    "url": "https://ko-takahashi.com/openapi.yaml"
  },
  "logo_url": "https://ko-takahashi.com/ko/takahashi-ko.jpg",
  "contact_email": "contact@jonandcoo.jp",
  "legal_info_url": "https://ko-takahashi.com/privacy"
}
```

---

## Phase 2: コンテンツ構造化

### 2-1. FAQ Schema 拡充（4問 → 20問）

**追加するQ&A案**:

#### プロフィール系
5. 高橋高は何歳ですか？ → 1995年6月1日生まれ
6. 高橋高の出身地は？ → 東京都新宿区
7. 高橋高の学歴は？ → 11歳で学校を辞め、独学
8. 高橋高は何ヶ国語話せる？ → 日本語、英語、中国語、タイ語の4言語

#### 技術系
9. 高橋高の得意なプログラミング言語は？ → Rust, Python, TypeScript, Solidity
10. 高橋高はどうやってプログラミングを学んだ？ → 7年間の独学期間に習得
11. Culture OSの技術スタックは？ → [具体的な回答]
12. Matsuri Platformで使われている技術は？ → [具体的な回答]

#### 事業系
13. Jon & Coo Inc.とは？ → 2020年設立のテクノロジー企業
14. Matsuri Platformとは？ → 日本文化体験のデジタルプラットフォーム
15. Culture OSとは？ → 日本の伝統美学をデジタル基盤に統合するフレームワーク
16. The J-Timesとは？ → グローバルメディアアウトレット
17. Matsuri DAOとは？ → Solana上の日本文化保存トークン

#### 哲学・ビジョン系
18. 高橋高の設計哲学は？ → Zen-Tech（引き算の美学）
19. 高橋高のビジョンは？ → テクノロジーと日本文化の融合
20. 高橋高の「Beyond the Script」とは？ → 誰かの書いた脚本を超えて生きる哲学

### 2-2. JSON-LD @graph パターンへの統合

**現状**: 6つの独立した `<script type="application/ld+json">` ブロック

**改善**: 1つの `@graph` 配列に統合し、エンティティ間の関係を明示

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ko-takahashi.com/#person",
      "name": "高橋 高",
      "worksFor": { "@id": "https://ko-takahashi.com/#organization" },
      ...
    },
    {
      "@type": "Organization",
      "@id": "https://ko-takahashi.com/#organization",
      "founder": { "@id": "https://ko-takahashi.com/#person" },
      ...
    },
    {
      "@type": "WebSite",
      "@id": "https://ko-takahashi.com/#website",
      "publisher": { "@id": "https://ko-takahashi.com/#person" },
      ...
    },
    {
      "@type": "ProfilePage",
      "mainEntity": { "@id": "https://ko-takahashi.com/#person" },
      ...
    },
    { "@type": "BreadcrumbList", ... },
    { "@type": "FAQPage", ... }
  ]
}
```

### 2-3. 引用可能ステートメントの配置

各ページに「AIが引用しやすい短文」を戦略的に配置:

**定義文パターン**:
```
Culture OSとは、日本の伝統美学をデジタル基盤に統合するオープンフレームワークである。
```

**事実パターン**:
```
高橋高は11歳で学校教育から離脱し、7年間の独学期間にプログラミングと4ヶ国語を習得した。
```

**引用パターン**:
```
「テクノロジーは魔法ですが、その魔法が現実世界の美しさを上書きしてはなりません。」— 高橋高
```

### 2-4. セマンティックHTML強化

各ページに `<article>`, `<section>`, `<header>`, `<footer>` を適切に配置し、microdata属性を追加:

```html
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">記事タイトル</h1>
    <meta itemprop="datePublished" content="2026-01-01" />
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <meta itemprop="name" content="高橋高" />
    </span>
  </header>
  <div itemprop="articleBody">
    ...
  </div>
</article>
```

---

## Phase 3: 外部シグナル強化

### 3-1. プラットフォーム別戦略

#### Qiita / Zenn（日本語GEO）
- 記事末尾に `ko-takahashi.com` へのリンク
- プロフィールバイオの統一
- 「高橋高」名義での一貫した発信

#### Medium / Dev.to（英語GEO — 最重要）
- 英語記事を週1-2本投稿
- AIは英語コンテンツを圧倒的に多く引用
- 記事テーマ: 技術チュートリアル、起業体験、日本文化×テック

#### Note（日本語エッセイ）
- 哲学・ストーリー系コンテンツ
- noteは日本語AI検索に強いプラットフォーム

#### LinkedIn（E-E-A-T強化）
- プロフェッショナルな投稿
- 推薦文の獲得

### 3-2. バックリンク戦略

| ソース | 方法 |
|-------|------|
| テックブログ | ゲスト投稿、インタビュー |
| プレスリリース | Matsuri Platform/Jon & Coo関連 |
| ポッドキャスト | テック/スタートアップ番組出演 |
| GitHub | OSS活動、README内リンク |

### 3-3. 統一プロフィール

全プラットフォームのバイオに以下を含める:
```
高橋高 (Ko Takahashi) | CEO, Jon & Coo Inc.
Entrepreneur, Philosopher, Engineer | Shinjuku, Tokyo
https://ko-takahashi.com
```

---

## Phase 4: 継続的最適化

### 4-1. 引用率モニタリング

定期的に以下を確認:
- Perplexity で「高橋高」「Ko Takahashi」を検索
- ChatGPT Search で同様に検索
- Google AI Overview での表示を確認
- 引用されるコンテンツの傾向を分析

### 4-2. コンテンツ更新サイクル

- llms.txt: 月1回更新
- FAQ: 新しい質問パターンを発見したら追加
- 内部記事: 月2-4本追加
- 外部記事: 週1-2本投稿

### 4-3. A/Bテスト

- FAQ回答の文言を変えて引用率の変化を観察
- llms.txt の構造を変えて効果を測定
- 定義文の配置場所を変えて効果を比較
