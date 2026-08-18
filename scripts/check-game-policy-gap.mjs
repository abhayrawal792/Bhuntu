import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const { RETAINED_GAME_ROUTES } = await import(`file://${path.join(root, 'src/data/gamePolicy.js')}?gap=${Date.now()}`);
const { ROOM_SEQUENCE } = await import(`file://${path.join(root, 'src/data/roomSequence.js')}?gap=${Date.now()}`);
const text = fs.readFileSync(path.join(root, 'audit/page_experience_inventory.csv'), 'utf8');
const detected = new Set([...text.matchAll(/"(\/[^\"]+)","[^"]+","[^"]+","[^"]+","[^"]+","[^"]*game[^"]*"/g)].map((match) => match[1]));
console.log(JSON.stringify({ policyMissingFromSequence: RETAINED_GAME_ROUTES.filter((route) => !ROOM_SEQUENCE.includes(route)), sequenceGames: ROOM_SEQUENCE.filter((route) => detected.has(route)), policyMissingDetected: RETAINED_GAME_ROUTES.filter((route) => !detected.has(route)) }, null, 2));
