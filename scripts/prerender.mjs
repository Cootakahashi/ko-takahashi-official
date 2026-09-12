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

import { writeSitemap, allPagePairs } from './sitemap.mjs';
import { DEFAULT_LANG } from '../lib/siteMeta.mjs';


/**
 * 重複した JSON-LD を畳む。
 *
 * helmet は meta を名前で重複排除するが <script> は追記するだけなので、
 * prerender 中の描画切り替え（トップ用 → ページ用）で古いブロックが残る。
 * 同じ @type の並びを持つものは最後の 1 つだけ残す（＝確定した状態）。
 * 種類が違うブロックはそのまま残す。
 */
function dedupeJsonLd(html) {
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  const found = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    let sig;
    try {
      const data = JSON.parse(m[1]);
      const items = Array.isArray(data['@graph']) ? data['@graph'] : [data];
      sig = items.map((i) => i && i['@type']).join(',');
    } catch {
      sig = `unparsed:${m[0].length}`;
    }
    found.push({ full: m[0], sig });
  }
  const lastIndex = new Map();
  found.forEach((f, i) => lastIndex.set(f.sig, i));
  let removed = 0;
  found.forEach((f, i) => {
    if (lastIndex.get(f.sig) !== i) {
      html = html.replace(f.full, '');
      removed += 1;
    }
  });
  return { html, removed };
}

async function prerender() {
  // Check if puppeteer is available
  // sitemap は build 側（scripts/sitemap.mjs）が作る。ここでは作らない。
  // ただし prerender 単体で回したときのために、無ければ書いておく。
  writeSitemap(distDir);

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

  // 同梱 Chrome ではなくシステムの Chrome を使う。
  // npm の install-scripts ポリシーで puppeteer の postinstall が止まるため、
  // 同梱ブラウザが入っていないことがある（この環境がそうだった）。
  const CHROME =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const launchOptions = { headless: 'new' };
  if (existsSync(CHROME)) launchOptions.executablePath = CHROME;

  const browser = await puppeteer.default.launch(launchOptions);

  for (const { route, lang } of allPagePairs()) {
    const isDefault = lang === DEFAULT_LANG;
    const label = isDefault ? route : `${route}?lang=${lang}`;
    console.log(`  Rendering ${label}...`);
    const page = await browser.newPage();
    const url = isDefault
      ? `http://localhost:4173${route}`
      : `http://localhost:4173${route}?lang=${lang}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 10000 });

    const raw = await page.content();
    const { html, removed: dupes } = dedupeJsonLd(raw);
    if (dupes) console.log(`    （重複した JSON-LD を ${dupes} 個 畳んだ）`);

    // 既定言語はそのままのパスへ。それ以外は _lang/<言語>/ の下へ置き、
    // vercel.json のクエリ条件付き rewrite で `?lang=xx` に配る。
    const baseDir = isDefault ? distDir : join(distDir, '_lang', lang);
    const outputDir = route === '/' ? baseDir : join(baseDir, route);
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
    const outputFile = join(outputDir, 'index.html');

    writeFileSync(outputFile, html);
    console.log(`  ✓ ${outputFile}`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('✅ Prerender complete!');
}

prerender().catch(console.error);
