import fs from 'node:fs';
import { ROOM_SEQUENCE } from '../src/data/roomSequence.js';
fs.writeFileSync('/tmp/bhuntu_room_sequence.json', JSON.stringify(ROOM_SEQUENCE));
console.log(`Exported ${ROOM_SEQUENCE.length} sequential routes.`);
