import fs from 'node:fs';
import path from 'node:path';
const root = path.join(process.cwd(), 'src');
const findings = [];
for (const file of fs.readdirSync(root, { recursive: true })) {
  if (!file.endsWith('.jsx')) continue;
  const full = path.join(root, file);
  const text = fs.readFileSync(full, 'utf8');
  for (const match of text.matchAll(/<img\b[\s\S]*?\/>/g)) {
    if (/object-cover|object-\[center_20%\]/.test(match[0])) findings.push({ file, line: text.slice(0, match.index).split('\n').length, tag: match[0].replace(/\s+/g, ' ').slice(0, 220) });
  }
}
console.log(JSON.stringify({ remaining: findings.length, findings }, null, 2));
