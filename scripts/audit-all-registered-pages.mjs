import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const appPath = path.join(root, 'src/App.jsx');
const app = fs.readFileSync(appPath, 'utf8');
const load = async (relative) => import(pathToFileURL(path.join(root, relative)).href + `?allAudit=${Date.now()}`);
const { ROOM_SEQUENCE } = await load('src/data/roomSequence.js');
const { pageNames } = await load('src/data/pageNames.js');
const { pageGiftData } = await load('src/data/pageGiftData.js');
const names = new Map(pageNames.map((item) => [item.route, item]));
const gifts = new Map(pageGiftData.map((item) => [item.route, item]));
const sequenceIndex = new Map(ROOM_SEQUENCE.map((route, index) => [route, index + 1]));
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route, component]) => ({ route, component }));
const lazyFiles = new Map([...app.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\('\.\/pages\/([^']+)'\)\)/g)].map(([, component, file]) => [component, file]));
const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
const compact = (value, max = 180) => String(value || '').replace(/\s+/g, ' ').replace(/[|\n\r]/g, ' ').trim().slice(0, max);
const count = (source, regex) => [...source.matchAll(regex)].length;
const unique = (items) => [...new Set(items.filter(Boolean))];
const fingerprint = (source) => crypto.createHash('sha1').update(source.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 12);
const resolveLocalImport = (fromFile, specifier) => {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.mjs`, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.js'), path.join(base, 'index.jsx'), path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
  return candidates.find((candidate) => fs.existsSync(candidate));
};
const collect = (file, visited = new Set(), missing = []) => {
  if (!file || visited.has(file) || !fs.existsSync(file)) return { source: '', files: [...visited], missing };
  visited.add(file);
  const source = read(file);
  let combined = source;
  const imports = [...source.matchAll(/(?:from\s*|import\s*)[\'\"](\.[^\'\"]+)[\'\"]/g)].map((match) => match[1]);
  for (const specifier of imports) {
    const child = resolveLocalImport(file, specifier);
    if (!child) missing.push(`${path.relative(root, file)} -> ${specifier}`);
    else combined += `\n${collect(child, visited, missing).source}`;
  }
  return { source: combined, files: [...visited], missing };
};
const localPageComponent = (source) => {
  const match = source.match(/from\s*['\"]\.\.\/components\/([^'\"]+)['\"]/);
  return match ? match[1] : 'page-specific JSX';
};
const routeLiterals = (source) => [...source.matchAll(/(?:navigate|href|to)\s*\(?\s*['\"](\/[A-Za-z0-9_\-\/]+)['\"]/g)].map((match) => match[1]);
const rows = routes.map(({ route, component }, index) => {
  const pageFile = lazyFiles.get(component) || component;
  const pagePath = path.join(root, 'src/pages', `${pageFile}.jsx`);
  const pageSource = read(pagePath);
  const collected = collect(pagePath);
  const source = collected.source;
  const gift = gifts.get(route) || {};
  const page = names.get(route) || {};
  const localRoutes = routeLiterals(source);
  const missingNavigations = unique(localRoutes.filter((target) => !routes.some((item) => item.route === target)));
  const primary = localPageComponent(read(pagePath));
  const errorSignals = unique([
    collected.missing.length ? `missing imports: ${collected.missing.slice(0, 3).join('; ')}` : '',
    missingNavigations.length ? `unknown internal targets: ${missingNavigations.join(', ')}` : '',
    /TODO|FIXME|throw new Error|console\.error/.test(pageSource) ? 'explicit error/debug marker' : '',
    /\b(?:ReferenceError|TypeError|SyntaxError)\b/.test(pageSource) ? 'runtime error token' : '',
  ]);
  const genericSignals = unique([
    /Math\.random/.test(pageSource) ? 'randomized output' : '',
    /generateDate|random.*date|generic/i.test(pageSource) ? 'generic/randomized idea' : '',
    /one more|coming soon|lorem|placeholder/i.test(pageSource) ? 'placeholder copy' : '',
    /onClick/.test(pageSource) && count(source, /<img\b|ALL_MEDIA_PHOTOS|getAssetUrl/g) <= 1 ? 'interaction with low media' : '',
  ]);
  const personalSignals = count(source, /(?:Abu|Samjhana|Sanzu|Bhuntu|Babe|Runchi|Bhoot|Bebo|Fuchee|Nepalgunj|Sakai|Bageshwori|Water Park|Chau|Panipuri|Language Institute|Bardiya|Pokhara|Manang|Mustang)/gi);
  const imageSignals = count(source, /(?:ALL_MEDIA_PHOTOS|ALL_MEDIA_VIDEOS|<img\b|getAssetUrl|backgroundImage|\.mp4|<video\b)/gi);
  const interactions = count(source, /(?:onClick|onChange|onSubmit|onPointer|onKeyDown|set[A-Z][A-Za-z]+\(|whileHover|whileTap|animate=)/g);
  const sourceBytes = source.length;
  const routeState = sequenceIndex.has(route) ? `sequence page ${sequenceIndex.get(route)}` : route === '/' ? 'doorway' : 'registered but not in sequence';
  const designTokens = unique([...source.matchAll(/\b(?:bg|from|via|to|text|border|ring|shadow|rounded|font)-[A-Za-z0-9_/[\].:%-]+/g)].map((match) => match[0])).slice(0, 10).join(' ');
  const boredom = sourceBytes < 7000 && imageSignals <= 2 && interactions <= 2 && personalSignals < 18 ? 'HIGH' : sourceBytes < 10000 && imageSignals <= 3 ? 'MEDIUM' : 'LOW';
  const duplicationKey = fingerprint(source);
  return {
    registered_number: index + 1,
    route,
    component,
    page_file: `src/pages/${pageFile}.jsx`,
    title: page.title || component,
    route_state: routeState,
    sequence_number: sequenceIndex.get(route) || '',
    source_bytes: sourceBytes,
    dependency_count: collected.files.length,
    primary_component: primary,
    dependency_files: collected.files.map((file) => path.relative(root, file)).join(' | '),
    missing_imports: collected.missing.join(' | '),
    image_media_signals: imageSignals,
    interaction_signals: interactions,
    personal_voice_signals: personalSignals,
    design_tokens: designTokens,
    error_signals: errorSignals.join(' | '),
    generic_signals: genericSignals.join(' | '),
    unknown_navigation_targets: missingNavigations.join(' | '),
    boredom_risk: boredom,
    source_fingerprint: duplicationKey,
    gift_present: Boolean(gift.gift && gift.message && gift.surprise),
    memory: compact(gift.memory),
    gift: compact(gift.gift),
    compliment: compact(gift.compliment),
    message: compact(gift.message),
    surprise: compact(gift.surprise),
  };
});
const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const headers = Object.keys(rows[0]);
const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => csvEscape(row[key])).join(','))].join('\n') + '\n';
fs.mkdirSync(path.join(root, 'audit'), { recursive: true });
fs.writeFileSync(path.join(root, 'audit/all_registered_pages_code_audit.csv'), csv);
const duplicateGroups = Object.entries(rows.reduce((map, row) => { (map[row.source_fingerprint] ||= []).push(row); return map; }, {})).filter(([, group]) => group.length > 1);
const primaryGroups = Object.entries(rows.reduce((map, row) => { (map[row.primary_component] ||= []).push(row); return map; }, {})).filter(([, group]) => group.length > 1).sort((a, b) => b[1].length - a[1].length);
const highRisk = rows.filter((row) => row.boredom_risk === 'HIGH' || row.error_signals || row.generic_signals || row.unknown_navigation_targets || !row.gift_present);
const md = [];
md.push('# All Registered Pages — Full Code and Experience Audit');
md.push('');
md.push('This audit covers every registered `<Route>` in `src/App.jsx`, not only the curated sequence. Each record follows the route into its page file and recursively into local page/component imports. It checks route membership, source availability, dependency graph, missing imports, unknown navigation targets, media signals, interaction signals, personal-voice signals, design tokens, generic/randomized patterns, gift metadata, and exact source duplication.');
md.push('');
md.push('| Measure | Result |');
md.push('|---|---:|');
md.push(`| Registered routes inspected | ${rows.length} |`);
md.push(`| Routes in sequential journey | ${rows.filter((row) => row.sequence_number).length} |`);
md.push(`| Registered routes outside sequence | ${rows.filter((row) => row.route_state === 'registered but not in sequence').length} |`);
md.push(`| Missing local imports | ${rows.filter((row) => row.missing_imports).length} |`);
md.push(`| Unknown internal navigation targets | ${rows.filter((row) => row.unknown_navigation_targets).length} |`);
md.push(`| Exact duplicate source groups | ${duplicateGroups.length} |`);
md.push(`| Pages in exact duplicate groups | ${duplicateGroups.reduce((sum, [, group]) => sum + group.length, 0)} |`);
md.push(`| High boredom-risk implementations | ${rows.filter((row) => row.boredom_risk === 'HIGH').length} |`);
md.push(`| Pages with generic/randomized signals | ${rows.filter((row) => row.generic_signals).length} |`);
md.push(`| Pages missing unique gift metadata | ${rows.filter((row) => !row.gift_present).length} |`);
md.push('');
md.push('## Method');
md.push('');
md.push('The audit is code-based and exhaustive: every route is inspected in route-registration order, while the sequence number is recorded separately for strict journey order. A page is marked **high boredom risk** only when the recursively aggregated source is small, media-light, interaction-light, and low in personal voice. Shared global utilities are recorded but are not treated as duplication unless the full normalized dependency source is identical.');
md.push('');
md.push('## Every registered page, in App.jsx registration order');
md.push('');
for (const row of rows) {
  md.push(`### Registered page ${String(row.registered_number).padStart(3, '0')} — ${row.title}`);
  md.push('');
  md.push(`**Route:** \`${row.route}\` · **Journey status:** ${row.route_state}${row.sequence_number ? ` · **Journey order:** ${row.sequence_number}` : ''}`);
  md.push(`**Code:** \`${row.page_file}\` → primary local component **${row.primary_component}**; ${row.dependency_count} local files, ${row.source_bytes} aggregated bytes.`);
  md.push(`**Design:** ${row.design_tokens || 'no Tailwind design tokens detected'}. **Media:** ${row.image_media_signals}. **Interactions:** ${row.interaction_signals}. **Personal voice:** ${row.personal_voice_signals}.`);
  md.push(`**Gift record:** ${row.gift_present ? 'complete' : 'MISSING'}; gift “${row.gift}”; memory “${row.memory}”.`);
  md.push(`**Checks:** boredom risk **${row.boredom_risk}**; duplicate fingerprint \`${row.source_fingerprint}\`; ${row.error_signals || 'no direct code error signal'}; ${row.generic_signals || 'no generic/randomized signal'}; ${row.unknown_navigation_targets || 'all detected internal targets registered'}.`);
  md.push('');
}
md.push('## Exact duplicate code groups');
md.push('');
for (const [key, group] of duplicateGroups) md.push(`- **${key}**: ${group.map((row) => `${row.route} (${row.component})`).join(', ')}.`);
if (!duplicateGroups.length) md.push('No exact duplicate groups detected.');
md.push('');
md.push('## Shared primary components');
md.push('');
for (const [key, group] of primaryGroups) md.push(`- **${key}**: ${group.length} routes — ${group.map((row) => row.route).join(', ')}.`);
md.push('');
md.push('## Fix queue');
md.push('');
for (const row of highRisk) md.push(`- ${row.route} — ${row.title}: ${[row.boredom_risk === 'HIGH' ? 'high boredom risk' : '', row.error_signals, row.generic_signals, row.unknown_navigation_targets, !row.gift_present ? 'missing gift metadata' : ''].filter(Boolean).join('; ')}.`);
fs.writeFileSync(path.join(root, 'audit/all_registered_pages_code_audit.md'), md.join('\n') + '\n');
console.log(JSON.stringify({ registered: rows.length, inSequence: rows.filter((row) => row.sequence_number).length, outsideSequence: rows.filter((row) => row.route_state === 'registered but not in sequence').length, missingImports: rows.filter((row) => row.missing_imports).length, unknownNavigation: rows.filter((row) => row.unknown_navigation_targets).length, exactDuplicateGroups: duplicateGroups.length, highBoredom: rows.filter((row) => row.boredom_risk === 'HIGH').length, output: 'audit/all_registered_pages_code_audit.md' }, null, 2));
