import fs from 'node:fs';
import path from 'node:path';
import { ROOM_SEQUENCE } from '../src/data/roomSequence.js';
import { pageNameByRoute } from '../src/data/pageNames.js';
import { pageGiftByRoute } from '../src/data/pageGiftData.js';

const app = fs.readFileSync('src/App.jsx', 'utf8');
const lazyImports = Object.fromEntries([...app.matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\('\.\/pages\/([^']+)'\)/g)].map((match) => [match[1], match[2]]));
const routeComponents = Object.fromEntries([...app.matchAll(/<Route\s+path=["']([^"']+)["']\s+element=\{<([A-Za-z0-9]+)[^>]*\/>\}/g)].map((match) => [match[1], match[2]]));
const rows = ROOM_SEQUENCE.map((route, index) => {
  const componentName = routeComponents[route] || 'Unknown';
  const component = lazyImports[componentName] || componentName;
  const candidateFiles = [
    `src/pages/${component}`,
    `src/pages/${component}.jsx`,
    `src/pages/${component}.js`,
  ];
  const file = candidateFiles.find((candidate) => fs.existsSync(candidate));
  const source = file ? fs.readFileSync(file, 'utf8') : '';
  const gift = pageGiftByRoute[route] || {};
  return {
    order: index + 1,
    route,
    title: pageNameByRoute[route]?.title || gift.title || route,
    component,
    sourceFile: file || null,
    sourceBytes: source.length,
    usesWorldShell: /WorldShell/.test(source),
    usesRomanticReplacement: /RomanticReplacementPage/.test(source),
    usesPersonalGiftLayer: /PersonalGiftLayer/.test(source),
    imageTags: (source.match(/<img\b/g) || []).length,
    videoTags: (source.match(/<video\b/g) || []).length,
    buttonTags: (source.match(/<button\b/g) || []).length,
    interactionSignals: ['onClick', 'onChange', 'onPointer', 'canvas', 'audio', 'video', 'input'].filter((signal) => source.includes(signal)),
    themeSignals: [...new Set((source.match(/theme=["'][^"']+|bg-\[[^\]]+\]|from-[a-z0-9-]+|font-[a-z0-9-]+/g) || []).slice(0, 12))],
    kind: gift.kind || null,
    gift: gift.gift || null,
  };
});

fs.mkdirSync('audit', { recursive: true });
fs.writeFileSync('audit/sequential_page_inventory.json', JSON.stringify(rows, null, 2));
const summary = {
  routes: rows.length,
  missingSources: rows.filter((row) => !row.sourceFile).length,
  worldShell: rows.filter((row) => row.usesWorldShell).length,
  romanticReplacement: rows.filter((row) => row.usesRomanticReplacement).length,
  personalGiftLayer: rows.filter((row) => row.usesPersonalGiftLayer).length,
  imageFree: rows.filter((row) => row.imageTags === 0 && row.videoTags === 0).length,
  lowInteraction: rows.filter((row) => row.buttonTags <= 1 && row.imageTags + row.videoTags <= 1).length,
  sourceComponentGroups: Object.entries(Object.groupBy(rows, (row) => row.component)).filter(([, group]) => group.length > 1).map(([component, group]) => ({ component, routes: group.map((row) => row.route) })),
};
fs.writeFileSync('audit/sequential_page_inventory_summary.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
