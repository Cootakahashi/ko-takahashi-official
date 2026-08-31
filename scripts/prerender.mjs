/**
 * Post-build prerendering script
 * Uses Puppeteer to render each route and save the HTML
 * This ensures search engines and AI crawlers see full content
 *
 * Usage: node scripts/prerender.mjs
 * Run after: npx vite build
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// 🔴 router.ts と同じ6本。ここが唯一の一覧で、sitemap もここから作る。
// 以前は /links が抜けており、そのページだけ静的HTMLが無かった。
const routes = ['/', '/story', '/schedule', '/articles', '/about', '/links'];

// i18n.ts / types.ts の LanguageCode と揃える。
const languages = ['ja', 'en', 'zh', 'ko', 'th'];
const DEFAULT_LANG = 'ja';
const SITE_URL = 'https://www.ko-takahashi.jp';

/**
 * sitemap.xml を書き出す。
 *
 * この実装は言語を `?lang=xx` のクエリで持つ（lib/router.ts）。
 * パスに言語が出ないので、hreflang もクエリ付きURLで申告する。
 * 存在しないパス（/ja/about など）は **作らない** —— SPA のフォールバックで
 * 200 を返してしまい、実体のないURLを検索エンジンに渡すことになるため。
 */
function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urlFor = (route, lang) => {
    const path = route === '/' ? '' : route;
    return lang === DEFAULT_LANG
      ? `${SITE_URL}${path}` || SITE_URL
      : `${SITE_URL}${path}?lang=${lang}`;
  };

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

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries.join('\n'),
    '</urlset>',
    '',
  ].join('\n');

  writeFileSync(join(distDir, 'sitemap.xml'), xml);
  console.log(`  ✓ sitemap.xml (${routes.length} routes × ${languages.length} langs = ${entries.length} URLs)`);
}

async function prerender() {
  // Check if puppeteer is available
  // sitemap は prerender の成否と無関係に必要。先に書き出す。
  // （Puppeteer 未導入だと以前はここで return しており、sitemap も作られなかった）
  writeSitemap();

  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.log('⚠ Puppeteer not installed. Skipping prerender.');
    console.log('  Install with: npm install --save-dev puppeteer');
    console.log('  🔴 静的HTMLが作られないため、JS を実行しないクローラーには');
    console.log('     中身が見えません。SEO/AEO 上これは大きな穴です。');
    return;
  }

  console.log('🔄 Starting prerender...');

  // Start a local server from dist
  const { createServer } = await import('http');
  const { readFile } = await import('fs/promises');

  const server = createServer(async (req, res) => {
    let filePath = join(distDir, req.url === '/' ? '/index.html' : req.url);

    // SPA fallback
    if (!existsSync(filePath) || !filePath.includes('.')) {
      filePath = join(distDir, 'index.html');
    }

    try {
      const content = await readFile(filePath);
      const ext = filePath.split('.').pop();
      const mimeTypes = {
        html: 'text/html', js: 'application/javascript', css: 'text/css',
        json: 'application/json', png: 'image/png', jpg: 'image/jpeg',
        webp: 'image/webp', ico: 'image/x-icon', svg: 'image/svg+xml',
        txt: 'text/plain', woff2: 'font/woff2',
      };
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  await new Promise(resolve => server.listen(4173, resolve));
  console.log('  Server running on http://localhost:4173');

  const browser = await puppeteer.default.launch({ headless: 'new' });

  for (const route of routes) {
    console.log(`  Rendering ${route}...`);
    const page = await browser.newPage();
    await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle0', timeout: 15000 });

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 10000 });

    const html = await page.content();

    // Write to dist
    const outputDir = route === '/' ? distDir : join(distDir, route);
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
    const outputFile = route === '/' ? join(distDir, 'index.html') : join(outputDir, 'index.html');

    writeFileSync(outputFile, html);
    console.log(`  ✓ ${outputFile}`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('✅ Prerender complete!');
}

prerender().catch(console.error);
