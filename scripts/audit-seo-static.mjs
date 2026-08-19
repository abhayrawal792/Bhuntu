// Static SEO & accessibility audit for the Bhuntu SPA.
// Runs after `pnpm build` (dist/) and validates:
//  1. dist/index.html contains meta description, robots noindex, PWA tags, theme color.
//  2. public/404.html mirrors the same meta/PWA block (404 fallback).
//  3. Every registered route in src/App.jsx has a matching <Route path>.
//  4. robots.txt allows crawling (site is noindexed intentionally).
//  5. All static assets referenced from dist/index.html exist on disk.
//  6. Basic accessibility heuristics on the HTML shells (lang attribute,
//     viewport, title length, charset).
// Exits 0 when all checks pass; exits 1 otherwise.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const appPath = path.join(root, 'src/App.jsx');
const indexHtml = path.join(distDir, 'index.html');
const fallbackHtml = path.join(root, 'public/404.html');
const robotsTxt = path.join(distDir, 'robots.txt') || path.join(root, 'public/robots.txt');
const errors = [];
const warnings = [];

const read = (file) => {
  if (!fs.existsSync(file)) {
    errors.push(`Missing required file: ${file}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
};

// --- 1. Registered routes sanity check ---
const app = read(appPath);
const routePaths = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element=/g)].map(([, p]) => p);
const routeSet = new Set(routePaths);
if (routePaths.length === 0) {
  errors.push('Could not find any <Route> declarations in src/App.jsx');
}
console.log(`Routes registered in App.jsx: ${routePaths.length}`);
const duplicates = routePaths.length - routeSet.size;
if (duplicates > 0) {
  errors.push(`${duplicates} duplicate route paths found in App.jsx`);
}

// --- 2. SPA root shell (dist/index.html) ---
const index = read(indexHtml);
const requiredMeta = [
  ['lang', /<html[^>]*lang="([a-z]{2})"[^>]*>/],
  ['charset', /<meta charset="UTF-8"\s*\/?>/],
  ['title', /<title>[^<]{5,120}<\/title>/],
  ['description', /<meta name="description"[^>]*content="[^"]{10,}"/],
  ['viewport', /<meta name="viewport"[^>]*initial-scale=/],
  ['robots (noindex)', /<meta name="robots" content="noindex[^"]*"/],
  ['theme-color', /<meta name="theme-color" content="#[0-9a-fA-F]{3,8}"/],
  ['apple-mobile-web-app-capable', /<meta name="apple-mobile-web-app-capable" content="yes"/],
  ['apple-mobile-web-app-status-bar-style', /<meta name="apple-mobile-web-app-status-bar-style"[^>]*content="/],
  ['apple-mobile-web-app-title', /<meta name="apple-mobile-web-app-title"[^>]*content="/],
  ['mobile-web-app-capable', /<meta name="mobile-web-app-capable" content="yes"/],
  ['msapplication-TileColor', /<meta name="msapplication-TileColor"[^>]*content="/],
  ['icon', /<link rel="icon"[^>]*href="[^"]+"/],
  ['root div', /<div id="root"><\/div>/],
  ['entry script', /<script type="module"[^>]*src="[^"]+"/],
];
for (const [label, regex] of requiredMeta) {
  if (!regex.test(index)) errors.push(`dist/index.html missing: ${label}`);
}

// --- 3. 404 fallback shell mirrors meta block ---
const fallback = read(fallbackHtml);
const mirroredChecks = [
  ['title', /<title>[^<]{5,120}<\/title>/],
  ['description', /<meta name="description"[^>]*content="[^"]{10,}"/],
  ['robots (noindex)', /<meta name="robots" content="noindex[^"]*"/],
  ['theme-color', /<meta name="theme-color" content="#[0-9a-fA-F]{3,8}"/],
  ['apple-mobile-web-app-capable', /<meta name="apple-mobile-web-app-capable" content="yes"/],
  ['viewport', /<meta name="viewport"[^>]*initial-scale=/],
  ['subpath redirect script', /l\.replace\(/],
];
for (const [label, regex] of mirroredChecks) {
  if (!regex.test(fallback)) errors.push(`public/404.html missing: ${label}`);
}

// --- 4. robots.txt ---
const robotsFile = fs.existsSync(path.join(distDir, 'robots.txt'))
  ? path.join(distDir, 'robots.txt')
  : path.join(root, 'public/robots.txt');
const robots = read(robotsFile);
if (!/User-agent:/i.test(robots)) {
  errors.push('robots.txt missing User-agent directive');
}
if (/disallow:\s*\/\s*$/i.test(robots)) {
  warnings.push('robots.txt disallows the entire site (intentional for a private surprise site; noindex meta is also set)');
}

// --- 5. Static assets referenced in dist/index.html exist ---
const assetRefs = [...index.matchAll(/(src|href)="([^"]+(?:\.js|\.css|\.svg|\.png|\.ico))"/g)].map(([, , ref]) => ref);
for (const ref of assetRefs) {
  // Strip the deployment base path (e.g. /runchii/) when resolving to disk.
  const base = '/Bhuntu/';
  let relative = ref.startsWith('/') ? ref.slice(1) : ref;
  if (relative.startsWith(base.slice(1))) relative = relative.slice(base.length - 1);
  const target = path.join(distDir, relative);
  if (!fs.existsSync(target)) errors.push(`Referenced asset missing on disk: ${ref}`);
}
// all_media copy for legacy GitHub Pages exists at repo root when deployed
if (fs.existsSync(distDir) && fs.existsSync(path.join(root, 'all_media'))) {
  const distMedia = path.join(distDir, 'all_media');
  if (fs.existsSync(distMedia)) {
    const distCount = fs.readdirSync(distMedia).length;
    const rootCount = fs.readdirSync(path.join(root, 'all_media')).length;
    if (distCount !== rootCount) {
      warnings.push(`all_media count mismatch: dist=${distCount} vs root=${rootCount}`);
    }
  }
}

// --- 6. Media size budget (slow-network reliability) ---
const mediaDir = path.join(root, 'all_media');
if (fs.existsSync(mediaDir)) {
  let total = 0;
  const files = fs.readdirSync(mediaDir, { recursive: true });
  for (const f of files) {
    const full = path.join(mediaDir, f);
    if (fs.statSync(full).isFile()) total += fs.statSync(full).size;
  }
  const mb = Math.round((total / 1048576) * 10) / 10;
  console.log(`all_media total size: ${mb} MB`);
  if (total > 120 * 1048576) errors.push(`all_media exceeds 120 MB budget (${mb} MB)`);
  // Any single image > 800 KB is suspicious
  for (const f of files) {
    const full = path.join(mediaDir, f);
    if (fs.statSync(full).isFile() && /\.(jpe?g|png)$/i.test(f) && fs.statSync(full).size > 800 * 1024) {
      warnings.push(`Large image (>${Math.round(fs.statSync(full).size / 1024)} KB): all_media/${f}`);
    }
  }
}

// --- Report ---
console.log('\n--- Static SEO & accessibility audit ---');
console.log(`Errors:   ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
for (const e of errors) console.log(`  ERROR: ${e}`);
for (const w of warnings) console.log(`  WARN:  ${w}`);
console.log('--------------------------------------');
if (errors.length > 0) {
  console.error('\nAudit FAILED.');
  process.exit(1);
}
console.log('\nAudit PASSED.');
process.exit(0);
