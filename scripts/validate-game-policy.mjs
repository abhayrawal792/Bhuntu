import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const { ROOM_SEQUENCE } = await import(pathToFileURL(path.join(root, 'src', 'data', 'roomSequence.js')).href);
const { RETAINED_GAME_ROUTES } = await import(pathToFileURL(path.join(root, 'src', 'data', 'gamePolicy.js')).href);
const audit = fs.readFileSync(path.join(root, 'audit', 'page_experience_inventory.csv'), 'utf8');
const parseCsv = (text) => text.split(/\r?\n/).filter(Boolean).map((line) => { const out = []; let value = ''; let quoted = false; for (let i = 0; i < line.length; i += 1) { const ch = line[i]; if (ch === '"' && line[i + 1] === '"') { value += '"'; i += 1; } else if (ch === '"') quoted = !quoted; else if (ch === ',' && !quoted) { out.push(value); value = ''; } else value += ch; } out.push(value); return out; });
const rows = parseCsv(audit);
const header = rows.shift();
const col = Object.fromEntries(header.map((key, i) => [key, i]));
const detectedGames = new Set(rows.filter((row) => row[col.hasGame] === 'true').map((row) => row[col.route]));
const sequenceGames = ROOM_SEQUENCE.filter((route) => detectedGames.has(route));
const errors = [];
if (RETAINED_GAME_ROUTES.length !== 20) errors.push(`Retained game policy contains ${RETAINED_GAME_ROUTES.length} routes, expected 20.`);
if (sequenceGames.length !== 20) errors.push(`Curated sequence contains ${sequenceGames.length} detected game routes, expected 20.`);
for (const route of RETAINED_GAME_ROUTES) if (!ROOM_SEQUENCE.includes(route)) errors.push(`Retained game missing from sequence: ${route}`);
for (const route of sequenceGames) if (!RETAINED_GAME_ROUTES.includes(route)) errors.push(`Unapproved game remains in sequence: ${route}`);
const report = `# First-Birthday Game Policy\n\n| Measure | Result |\n|---|---:|\n| Curated sequence routes | ${ROOM_SEQUENCE.length} |\n| Detected game routes in curated sequence | ${sequenceGames.length} |\n| Approved game routes | ${RETAINED_GAME_ROUTES.length} |\n| Removed game routes | ${[...detectedGames].filter((route) => !ROOM_SEQUENCE.includes(route)).length} |\n| Errors | ${errors.length} |\n\n## Approved games\n\n${RETAINED_GAME_ROUTES.map((route, index) => `${index + 1}. ${route}`).join('\n')}\n\n${errors.length ? `## Errors\n\n${errors.map((error) => `- ${error}`).join('\n')}` : 'The curated sequence contains exactly twenty approved games. All other detected game routes are excluded.'}\n`;
fs.mkdirSync(path.join(root, 'audit'), { recursive: true });
fs.writeFileSync(path.join(root, 'audit', 'game_policy_validation.md'), report);
if (errors.length) { console.error(report); process.exit(1); }
console.log(report);
