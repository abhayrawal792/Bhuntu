import fs from 'node:fs';
const file = 'scripts/write-bespoke-game-rooms.mjs';
let source = fs.readFileSync(file, 'utf8');
const pattern = /className=\{`([^`]*)`\}/g;
source = source.replace(pattern, (_, content) => {
  const parts = [];
  let cursor = 0;
  const interpolation = /\$\{([^}]*)\}/g;
  let match;
  while ((match = interpolation.exec(content))) {
    const literal = content.slice(cursor, match.index);
    if (literal) parts.push(JSON.stringify(literal));
    parts.push('(' + match[1] + ')');
    cursor = match.index + match[0].length;
  }
  const tail = content.slice(cursor);
  if (tail) parts.push(JSON.stringify(tail));
  return 'className={' + parts.join(' + ') + '}';
});
fs.writeFileSync(file, source);
console.log('Repaired embedded className template literals.');
