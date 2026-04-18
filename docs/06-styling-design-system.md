# 06 - スタイリング・デザインシステム

## デザインコンセプト

**「Obsidian & Gold」** — 漆黒の闇に金色の光。禅の静寂とデジタルの精緻さを融合。

### 設計思想
- **Zen-Tech**: 引き算の美学。情報ノイズを排除し、本質のみを表示
- **Cinematic**: 映画的な演出。フィルムグレイン、パララックス、3D空間
- **Japanese Ma (間)**: 意図的な余白。呼吸する空間

## カラーパレット

### Tailwind カスタムカラー (tailwind.config.js)

| 名前 | HEX | 用途 |
|------|-----|------|
| `obsidian` | `#050505` | 背景の基調色。純粋な黒に近い |
| `gold` | `#D4AF37` | アクセント。インタラクティブ要素、CTA |
| `gold-light` | `#E6C860` | ゴールドのライトバリエーション |
| `gold-dark` | `#B8942E` | ゴールドのダークバリエーション |
| `sumi` | `#1a1a1a` | 墨色。カードやセクション背景 |

### 実際に使用されている追加カラー

| カラー | 用途 |
|--------|------|
| `#0F172A` | `bg-obsidian` の実際の使用色（App.tsx。slate-900系） |
| `white/50〜90%` | テキスト（不透明度で階層表現） |
| `amber-400/500` | 温かいアクセント（セクション見出し） |
| `rose-400/950` | 「転落」テーマカラー |
| `blue-400/950` | 「沈黙」テーマカラー |
| `emerald-400/950` | 「ビジョン」テーマカラー |
| `violet-400/950` | Whitepaper/DAOテーマカラー |

> **注意**: `tailwind.config.js` の `obsidian: '#050505'` と App.tsx の `bg-obsidian` (`#0F172A`相当) に不整合がある可能性。

## タイポグラフィ

### フォントファミリー

| Tailwindクラス | フォント | 用途 |
|---------------|---------|------|
| `font-serif` | Playfair Display | 見出し、ヒーロー文字、引用 |
| `font-sans` | Inter | 本文、UI要素 |
| `font-jp` | Noto Serif JP | 日本語テキスト |
| `font-mono` | (システム) | ラベル、カテゴリバッジ、技術テキスト |

### フォントウェイト
- 300: `font-light` — サブテキスト
- 400: `font-normal` — 本文
- 600: `font-semibold` — 強調
- 700: `font-bold` — ヘッドライン

### テキストサイズパターン

| 要素 | サイズ | クラス |
|------|-------|-------|
| ヒーローキャッチフレーズ | 8vw → 3.5vw | `text-[8vw] md:text-[4vw] lg:text-[3.5vw]` |
| セクション見出し | 3xl → 5xl | `text-3xl md:text-5xl` |
| カード見出し | xl → 3xl | `text-xl` / `text-3xl` |
| 本文 | sm → lg | `text-sm` / `text-lg` |
| ラベル/バッジ | 9px → 12px | `text-[9px]` / `text-xs` |

## グラスモーフィズム

### GlassCard パターン
```css
backdrop-blur-xl
bg-black/40
border border-white/10
shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
rounded-sm
```

### バリエーション
- **Nav**: `bg-black/60 backdrop-blur-md border-white/20 rounded-full`
- **Card hover**: `hover:bg-white/[0.07] hover:border-gold/40`
- **Badge active**: `bg-gold text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.6)]`

## アニメーション

### CSS カスタムアニメーション (index.css)

```css
/* ソフトグロー */
@keyframes soft-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* フェードインアップ */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 温かいパルス */
@keyframes warm-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}
```

### Framer Motion パターン

#### Staggered Entrance
```typescript
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: index * 0.15, duration: 0.6 }}
```

#### Spring Physics (CustomCursor)
```typescript
const springConfig = { damping: 25, stiffness: 200 };
const cursorX = useSpring(mouseX, springConfig);
```

#### Hero Slide-in
```typescript
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
```

### 3D エフェクト

#### フリップカード (HybridBentoGrid)
```css
perspective-1000
transform: rotateY(180deg)
backface-visibility: hidden
transition-duration: 700ms
```

#### パーティクル (Hero3D)
- 3000 DawnParticles（球状分布、回転）
- 500 FloatingDust（左→右のフロー）
- マウスパララックス（lerp: 0.05）

## レスポンシブ設計

### ブレークポイント

| プレフィックス | 幅 | 用途 |
|--------------|-----|------|
| (デフォルト) | < 768px | モバイル |
| `md:` | >= 768px | タブレット |
| `lg:` | >= 1024px | デスクトップ |

### グリッドパターン

| セクション | モバイル | タブレット | デスクトップ |
|-----------|---------|-----------|------------|
| Hero | 12col 1行 | 7col + 4col | 同左 |
| BentoGrid | 1col | 3col | 3col |
| Ventures | 1col | 2col | 4col |
| Archive | 1col | 2col | 3col |
| Skills | 1col | 2col | 4col |

### モバイル固有UI
- 簡易ナビメニュー（Story/Events ボタン）
- カスタムカーソル非表示（`cursor-none md:cursor-none`）
- フォントサイズ縮小

## 特殊CSSユーティリティ

```css
/* フィルムグレイン効果 */
.film-grain { /* ... */ }

/* 3Dパースペクティブ */
.perspective-1000 { perspective: 1000px; }

/* 縦書きモード */
.writing-vertical { writing-mode: vertical-rl; }

/* 選択テキスト */
::selection { background: #D4AF37; color: #050505; }
```
