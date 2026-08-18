import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const load = async (relative) => import(pathToFileURL(path.join(root, relative)).href + `?audit=${Date.now()}`);
const { ROOM_SEQUENCE } = await load('src/data/roomSequence.js');
const { pageNames } = await load('src/data/pageNames.js');
const { pageGiftData } = await load('src/data/pageGiftData.js');
const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8');

const routeComponents = new Map([...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route, component]) => [route, component]));
const lazyFiles = new Map([...app.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\('\.\/pages\/([^']+)'\)\)/g)].map(([, component, file]) => [component, file]));
const names = new Map(pageNames.map((item) => [item.route, item]));
const gifts = new Map(pageGiftData.map((item) => [item.route, item]));
const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
const compact = (value, max = 150) => String(value || '').replace(/\s+/g, ' ').replace(/[|\n\r]/g, ' ').trim().slice(0, max);
const count = (source, regex) => [...source.matchAll(regex)].length;
const resolveLocalImport = (fromFile, specifier) => {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.mjs`, path.join(base, 'index.js'), path.join(base, 'index.jsx')];
  return candidates.find((candidate) => fs.existsSync(candidate));
};
const collectSource = (file, visited = new Set(), files = []) => {
  if (!file || visited.has(file) || !fs.existsSync(file)) return { source: '', files };
  visited.add(file);
  files.push(path.relative(root, file));
  const source = read(file);
  let combined = source;
  const imports = [...source.matchAll(/(?:from\s*|import\s*)[\'\"](\.[^\'\"]+)[\'\"]/g)].map((match) => match[1]);
  for (const specifier of imports) {
    const child = resolveLocalImport(file, specifier);
    if (child) combined += `\\n${collectSource(child, visited, files).source}`;
  }
  return { source: combined, files };
};
const unique = (items) => [...new Set(items.filter(Boolean))];
const tokenList = (source) => unique([
  ...source.matchAll(/\b(?:bg|from|via|to|text|border|ring|shadow|rounded|font)-[A-Za-z0-9_/[\].:%-]+/g),
].map((m) => m[0])).slice(0, 12).join(' ');
const sourceFingerprint = (source) => crypto.createHash('sha1').update(source.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 10);
const signal = (source, patterns) => patterns.some((pattern) => pattern.test(source));

const rows = ROOM_SEQUENCE.map((route, index) => {
  const page = names.get(route) || { title: route };
  const gift = gifts.get(route) || {};
  const component = routeComponents.get(route) || 'MissingRoute';
  const pageFile = lazyFiles.get(component) || component;
  const sourcePath = path.join(root, 'src/pages', `${pageFile}.jsx`);
  const collected = collectSource(sourcePath);
  const fallbackPath = path.join(root, 'src/pages', `${component}.jsx`);
  const collectedFallback = collected.source ? collected : collectSource(fallbackPath);
  const wrapperSource = collectedFallback.source;
  const sourceFiles = collectedFallback.files;
  const mediaSignals = count(wrapperSource, /(?:getAssetUrl|ALL_MEDIA_PHOTOS|ALL_MEDIA_VIDEOS|\.mp4|<img\b|<video\b|backgroundImage)/gi);
  const imageSignals = count(wrapperSource, /(?:ALL_MEDIA_PHOTOS|<img\b|getAssetUrl|backgroundImage)/gi);
  const interactionSignals = count(wrapperSource, /(?:onClick|onChange|onSubmit|onPointer|onKeyDown|set[A-Z][A-Za-z]+\(|whileHover|whileTap|animate=)/g);
  const narrativeSignals = count(wrapperSource, /(?:Abu|Samjhana|Sanzu|Bhuntu|Babe|Runchi|Bhoot|Bebo|Fuchee|Nepalgunj|Sakai|Bageshwori|Water Park|Chau|Panipuri|Language Institute|Bardiya|Pokhara|Manang|Mustang|memory|promise|letter|birthday|love)/gi);
  const giftSignals = count(wrapperSource, /(?:gift|surprise|compliment|memory|message|reveal|present|wish|promise)/gi) + (gift.gift ? 1 : 0) + (gift.surprise ? 1 : 0);
  const design = tokenList(wrapperSource);
  const sharedTemplate = unique([
    ...(wrapperSource.match(/\.\.\/components\/([A-Za-z0-9_]+)/g) || []).map((x) => x.replace('../components/', '')),
    wrapperSource.includes('RomanticReplacementPage') ? 'RomanticReplacementPage' : '',
    wrapperSource.includes('PersonalGiftLayer') ? 'PersonalGiftLayer' : '',
  ]).join(' + ');
  const thin = wrapperSource.length < 7000 && imageSignals <= 2 && interactionSignals <= 2 && narrativeSignals < 18;
  const noSource = !wrapperSource;
  const note = [
    `${page.title || route} uses ${component}.`,
    gift.memory ? `Memory: ${compact(gift.memory)}.` : 'Memory record missing.',
    gift.gift ? `Gift: ${compact(gift.gift)}.` : 'Gift record missing.',
    gift.message ? `Voice: ${compact(gift.message)}.` : 'Personal voice record missing.',
  ].join(' ');
  return {
    order: index + 1,
    page: String(index + 1).padStart(3, '0'),
    route,
    title: page.title || route,
    component,
    source_file: sourceFiles.join(' + ') || `src/pages/${pageFile}.jsx`,
    source_bytes: wrapperSource.length,
    source_exists: Boolean(wrapperSource),
    image_signals: imageSignals,
    media_signals: mediaSignals,
    interaction_signals: interactionSignals,
    narrative_signals: narrativeSignals,
    gift_signals: giftSignals,
    shared_template: sharedTemplate || 'page-specific source',
    design_tokens: design || 'design tokens not detected',
    source_fingerprint: sourceFingerprint(wrapperSource),
    thin_candidate: thin ? 'YES' : 'NO',
    broken_candidate: noSource ? 'YES' : 'NO',
    note,
    memory: compact(gift.memory),
    compliment: compact(gift.compliment),
    gift: compact(gift.gift),
    message: compact(gift.message),
    surprise: compact(gift.surprise),
  };
});

const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const headers = Object.keys(rows[0]);
const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => csvEscape(row[key])).join(','))].join('\n') + '\n';
fs.mkdirSync(path.join(root, 'audit'), { recursive: true });
fs.writeFileSync(path.join(root, 'audit/full_sequence_page_audit.csv'), csv);

const stats = {
  routes: rows.length,
  sourceMissing: rows.filter((r) => r.broken_candidate === 'YES').length,
  thinCandidates: rows.filter((r) => r.thin_candidate === 'YES').length,
  noImages: rows.filter((r) => r.image_signals === 0).length,
  lowInteraction: rows.filter((r) => r.interaction_signals <= 1).length,
  sharedTemplates: [...new Set(rows.map((r) => r.shared_template).filter((r) => r !== 'page-specific source'))].length,
  repeatedFingerprints: rows.length - new Set(rows.map((r) => r.source_fingerprint)).size,
  missingGifts: rows.filter((r) => !r.gift || !r.surprise || !r.message).length,
};
const repeated = Object.entries(rows.reduce((map, row) => { (map[row.source_fingerprint] ||= []).push(row); return map; }, {})).filter(([, group]) => group.length > 1).map(([, group]) => group);
const md = [];
md.push('# Full Sequential Birthday Journey Audit');
md.push('');
md.push('This is the complete page-by-page audit of the curated birthday journey, recorded in the exact navigation order from page 1 through the final page. The audit combines route metadata, page source inspection, visible design-token inspection, interaction signals, media signals, narrative signals, and the unique Abu-to-Samjhana gift record. It is intended as the master file for the redesign pass.');
md.push('');
md.push('| Measure | Result |');
md.push('|---|---:|');
md.push(`| Sequential pages inspected | ${stats.routes} |`);
md.push(`| Missing page source candidates | ${stats.sourceMissing} |`);
md.push(`| Thin/boring candidates | ${stats.thinCandidates} |`);
md.push(`| Pages with no local image signal | ${stats.noImages} |`);
md.push(`| Pages with one or fewer interaction signals | ${stats.lowInteraction} |`);
md.push(`| Pages missing gift/message/surprise metadata | ${stats.missingGifts} |`);
md.push(`| Repeated source fingerprints beyond first occurrence | ${stats.repeatedFingerprints} |`);
md.push('');
md.push('## Interpretation rules');
md.push('');
md.push('A **thin candidate** is a page implementation below 7,000 aggregated local-source bytes with at most two image signals, at most two interaction signals, and fewer than eighteen narrative signals. Aggregated source follows local imports from the routed page into its page-specific components, so a one-line wrapper around a substantial component is not automatically treated as thin. A **shared template** identifies a page that delegates its visual experience to a common component; this is not automatically a defect, but repeated use is a redesign priority because the user asked for distinct page ideas. A **source fingerprint repeat** indicates identical normalized implementation source and is a stronger duplicate signal.');
md.push('');
md.push('## Page-by-page record');
md.push('');
for (const row of rows) {
  md.push(`### Page ${row.page} — ${row.title}`);
  md.push('');
  md.push(`**Route:** \`${row.route}\`  `);
  md.push(`**Implementation:** \`${row.component}\` / \`${row.source_file}\`  `);
  md.push(`**Design signals:** ${row.design_tokens}.  `);
  md.push(`**Idea and voice:** ${row.note}  `);
  md.push(`**Photos/media:** ${row.image_signals} image signals, ${row.media_signals} media signals. **Interaction:** ${row.interaction_signals} signals. **Narrative:** ${row.narrative_signals} signals. **Gift layer:** ${row.gift_signals} signals.  `);
  md.push(`**Shared implementation:** ${row.shared_template}. **Thin candidate:** ${row.thin_candidate}. **Broken candidate:** ${row.broken_candidate}. **Fingerprint:** \`${row.source_fingerprint}\`.`);
  md.push('');
}
md.push('## Repetition groups');
md.push('');
if (!repeated.length) md.push('No identical source fingerprints were detected.');
for (const group of repeated) {
  md.push(`- **${group[0].source_fingerprint}** — ${group.map((r) => `${r.page} ${r.route}`).join(', ')}`);
}
md.push('');
md.push('## Redesign queue');
md.push('');
for (const row of rows.filter((r) => r.thin_candidate === 'YES' || r.broken_candidate === 'YES')) md.push(`- Page ${row.page}, ${row.route}: ${row.thin_candidate === 'YES' ? 'thin candidate' : 'missing source'}; implementation ${row.component}; current title “${row.title}”.`);
fs.writeFileSync(path.join(root, 'audit/full_sequence_page_audit.md'), md.join('\n') + '\n');
console.log(JSON.stringify({ stats, outputs: ['audit/full_sequence_page_audit.csv', 'audit/full_sequence_page_audit.md'] }, null, 2));
