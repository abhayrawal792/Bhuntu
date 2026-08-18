import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const app = fs.readFileSync(path.join(root, 'src', 'App.jsx'), 'utf8');
const pageDir = path.join(root, 'src', 'pages');
const auditDir = path.join(root, 'audit');
fs.mkdirSync(auditDir, { recursive: true });

const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route, component]) => ({ route, component }));
const pageFiles = new Map(fs.readdirSync(pageDir).filter((file) => file.endsWith('.jsx')).map((file) => [file.replace(/\.jsx$/, ''), file]));
const categories = {
  game: /game|quiz|puzzle|wheel|scratch|spin|tictactoe|tetris|wordle|jumble|match|arcade|catcher|crossword|maze|trivia|slots|bingo|duel|simulator|painter|canvas|drum|karaoke|tangram|jigsaw|search/i,
  gift: /gift|bouquet|crown|coupon|treasure|envelope|letter|voucher|present|teddy|cake|passport|ticket|mystery|box|jar|wishes|wish|promise|compliment|affirmation/i,
  romance: /love|heart|romantic|kiss|hug|bebo|bhuntu|sanzu|sanu|babe|runch|abu|samjhana|relationship|couple|forever|sweet|darling|proposal|anniversary|wifey|budi/i,
  memory: /memory|story|timeline|photo|polaroid|gallery|album|film|archive|journal|diary|yearbook|moments|milestone|scrapbook|nostalgia|capsule/i,
  surprise: /surprise|reveal|secret|unlock|open|fortune|oracle|magic|mystery|hidden|wish|vault|bottle|lantern|firework|star|constellation|sky|finale/i,
};
const mechanicHints = [
  ['scratch', /scratch|foil/i], ['roulette', /roulette|spin.?wheel|wheel of fortune/i], ['quiz', /quiz|trivia|two truths|personality/i], ['photo-game', /photo.*(game|puzzle|booth|mosaic|slider)|polaroid.*(game|designer)/i], ['puzzle', /puzzle|jigsaw|tangram|crossword|wordle|jumble|tetris|maze|match/i], ['audio-game', /drum|rhythm|karaoke|soundboard|piano|music.*(game|mixer)/i], ['choice-reveal', /oracle|fortune|tarot|magic 8|wheel|spinner|generator|random/i], ['decorator', /decorat|painter|canvas|customiz|builder/i], ['memory-reveal', /memory|timeline|archive|letter|capsule|story/i],
];

const normalize = (text) => text.replace(/\s+/g, ' ').replace(/['"`]/g, '').trim().toLowerCase();
const rows = routes.map(({ route, component }, index) => {
  const file = pageFiles.get(component);
  const source = file ? fs.readFileSync(path.join(pageDir, file), 'utf8') : '';
  const normalized = normalize(source);
  const categoriesFound = Object.entries(categories).filter(([, pattern]) => pattern.test(source)).map(([name]) => name);
  const mechanics = mechanicHints.filter(([, pattern]) => pattern.test(source)).map(([name]) => name);
  const imports = [...source.matchAll(/from ['"](\.\.\/components\/[^'"]+|\.\/[^'"]+)['"]/g)].map((match) => match[1]).join('|');
  const fingerprint = normalized.replace(/className=[^>]+/g, 'className').replace(/[a-z0-9_-]{8,}/g, 'token').slice(0, 240);
  return {
    pageNumber: String(index + 1).padStart(3, '0'), route, component, file: file ?? '', sourceBytes: Buffer.byteLength(source),
    categories: categoriesFound.join('|'), mechanics: mechanics.join('|'), imports, fingerprint,
    hasGame: categoriesFound.includes('game'), hasGift: categoriesFound.includes('gift'), hasRomance: categoriesFound.includes('romance'), hasMemory: categoriesFound.includes('memory'), hasSurprise: categoriesFound.includes('surprise'),
  };
});

const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
const header = ['pageNumber','route','component','file','sourceBytes','categories','mechanics','imports','hasGame','hasGift','hasRomance','hasMemory','hasSurprise','fingerprint'];
const csv = [header.join(','), ...rows.map((row) => header.map((key) => escape(row[key])).join(','))].join('\n');
fs.writeFileSync(path.join(auditDir, 'page_experience_inventory.csv'), `${csv}\n`);

const counts = (key) => rows.filter((row) => row[key]).length;
const mechanics = [...new Set(rows.flatMap((row) => row.mechanics ? row.mechanics.split('|') : []))];
const mechanicCounts = Object.fromEntries(mechanics.map((mechanic) => [mechanic, rows.filter((row) => row.mechanics.split('|').includes(mechanic)).length]));
const weak = rows.filter((row) => !row.hasGift || !row.hasRomance || !row.hasSurprise);
const gameOnly = rows.filter((row) => row.hasGame && !row.hasGift && !row.hasRomance && !row.hasSurprise && !row.hasMemory);
const duplicateFingerprints = Object.entries(Object.groupBy(rows, (row) => row.fingerprint)).filter(([, group]) => group.length > 1).map(([fingerprint, group]) => ({ fingerprint, routes: group.map((row) => row.route) }));
const summary = `# Full Page Experience Audit\n\nScanned **${rows.length} registered routes** and mapped them to ${rows.filter((row) => row.file).length} page files. The audit is source-based and checks whether each page contains a meaningful mix of game, gift, romance, memory, and surprise language.\n\n| Measure | Count |\n|---|---:|\n| Routes scanned | ${rows.length} |\n| Pages with game signals | ${counts('hasGame')} |\n| Pages with gift signals | ${counts('hasGift')} |\n| Pages with romantic/personal signals | ${counts('hasRomance')} |\n| Pages with memory/story signals | ${counts('hasMemory')} |\n| Pages with surprise/reveal signals | ${counts('hasSurprise')} |\n| Pages missing at least one core gift dimension | ${weak.length} |\n| Game-only pages needing rewrite | ${gameOnly.length} |\n| Structural fingerprint groups with overlap | ${duplicateFingerprints.length} |\n\n## Mechanic frequency\n\n| Mechanic | Pages detected |\n|---|---:|\n${mechanics.map((mechanic) => `| ${mechanic} | ${mechanicCounts[mechanic]} |`).join('\n')}\n\n## Rewrite priorities\n\n${weak.slice(0, 80).map((row) => `- **${row.route}** (${row.component}): ${row.categories || 'no detected experience category'}`).join('\n') || 'No weak pages detected.'}\n\n## Structural overlap groups\n\n${duplicateFingerprints.slice(0, 50).map((group) => `- ${group.routes.join(', ')}`).join('\n') || 'No duplicate structural fingerprints detected.'}\n`;
fs.writeFileSync(path.join(auditDir, 'page_experience_summary.md'), summary);
console.log(JSON.stringify({ routes: rows.length, pages: rows.filter((row) => row.file).length, gameOnly: gameOnly.length, weak: weak.length, duplicateFingerprints: duplicateFingerprints.length, mechanicCounts }, null, 2));
