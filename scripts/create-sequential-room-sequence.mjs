import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const app = fs.readFileSync(path.join(root, 'src', 'App.jsx'), 'utf8');
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route]) => route);
const unique = [...new Set(routes)];
const lines = [
  '// Canonical sequential order. Page 1 is the doorway, then every registered route follows in App.jsx order.',
  `export const ROOM_SEQUENCE = ${JSON.stringify(unique, null, 2)};`,
  `export const PAGE_SEQUENCE = ROOM_SEQUENCE.map((route, index) => ({ pageNumber: index + 1, route }));`,
  '',
];
fs.writeFileSync(path.join(root, 'src', 'data', 'roomSequence.js'), lines.join('\n'));
console.log(JSON.stringify({ routes: routes.length, unique: unique.length, first: unique.slice(0, 5), last: unique.slice(-5) }, null, 2));
