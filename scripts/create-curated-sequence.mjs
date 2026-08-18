import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const app = fs.readFileSync(path.join(root, 'src', 'App.jsx'), 'utf8');
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route]) => route);
const audit = fs.readFileSync(path.join(root, 'audit', 'page_experience_inventory.csv'), 'utf8');
const retained = new Set([
  '/quiz', '/cooking-game', '/photo-puzzle-3d', '/love-maze', '/couple-bingo', '/love-crossword', '/love-languages-quiz', '/love-constellation-painter', '/romantic-karaoke', '/love-rhythm-game', '/love-butterfly-catcher', '/wish-wheel', '/love-spin-bottle', '/sweet-proposal-simulator', '/love-doodle-canvas', '/love-firework-painter', '/love-wordle', '/couple-bucket-list-spinner', '/love-scratch-card', '/love-memory-match-3d',
]);
const parseCsv = (text) => text.split(/\r?\n/).filter(Boolean).map((line) => { const out = []; let value = ''; let quoted = false; for (let i = 0; i < line.length; i += 1) { const ch = line[i]; if (ch === '"' && line[i + 1] === '"') { value += '"'; i += 1; } else if (ch === '"') quoted = !quoted; else if (ch === ',' && !quoted) { out.push(value); value = ''; } else value += ch; } out.push(value); return out; });
const rows = parseCsv(audit);
const header = rows.shift();
const index = Object.fromEntries(header.map((key, i) => [key, i]));
const gameRoutes = new Set(rows.filter((row) => row[index.hasGame] === 'true').map((row) => row[index.route]));
const sequence = [...new Set(routes)].filter((route) => !gameRoutes.has(route) || retained.has(route));
const removed = [...gameRoutes].filter((route) => !retained.has(route));
const output = `// Curated first-birthday order. All routes follow App.jsx order.\n// Only the twenty routes listed in gamePolicy.js remain game experiences.\nexport const ROOM_SEQUENCE = ${JSON.stringify(sequence, null, 2)};\nexport const PAGE_SEQUENCE = ROOM_SEQUENCE.map((route, index) => ({ pageNumber: index + 1, route }));\n`;
fs.writeFileSync(path.join(root, 'src', 'data', 'roomSequence.js'), output);
fs.writeFileSync(path.join(root, 'audit', 'removed_game_routes.csv'), ['route', ...removed].join('\n') + '\n');
console.log(JSON.stringify({ originalRoutes: routes.length, curatedRoutes: sequence.length, detectedGameRoutes: gameRoutes.size, retainedGames: [...gameRoutes].filter((route) => retained.has(route)).length, removedGames: removed.length, first: sequence.slice(0, 6), last: sequence.slice(-6) }, null, 2));
