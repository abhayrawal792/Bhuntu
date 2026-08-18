import fs from 'node:fs';

const renameRoutes = {
  '/bouquet-reasons': 'A Bouquet of Reasons Abu Loves You',
  '/future-night-ride': 'The Night Ride We Still Owe Ourselves',
  '/promise-trio': 'Three Little Promises for Our Future',
  '/letter-tonight': 'The Letter Abu Would Send Tonight',
  '/secret-language': 'The Secret Language of Us',
  '/birthday-wish-letter': 'A Sealed Birthday Letter from Abu',
  '/memory-replay': 'The Memory Abu Keeps Replaying',
  '/birthday-sky-letter': 'Your Birthday Sky Letter',
  '/little-things-abu-notices': 'The Little Things Abu Notices',
};
const removed = new Set(['/couple-bucket-list-spinner', '/love-spin-bottle']);
const componentRename = new Set(['SpinWheelPage', 'FerrisWheelPage', 'LoveSpinner3DPage', 'LoveWheelFortunePage', 'SecretCipherWheelPage', 'WishWheelPage', 'RomanticMemoryWheelPage', 'LoveHoroscopeWheelPage', 'BhuntuTriviaWheelPage']);

function rewrite(file, exportName, suffix) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(new RegExp(`export const ${exportName} = ([\\s\\S]*?);\\n`));
  if (!match) throw new Error(`Could not parse ${file}`);
  const data = JSON.parse(match[1]).filter((item) => !removed.has(item.route));
  for (const item of data) {
    if (renameRoutes[item.route]) item.title = renameRoutes[item.route];
    if (componentRename.has(item.component)) item.component = 'RomanticReplacementPage';
  }
  const output = `// ${suffix}\nexport const ${exportName} = ${JSON.stringify(data, null, 2)};\n${exportName === 'pageNames' ? 'export const pageNameByRoute = Object.fromEntries(pageNames.map((item) => [item.route, item]));\n' : 'export const pageGiftByRoute = Object.fromEntries(pageGiftData.map((item) => [item.route, item]));\n'}`;
  fs.writeFileSync(file, output);
  return data.length;
}
const names = rewrite('src/data/pageNames.js', 'pageNames', 'Relevant visible names for every registered route.');
const gifts = rewrite('src/data/pageGiftData.js', 'pageGiftData', 'Unique Abu-to-Samjhana gift records for every registered route.');
console.log(JSON.stringify({ pageNames: names, pageGiftData: gifts }, null, 2));
