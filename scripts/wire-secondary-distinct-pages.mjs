import fs from 'node:fs';
const file = 'src/App.jsx';
let text = fs.readFileSync(file, 'utf8');
const routes = {
  '/secret-vault-2': 'SecretVaultSecondPage',
  '/love-memory-match-3d': 'LoveMemoryMatch3DPage',
  '/love-grand-finale-2': 'LoveGrandFinaleSecondPage',
  '/future-house-builder-2': 'FutureHouseBuilderSecondPage',
  '/love-scratch-off-gallery-2': 'LoveScratchOffGallerySecondPage',
  '/couple-milestone-map-2': 'CoupleMilestoneMap2Page',
  '/love-letter-archive-vault': 'LoveLetterArchiveVaultPage',
  '/love-spell-caster-studio': 'LoveSpellCasterStudioPage',
  '/love-potion-lab-2': 'LovePotionLab2Page',
};
const anchor = "const RomanticReplacementPage = lazy(() => import('./pages/RomanticReplacementPage'));";
const imports = Object.entries(routes).map(([, component]) => `const ${component} = lazy(() => import('./pages/${component}'));`).join('\n');
if (!text.includes('const SecretVaultSecondPage = lazy')) text = text.replace(anchor, `${anchor}\n${imports}`);
for (const [route, component] of Object.entries(routes)) {
  const escaped = route.replaceAll('/', '\\/');
  text = text.replace(new RegExp(`(<Route path="${escaped}"\\s+element=)\\{<[A-Za-z0-9_]+ />\\}`, 'g'), `$1{<${component} />}`);
}
fs.writeFileSync(file, text);
console.log(JSON.stringify({ wired: routes }, null, 2));
