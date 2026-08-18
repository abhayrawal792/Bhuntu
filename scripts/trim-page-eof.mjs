import fs from 'node:fs';
import path from 'node:path';
const dir = path.join(process.cwd(), 'src/pages');
let changed = 0;
for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.jsx'))) {
  const full = path.join(dir, file);
  const before = fs.readFileSync(full, 'utf8');
  const after = before.replace(/\s+$/u, '\n');
  if (after !== before) { fs.writeFileSync(full, after); changed += 1; }
}
console.log(`Trimmed EOF whitespace in ${changed} page files.`);
