import fs from 'node:fs';
const mapping = {
  '/bouquet-reasons': 'BouquetReasonsPage',
  '/future-night-ride': 'FutureNightRidePage',
  '/promise-trio': 'PromiseTrioPage',
  '/letter-tonight': 'LetterTonightPage',
  '/secret-language': 'SecretLanguagePage',
  '/birthday-wish-letter': 'BirthdayWishLetterPage',
  '/memory-replay': 'MemoryReplayPage',
  '/birthday-sky-letter': 'BirthdaySkyLetterPage',
  '/little-things-abu-notices': 'LittleThingsPage',
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
function update(file, exportName) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(new RegExp(`export const ${exportName} = ([\\s\\S]*?);\\n`));
  if (!match) throw new Error(`Cannot parse ${file}`);
  const records = JSON.parse(match[1]);
  for (const item of records) if (mapping[item.route]) item.component = mapping[item.route];
  const suffix = exportName === 'pageNames' ? 'Relevant visible names for every registered route.' : 'Unique Abu-to-Samjhana gift records for every registered route.';
  const extra = exportName === 'pageNames' ? 'export const pageNameByRoute = Object.fromEntries(pageNames.map((item) => [item.route, item]));' : 'export const pageGiftByRoute = Object.fromEntries(pageGiftData.map((item) => [item.route, item]));';
  fs.writeFileSync(file, `// ${suffix}\nexport const ${exportName} = ${JSON.stringify(records, null, 2)};\n${extra}\n`);
}
update('src/data/pageNames.js', 'pageNames');
update('src/data/pageGiftData.js', 'pageGiftData');
console.log('Updated page metadata component names.');
