/**
 * sitemap.xml を書き出す。**唯一の生成器。**
 *
 * 🔴 なぜ独立したスクリプトなのか
 *
 * 1. `vite-plugin-sitemap` の i18n は `suffix`(/about/en) か `prefix`(/en/about)
 *    しか出せない。このサイトは言語を `?lang=xx` のクエリで持つ（lib/router.ts）ため、
 *    プラグインに任せると **存在しないURL** を検索エンジンに渡すことになる。
 *    （SPA のフォールバックがどんなパスにも 200 を返すので、404 では気づけない）
 *
 * 2. `vercel.json` に buildCommand が無く、Vercel は package.json の `build` を実行する。
 *    prerender の中に置くと **本番ビルドでは一度も走らない**。だから `build` に組み込む。
 *
 * ルート一覧はここが正典。prerender.mjs もここから読む（2箇所で持たない）。
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** lib/router.ts と揃える。 */
export const routes = ['/', '/story', '/schedule', '/articles', '/about', '/links'];

/** types.ts の LanguageCode と揃える。 */
export const languages = ['ja', 'en', 'zh', 'ko', 'th'];

export const DEFAULT_LANG = 'ja';
export const SITE_URL = 'https://www.ko-takahashi.jp';

const urlFor = (route, lang) => {
  const path = route === '/' ? '' : route;
  return lang === DEFAULT_LANG ? `${SITE_URL}${path}` : `${SITE_URL}${path}?lang=${lang}`;
};

export function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [];

  for (const route of routes) {
    for (const lang of languages) {
      const alts = languages
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(route, l)}" />`)
        .join('\n');
      entries.push(
        [
          '  <url>',
          `    <loc>${urlFor(route, lang)}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>`,
          `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>`,
          alts,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(route, DEFAULT_LANG)}" />`,
          '  </url>',
        ].join('\n')
      );
    }
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries.join('\n'),
    '</urlset>',
    '',
  ].join('\n');
}

export function writeSitemap(distDir = join(__dirname, '..', 'dist')) {
  const xml = buildSitemap();
  writeFileSync(join(distDir, 'sitemap.xml'), xml);
  const count = routes.length * languages.length;
  console.log(`✓ sitemap.xml — ${routes.length} routes × ${languages.length} langs = ${count} URLs`);
  return count;
}

// 直接実行されたときだけ書き出す（import 時は何もしない）
if (process.argv[1] && process.argv[1].endsWith('sitemap.mjs')) {
  writeSitemap();
}
