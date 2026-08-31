/**
 * sitemap.xml を書き出す。**唯一の生成器。**
 *
 * 🔴 なぜ独立したスクリプトなのか
 *
 * 1. `vite-plugin-sitemap` の i18n は `suffix`(/about/en) か `prefix`(/en/about)
 *    しか出せない。このサイトは言語を `?lang=xx` のクエリで持つ（lib/router.ts）ため、
 *    プラグインに任せると **存在しないURL** を検索エンジンに渡すことになる
 *    （SPA のフォールバックがどんなパスにも 200 を返すので、404 では気づけない）。
 *
 * 2. `vercel.json` に buildCommand が無く、Vercel は package.json の `build` を実行する。
 *    prerender の中に置くと **本番ビルドでは一度も走らない**。だから `build` に組み込む。
 *
 * ルート一覧はここが正典。prerender.mjs と components/Seo.tsx もここから読む。
 */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 🔴 ルート・言語・実在言語の表は lib/siteMeta.mjs が正典。ここでは持たない。
//    components/Seo.tsx も同じものを読むので、申告と描画が必ず一致する。
import {
  SITE_URL,
  routes,
  languages,
  DEFAULT_LANG,
  langsFor,
  urlFor,
  pagePairs,
} from '../lib/siteMeta.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// prerender.mjs が従来どおり import できるよう、そのまま再輸出する。
export { SITE_URL, routes, languages, DEFAULT_LANG, langsFor, urlFor, pagePairs };

export function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [];

  for (const route of routes) {
    const avail = langsFor(route);
    for (const lang of avail) {
      // 代替言語は「実在する言語」だけ。1言語しか無いルートでは hreflang を出さない
      // （自分1件だけの hreflang は情報量ゼロで、誤解のもとになる）。
      const alts =
        avail.length > 1
          ? avail
              .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(route, l)}" />`)
              .concat([
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(route, DEFAULT_LANG)}" />`,
              ])
              .join('\n')
          : null;

      entries.push(
        [
          '  <url>',
          `    <loc>${urlFor(route, lang)}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>`,
          `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>`,
          alts,
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n')
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


/**
 * 🔴 vercel.json の言語 rewrite が実測表とズレていないか検査する。
 *
 * `vercel.json` は Vercel が **ビルド前に** 読むため、この表から自動生成できない。
 * つまり手で書いた rewrite と `LANG_AVAILABILITY` は、放っておくと必ずズレる。
 * ズレると `?lang=en` が日本語のHTMLを返し、しかも **何のエラーも出ない**
 * （sitemap と hreflang は正しいままなので、外からは気づけない）。
 *
 * だからビルドを止める。静かに壊れるより、うるさく落ちる方がいい。
 */
export function checkVercelRewrites() {
  const vercelPath = join(__dirname, '..', 'vercel.json');
  if (!existsSync(vercelPath)) return;
  const cfg = JSON.parse(readFileSync(vercelPath, 'utf-8'));
  const declared = new Set(
    (cfg.rewrites || [])
      .filter((r) => Array.isArray(r.has) && r.has.some((h) => h.key === 'lang'))
      .map((r) => `${r.source}|${r.has.find((h) => h.key === 'lang').value}`)
  );
  const needed = new Set(
    pagePairs()
      .filter(({ lang }) => lang !== DEFAULT_LANG)
      .map(({ route, lang }) => `${route}|${lang}`)
  );
  const missing = [...needed].filter((k) => !declared.has(k));
  const extra = [...declared].filter((k) => !needed.has(k));
  if (missing.length || extra.length) {
    const fmt = (k) => { const [r, l] = k.split('|'); return `${r}?lang=${l}`; };
    throw new Error(
      'vercel.json の言語 rewrite が lib/siteMeta.mjs の表と一致していません。\n' +
        (missing.length ? `  足りない: ${missing.map(fmt).join(', ')}\n` : '') +
        (extra.length ? `  余分:     ${extra.map(fmt).join(', ')}\n` : '') +
        '  → vercel.json の rewrites を直してください（総受けの /(.*) より前に置くこと）。'
    );
  }
}

export function writeSitemap(distDir = join(__dirname, '..', 'dist')) {
  checkVercelRewrites();
  const xml = buildSitemap();
  writeFileSync(join(distDir, 'sitemap.xml'), xml);
  const pairs = pagePairs();
  const multi = routes.filter((r) => langsFor(r).length > 1).length;
  console.log(
    `✓ sitemap.xml — ${pairs.length} URL（${routes.length} ルート / うち多言語 ${multi} 本）`
  );
  return pairs.length;
}

// 直接実行されたときだけ書き出す（import 時は何もしない）
if (process.argv[1] && process.argv[1].endsWith('sitemap.mjs')) {
  writeSitemap();
}
