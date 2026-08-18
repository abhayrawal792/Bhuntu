import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const replacements = [
  ['SpinWheelPage.jsx', 'SpinWheelPage'],
  ['FerrisWheelPage.jsx', 'FerrisWheelPage'],
  ['LoveSpinner3DPage.jsx', 'LoveSpinner3DPage'],
  ['LoveWheelFortunePage.jsx', 'LoveWheelFortunePage'],
  ['SecretCipherWheelPage.jsx', 'SecretCipherWheelPage'],
  ['WishWheelPage.jsx', 'WishWheelPage'],
  ['RomanticMemoryWheelPage.jsx', 'RomanticMemoryWheelPage'],
  ['LoveHoroscopeWheelPage.jsx', 'LoveHoroscopeWheelPage'],
  ['BhuntuTriviaWheelPage.jsx', 'BhuntuTriviaWheelPage'],
];
for (const [file, component] of replacements) {
  const target = path.join(root, 'src', 'pages', file);
  const content = `import React from 'react';\nimport RomanticReplacementPage from './RomanticReplacementPage';\n\nexport default function ${component}() {\n  return <RomanticReplacementPage />;\n}\n`;
  fs.writeFileSync(target, content);
}
console.log(JSON.stringify({ rewritten: replacements.map(([file]) => file) }, null, 2));
