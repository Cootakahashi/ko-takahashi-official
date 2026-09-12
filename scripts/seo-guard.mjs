#!/usr/bin/env node
/**
 * SEO Guard — 初歩的な SEO ミスを **ビルドの時点で** 落とす。
 *
 * 🔴 2026-08-19〜08-31、canonical と og:url が別人の ko-takahashi.com を
 *    `index, follow` で指したまま 12 日間本番に居た。気づいたのは人の目視。
 *    2026-09-12 に姉妹サイト（gcf.works / matsuri.group）でも同型の事故が 3 件見つかった。
 *    どれも「マージ時点で機械が見ていれば、本番に出なかった」。
 *
 * このサイトは SPA で、canonical は Helmet が **ブラウザで** 出す。
 * だから配信 HTML を見ても canonical は無い（prerender した時だけある）。
 * 検査は次の 2 層で行う:
 *   ソース層  : canonical / hreflang / og:url / Sitemap: に書かれた絶対 URL のホスト
 *               + ko-takahashi.* の絶対 URL 直書き（SITE_URL 以外の定義）
 *   成果物層  : dist/sitemap.xml の <loc> と hreflang（自ホスト・実在ルート・実在言語・件数）
 *               + prerender 済み HTML があれば、その canonical / noindex との整合
 *
 * 使い方:
 *   node scripts/seo-guard.mjs               # build の最後に走る（違反があれば exit 1 = デプロイされない）
 *   node scripts/seo-guard.mjs --self-test   # 壊れた入力で本当に落ちるかの陽性対照
 *   node scripts/seo-guard.mjs --scan <file> # 任意のファイルにソース層の規則だけ当てる
 *
 * ネットワークは使わない。数秒で終わる。誤検知を出したら二度と信用されないので、
 * 規則は「確実に間違い」と言えるものだけ。
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import {
  SITE_HOST,
  OWNED_HOSTS,
  routes,
  DEFAULT_LANG,
  langsFor,
  ARTICLE_LANGS,
  articleRoute,
} from '../lib/siteMeta.mjs';
import { articleSlugs } from './sitemap.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// ─── 共通 ───────────────────────────────────────────────────────────────────

/** ホスト名。`www.` は接頭辞として扱う（文字集合で剥がすと web3dojo → eb3dojo になる）。 */
export function hostOf(url) {
  const m = /^https?:\/\/([^/:?#]+)/i.exec(url || '');
  return m ? m[1].toLowerCase() : '';
}
export function isOwnedHost(host) {
  return OWNED_HOSTS.includes((host || '').toLowerCase());
}
/** コメントを落とす。`https://` の `//` はコメントではない（`:` の直後は除外）。 */
export function stripComments(src) {
  return src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(?<!:)\/\/[^\n]*/g, '');
}

// ─── ソース層 ───────────────────────────────────────────────────────────────

const URL_RE = /https?:\/\/[^\s"'`)}<>,]+/g;

/**
 * 規則 S1: canonical / hreflang / og:url / Sitemap: の行に書かれた絶対 URL は自ホスト。
 * 規則 S2: ko-takahashi.* の絶対 URL は SITE_URL 由来以外に書かない
 *          （= 別ドメイン ko-takahashi.com の再来を、文脈に関係なく落とす）。
 */
export function scanSource(src, file = '') {
  const findings = [];
  const lines = stripComments(src).split('\n');
  lines.forEach((ln, i) => {
    const urls = Array.from(ln.matchAll(URL_RE)).map((m) => m[0]);
    if (!urls.length) return;
    const metaCtx = /canonical|hreflang|hrefLang|x-default|og:url|Sitemap:/i.test(ln);
    for (const u of urls) {
      const h = hostOf(u);
      if (metaCtx && !isOwnedHost(h)) {
        findings.push({ rule: 'S1', file, line: i + 1, detail: `canonical/hreflang/og:url が自ホスト以外を指す → ${u}` });
      } else if (/(^|\.)ko-takahashi\./i.test(h) && !isOwnedHost(h)) {
        findings.push({ rule: 'S2', file, line: i + 1, detail: `似て非なるドメインの直書き → ${u}（正しくは ${SITE_HOST}）` });
      }
    }
  });
  return findings;
}

const SOURCE_FILES = ['index.html', 'App.tsx', 'config.ts', 'lib/siteMeta.mjs', 'public/robots.txt', 'public/humans.txt'];
function sourceFiles() {
  const out = SOURCE_FILES.map((f) => join(ROOT, f)).filter(existsSync);
  const comp = join(ROOT, 'components');
  if (existsSync(comp)) {
    for (const f of readdirSync(comp)) if (/\.(tsx?|jsx?)$/.test(f)) out.push(join(comp, f));
  }
  return out;
}

// ─── 成果物層 ───────────────────────────────────────────────────────────────

export function parseSitemap(xml) {
  const urls = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = m[1];
    const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1]?.trim();
    const alts = Array.from(block.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)).map((a) => ({ lang: a[1], href: a[2] }));
    if (loc) urls.push({ loc, alts });
  }
  return urls;
}

/** prerender 済みならその HTML の場所。無ければ null。 */
function prerenderedFile(route, lang) {
  const base = lang === DEFAULT_LANG ? DIST : join(DIST, '_lang', lang);
  const f = join(route === '/' ? base : join(base, route), 'index.html');
  return existsSync(f) ? f : null;
}

/**
 * 規則 M1: <loc> と hreflang の href は自ホスト（正確に SITE_HOST。apex は 307 なので載せない）
 * 規則 M2: <loc> のパスは routes か記事ルートに実在し、?lang は実在言語
 * 規則 M3: prerender 済み HTML が noindex なら sitemap に載せない／その canonical は loc と一致
 * 規則 M4: 件数が下限（固定ページ + 記事、既定言語ぶん）未満なら静かな全損
 */
export function auditSitemap(urls, { knownRoutes, articleRoutes, minUrls, readHtml = prerenderedFile }) {
  const findings = [];
  if (urls.length < minUrls) {
    findings.push({ rule: 'M4', detail: `sitemap が ${urls.length} 件（下限 ${minUrls}）。生成器が空か、ルート表が消えている` });
  }
  const locs = new Set(urls.map((u) => u.loc));
  for (const { loc, alts } of urls) {
    const h = hostOf(loc);
    if (h !== SITE_HOST) {
      findings.push({ rule: 'M1', detail: `<loc> が自ホスト以外 → ${loc}` });
      continue;
    }
    let u;
    try { u = new URL(loc); } catch { findings.push({ rule: 'M1', detail: `URL として不正 → ${loc}` }); continue; }
    const route = u.pathname === '' ? '/' : u.pathname.replace(/\/$/, '') || '/';
    const lang = u.searchParams.get('lang') || DEFAULT_LANG;
    const isArticle = articleRoutes.includes(route);
    if (!knownRoutes.includes(route) && !isArticle) {
      findings.push({ rule: 'M2', detail: `実在しないパス（SPA は 200 を返すので soft-404 になる）→ ${loc}` });
      continue;
    }
    const avail = isArticle ? ARTICLE_LANGS : langsFor(route);
    if (!avail.includes(lang)) {
      findings.push({ rule: 'M2', detail: `${route} に ${lang} 版は実在しない（?lang=${lang} は日本語を返す）→ ${loc}` });
    }
    for (const a of alts) {
      if (!isOwnedHost(hostOf(a.href))) findings.push({ rule: 'M1', detail: `hreflang=${a.lang} が自ホスト以外 → ${a.href}` });
      else if (a.lang !== 'x-default' && !locs.has(a.href)) findings.push({ rule: 'M1', detail: `hreflang=${a.lang} の先が sitemap に無い → ${a.href}` });
    }
    const f = readHtml(route, lang);
    if (f) {
      const html = typeof f === 'string' && f.startsWith('<') ? f : readFileSync(f, 'utf-8');
      if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
        findings.push({ rule: 'M3', detail: `noindex のページが sitemap に載っている → ${loc}` });
      }
      const canon = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i.exec(html)?.[1];
      if (canon && hostOf(canon) !== SITE_HOST) {
        findings.push({ rule: 'M3', detail: `prerender 済み HTML の canonical が自ホスト以外 → ${canon}（${loc}）` });
      }
    }
  }
  return findings;
}

function realInputs() {
  const articleRoutes = articleSlugs().map(articleRoute);
  return {
    knownRoutes: routes,
    articleRoutes,
    minUrls: routes.length + articleRoutes.length, // 既定言語ぶんは必ずある
  };
}

// ─── 実行 ───────────────────────────────────────────────────────────────────

function run() {
  const findings = [];
  for (const f of sourceFiles()) findings.push(...scanSource(readFileSync(f, 'utf-8'), relative(ROOT, f)));

  const sm = join(DIST, 'sitemap.xml');
  if (!existsSync(sm)) {
    findings.push({ rule: 'M4', detail: 'dist/sitemap.xml が無い（build の順序: vite build → sitemap.mjs → seo-guard.mjs）' });
  } else {
    findings.push(...auditSitemap(parseSitemap(readFileSync(sm, 'utf-8')), realInputs()));
  }
  return findings;
}

function report(findings) {
  if (!findings.length) {
    console.log(`✓ seo-guard — 違反なし（ソース層 S1/S2・成果物層 M1〜M4・自ホスト ${SITE_HOST}）`);
    return 0;
  }
  console.error(`✗ seo-guard — 違反 ${findings.length} 件。本番に出る前に止めます:`);
  for (const f of findings) {
    const at = f.file ? ` ${f.file}:${f.line}` : '';
    console.error(`  [${f.rule}]${at} ${f.detail}`);
  }
  return 1;
}

/** 陽性対照: 壊れた入力で本当に落ちるか。「0 件」を信じる前に必ず走らせる。 */
function selfTest() {
  const must = (name, arr, rule) => {
    const ok = arr.some((f) => f.rule === rule);
    console.log(`${ok ? '✓' : '✗'} ${name}`);
    return ok;
  };
  const none = (name, arr) => {
    console.log(`${arr.length === 0 ? '✓' : '✗'} ${name}${arr.length ? ' → ' + arr.map((f) => f.detail).join(' / ') : ''}`);
    return arr.length === 0;
  };
  const inputs = { knownRoutes: ['/', '/about'], articleRoutes: ['/articles/a'], minUrls: 3, readHtml: () => null };
  const okSm = parseSitemap(`
    <urlset><url><loc>https://${SITE_HOST}</loc>
      <xhtml:link rel="alternate" hreflang="ja" href="https://${SITE_HOST}" />
      <xhtml:link rel="alternate" hreflang="en" href="https://${SITE_HOST}?lang=en" /></url>
    <url><loc>https://${SITE_HOST}?lang=en</loc></url>
    <url><loc>https://${SITE_HOST}/about</loc></url>
    <url><loc>https://${SITE_HOST}/articles/a</loc></url></urlset>`);
  const results = [
    // 事故 1（2026-08-19〜31 の実物と同じ形）
    must('S1: canonical が別人の ko-takahashi.com を指す', scanSource(`<link rel="canonical" href="https://ko-takahashi.com/story" />`), 'S1'),
    must('S1: og:url が他ホスト', scanSource(`<meta property="og:url" content="https://example.net/x" />`), 'S1'),
    must('S2: 文脈に関係なく ko-takahashi.com の直書き', scanSource(`const base = 'https://ko-takahashi.com';`), 'S2'),
    none('S: 自ホスト・相対 URL・コメント内は誤検知しない', scanSource(`
      // 以前は https://ko-takahashi.com だった
      <link rel="canonical" href="https://${SITE_HOST}/about" />
      <a href="https://www.linkedin.com/in/x">x</a>
      Sitemap: https://${SITE_HOST}/sitemap.xml`)),
    // 事故 2・3 と同型
    must('M1: <loc> が他ドメイン（gcf.works が jonandcoo.jp を並べた形）', auditSitemap(parseSitemap(`<urlset><url><loc>https://jonandcoo.jp/services</loc></url></urlset>`), inputs), 'M1'),
    must('M1: <loc> が apex（307 する URL を申告している）', auditSitemap(parseSitemap(`<urlset><url><loc>https://${OWNED_HOSTS[1]}/about</loc></url></urlset>`), inputs), 'M1'),
    must('M2: 実在しないパス（/services 型）', auditSitemap(parseSitemap(`<urlset><url><loc>https://${SITE_HOST}/services</loc></url></urlset>`), inputs), 'M2'),
    must('M2: 実在しない言語版', auditSitemap(parseSitemap(`<urlset><url><loc>https://${SITE_HOST}/about?lang=th</loc></url></urlset>`), { ...inputs, knownRoutes: ['/about'] }), 'M2'),
    must('M3: noindex なのに sitemap に載っている', auditSitemap(okSm, { ...inputs, readHtml: () => `<html><head><meta name="robots" content="noindex, nofollow"></head></html>` }), 'M3'),
    must('M3: prerender 済み HTML の canonical が他ホスト', auditSitemap(okSm, { ...inputs, readHtml: () => `<html><head><link rel="canonical" href="https://ko-takahashi.com/"></head></html>` }), 'M3'),
    must('M4: 空の sitemap', auditSitemap([], inputs), 'M4'),
    none('M: 正常な sitemap は誤検知しない', auditSitemap(okSm, inputs)),
  ];
  const bad = results.filter((r) => !r).length;
  console.log(bad ? `✗ self-test 失敗 ${bad} 件` : `✓ self-test ${results.length}/${results.length}`);
  return bad ? 1 : 0;
}

const argv = process.argv.slice(2);
if (process.argv[1] && process.argv[1].endsWith('seo-guard.mjs')) {
  if (argv[0] === '--self-test') process.exit(selfTest());
  if (argv[0] === '--scan') {
    const fs = [];
    for (const f of argv.slice(1)) fs.push(...scanSource(readFileSync(f, 'utf-8'), f));
    process.exit(report(fs));
  }
  process.exit(report(run()));
}
