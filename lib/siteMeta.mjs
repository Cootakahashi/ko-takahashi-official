/**
 * サイトの「住所」と「どのページがどの言語で実在するか」の正典。
 *
 * 🔴 なぜ .mjs なのか
 * この表は **ビルドスクリプト（node）とアプリ（ブラウザ）の両方**から読む必要がある。
 *   - scripts/sitemap.mjs   … node が実行する。.ts は読めない
 *   - components/Seo.tsx    … Vite がバンドルする
 * 素の .mjs（node 組み込みモジュールを一切使わない純粋なデータ）にしておくと、
 * 両方から同じ1本を読める。2箇所に表を置くと、必ず片方だけ古くなる。
 */

export const SITE_URL = 'https://www.ko-takahashi.jp';

/**
 * 自分のホスト。canonical / hreflang / og:url / sitemap の <loc> が
 * ここ以外を指したら scripts/seo-guard.mjs がビルドを止める。
 * 🔴 2026-08-31 まで canonical が別人の ko-takahashi.com を指していた（12 日間）。
 *    「自ドメインとは何か」を SITE_URL から導出し、手書きの散在をなくす。
 */
export const SITE_HOST = new URL(SITE_URL).hostname; // www.ko-takahashi.jp
export const OWNED_HOSTS = [SITE_HOST, SITE_HOST.replace(/^www\./, '')]; // apex は www へ 307

/** lib/router.ts と揃える。 */
export const routes = ['/', '/story', '/schedule', '/articles', '/about', '/links'];

/** types.ts の LanguageCode と揃える。UI の言語切替に出す全言語。 */
export const languages = ['ja', 'en', 'zh', 'ko', 'th'];

export const DEFAULT_LANG = 'ja';

/**
 * 🔴 ルートごとに「本当に中身が違う言語」だけを持つ表。
 *
 * 願望ではなく実測値。各ルート × 各言語を実際にブラウザで描画し、
 * 日本語版と本文が1文字でも違うかを比較して作った（2026-08-31 計測）:
 *
 *     /          ja 3,103字 / en zh ko th すべて別物         → 5言語
 *     /about     ja 1,293字 / en 2,230字（別物）
 *                             zh ko th は **完全一致**       → 2言語
 *     /story     en zh ko th すべて ja と **完全一致**       → 1言語
 *     /schedule  同上                                        → 1言語
 *     /articles  同上                                        → 1言語
 *     /links     同上（LinksView は lang を参照していない）  → 1言語
 *
 * なぜ実在するものしか申告しないのか:
 * hreflang は「同じ内容の別言語版」を指す印。中身が同一のURLを別言語版として
 * 申告すると Google はそのクラスタごと無視することがあり、重複URLでクロールも薄まる。
 * **数を増やすほど強くなるものではない。正確さが効く。**
 *
 * 翻訳を足したら、この表に言語を1つ足すだけでよい。
 * sitemap・hreflang・prerender の3つが同時に追随する。
 */
export const LANG_AVAILABILITY = {
  '/': ['ja', 'en', 'zh', 'ko', 'th'],
  '/about': ['ja', 'en'],
  '/story': ['ja'],
  '/schedule': ['ja'],
  '/articles': ['ja'],
  '/links': ['ja'],
};

/** そのルートで実在する言語。表に無いルートは日本語のみとみなす。 */
export function langsFor(route) {
  return LANG_AVAILABILITY[route] || [DEFAULT_LANG];
}

/**
 * ルートと言語からURLを作る。
 * 🔴 既定言語（ja）にはクエリを付けない。canonical と同じ形にするため。
 *    ここが食い違うと hreflang の自己参照が canonical と一致せず、
 *    Google は hreflang 集合ごと無効にする。
 */
export function urlFor(route, lang) {
  const path = route === '/' ? '' : route;
  return lang === DEFAULT_LANG ? `${SITE_URL}${path}` : `${SITE_URL}${path}?lang=${lang}`;
}

/** 実際に生成・申告すべき (ルート, 言語) の組。 */
export function pagePairs() {
  return routes.flatMap((route) => langsFor(route).map((lang) => ({ route, lang })));
}

/**
 * 記事詳細で実在する言語。
 * public/data/blog_posts.json は全記事が ja / en の両方を持つ（実測: 6本すべて、
 * 日英で本文が別物）。slug の一覧はデータ側が正典なので、ここでは持たない
 * （持つと必ず片方が古くなる）。node 側の scripts/sitemap.mjs が JSON から読む。
 */
export const ARTICLE_LANGS = ['ja', 'en'];

/** 記事詳細のパス。 */
export const articleRoute = (slug) => `/articles/${slug}`;
