import fs from 'node:fs';
const file = 'src/App.jsx';
let text = fs.readFileSync(file, 'utf8');
const routes = {
  '/bouquet-reasons': 'BouquetReasonsPage',
  '/future-night-ride': 'FutureNightRidePage',
  '/promise-trio': 'PromiseTrioPage',
  '/letter-tonight': 'LetterTonightPage',
  '/secret-language': 'SecretLanguagePage',
  '/birthday-wish-letter': 'BirthdayWishLetterPage',
  '/memory-replay': 'MemoryReplayPage',
  '/birthday-sky-letter': 'BirthdaySkyLetterPage',
  '/little-things-abu-notices': 'LittleThingsPage',
};
const anchor = "const RomanticReplacementPage = lazy(() => import('./pages/RomanticReplacementPage'));";
const imports = Object.entries(routes).map(([, component]) => `const ${component} = lazy(() => import('./pages/${component}'));`).join('\n');
if (!text.includes('const BouquetReasonsPage = lazy')) text = text.replace(anchor, `${anchor}\n${imports}`);
for (const [route, component] of Object.entries(routes)) text = text.replace(new RegExp(`(<Route path="${route.replaceAll('/', '\\/')}"\\s+element=)\\{<RomanticReplacementPage />\\}`, 'g'), `$1{<${component} />}`);
fs.writeFileSync(file, text);
console.log(JSON.stringify({ wired: routes }, null, 2));
