import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'src');
let filesChanged = 0;
let tagsChanged = 0;

for (const file of fs.readdirSync(root, { recursive: true })) {
  if (!file.endsWith('.jsx')) continue;
  const full = path.join(root, file);
  const before = fs.readFileSync(full, 'utf8');
  const after = before.replace(/<img\b[\s\S]*?\/>/g, (tag) => {
    if (!/object-cover|object-\[center_20%\]/.test(tag)) return tag;
    const next = tag
      .replaceAll('object-cover', 'object-contain')
      .replaceAll('object-[center_20%]', 'object-center');
    if (next !== tag) tagsChanged += 1;
    return next;
  });
  if (after !== before) {
    fs.writeFileSync(full, after);
    filesChanged += 1;
  }
}

console.log(`Updated ${tagsChanged} image tags across ${filesChanged} JSX files.`);
