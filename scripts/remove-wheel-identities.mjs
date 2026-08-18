import fs from 'node:fs';

const files = [
  'src/App.jsx',
  'src/data/roomSequence.js',
  'src/data/pageGiftData.js',
  'src/data/pageNames.js',
  'src/data/birthdayData.js',
];
const replacements = [
  ['/spin-wheel', '/bouquet-reasons'],
  ['/ferris-wheel', '/future-night-ride'],
  ['/love-spinner-3d', '/promise-trio'],
  ['/love-wheel-fortune', '/letter-tonight'],
  ['/secret-cipher-wheel', '/secret-language'],
  ['/wish-wheel', '/birthday-wish-letter'],
  ['/romantic-memory-wheel', '/memory-replay'],
  ['/love-horoscope-wheel', '/birthday-sky-letter'],
  ['/bhuntu-trivia-wheel', '/little-things-abu-notices'],
  ['Spin Wheel', 'Bouquet of Reasons'],
  ['Ferris Wheel', 'The Night Ride'],
  ['Love Spinner 3D', 'Three Promises'],
  ['Love Wheel Fortune', 'Letter Abu Would Send Tonight'],
  ['Secret Cipher Wheel', 'The Secret Language of Us'],
  ['Wish Wheel', 'Birthday Wish Letter'],
  ['Romantic Memory Wheel', 'Memory Abu Keeps Replaying'],
  ['Love Horoscope Wheel', 'Birthday Sky Letter'],
  ['Bhuntu Trivia Wheel', 'Little Things Abu Notices'],
];
for (const relative of files) {
  const file = new URL(`../${relative}`, import.meta.url);
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of replacements) text = text.split(from).join(to);
  fs.writeFileSync(file, text);
}
console.log('Removed wheel/roulette route identities from app, sequence, and gift/title data.');
