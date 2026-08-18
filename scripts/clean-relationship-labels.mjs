import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const roots = ['src', 'index.html', 'index.source.html'];
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.html', '.md', '.json']);
const replacements = [
  ['wife-to-be', 'favorite person'],
  ['Wifey', 'Bebo'],
  ['wifey', 'Bebo'],
  ['future husband', 'future together'],
  ['Future Husband', 'Future Together'],
  ['husband', 'partner'],
  ['Husband', 'Partner'],
  ['Abu\'s wife', 'Samjhana\'s special name'],
  ['Abu’s wife', 'Samjhana’s special name'],
  ['beloved wife', 'beloved person'],
  ['Mero Budi (Bebo)', 'Bhuntu (Bebo)'],
  ['Mero Budi', 'Bhuntu'],
  ['Mero Buda', 'Abu'],
  ["'BUDI'", "'BABE'"],
  ['BUDI', 'BABE'],
];
function filesUnder(entry) {
  if (!fs.existsSync(entry)) return [];
  const stat = fs.statSync(entry);
  if (stat.isFile()) return extensions.has(path.extname(entry)) ? [entry] : [];
  return fs.readdirSync(entry, { withFileTypes: true }).flatMap((item) => filesUnder(path.join(entry, item.name)));
}
let changed = 0;
for (const entry of roots) {
  for (const file of filesUnder(path.join(root, entry))) {
    const before = fs.readFileSync(file, 'utf8');
    let after = before;
    for (const [from, to] of replacements) after = after.split(from).join(to);
    if (after !== before) { fs.writeFileSync(file, after); changed += 1; }
  }
}
console.log(`Cleaned prohibited relationship labels in ${changed} text files.`);
