import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const app = fs.readFileSync(path.join(root, 'src', 'App.jsx'), 'utf8');
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route, component], index) => ({ route, component, index }));
const output = path.join(root, 'src', 'data', 'pageGiftData.js');

const names = ['Samjhana', 'Sanzu', 'Bhuntu', 'Sanu', 'Babe', 'Runchi', 'Bhoot', 'Bebo', 'Fuchee'];
const kinds = ['letter', 'keepsake', 'memory', 'compliment', 'promise', 'journey', 'bouquet', 'voice-note', 'future', 'blessing', 'cinema', 'single-quiz'];
const accents = ['rose', 'saffron', 'night', 'mint', 'lavender', 'peach', 'sky', 'plum'];
const gifts = [
  'a private letter from Abu', 'a tiny memory ticket from Nepalgunj', 'a bouquet of words for your soft days', 'a promise folded into a keepsake card',
  'a voice-note moment for the nights you miss home', 'a future postcard from the light-blue scooter road', 'a compliment saved for your next tired day',
  'a small surprise box with one true thing inside', 'a Bageshwori memory pressed between two pages', 'a Sakai-to-Nepalgunj distance token',
  'a birthday blessing written in Abu’s handwriting', 'a quiet “open when” note for your pocket', 'a memory ribbon tied to your favourite name',
  'a tiny cinema ticket for one moment Abu would replay', 'a promise map for the places we still want to see', 'a soft landing place for a difficult day',
];
const compliments = [
  'Your smile makes Abu forget what he was worried about.', 'Your “huss” can make a long day feel close again.', 'Your kindness is one of the reasons Abu keeps choosing you.',
  'Your moods, your laugh, your quiet, and your Bhoot moments all belong to the girl Abu loves.', 'You make ordinary food, ordinary calls, and ordinary rooms feel like memories.',
  'You are the person behind every name Abu says with a softer voice.', 'Your voice can cross the Nepalgunj-to-Sakai distance faster than any flight.',
  'You are beautiful in the moments you never think to pose for.', 'You make Abu want to become gentler, steadier, and more worthy of your trust.',
  'You are the best part of every future Abu imagines.',
];
const memories = [
  'the room-search conversation that started in Nepalgunj', 'Bageshwori Temple and the prayers we carried home', 'Water Park laughter and the day moving too quickly',
  'Chau-Chau, Panipuri, momo, and the foods that became our language', 'dropping you at the Language Institute before Japan', 'late-night video calls between Nepalgunj and Sakai, Osaka',
  'the day “Abhay” became “Abu” because you made it yours', 'the future light-blue scooter ride toward Bardiya', 'the dream of Pokhara, Manang, and Mustang waiting for us',
  'the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home',
];
const reveals = [
  'Open this when you miss Abu.', 'Keep this for the next time distance feels loud.', 'This is a reminder that you are loved in the details.',
  'A small surprise: Abu remembers more than he says.', 'The gift inside is not expensive; it is specific to you.', 'This page is a soft place to land when your day is heavy.',
  'The secret is simple: Abu would still choose you in every version of the story.', 'Read this slowly, Sanu. It was made for your exact heart.',
];

const hash = (text) => [...text].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
const pick = (list, seed, offset = 0) => list[(seed + offset) % list.length];
const titleFromRoute = (route) => route === '/' ? 'Abu’s birthday doorway' : route.split('/').filter(Boolean).pop().split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ');
const quote = (route, seed) => `${pick(compliments, seed)} This page is Abu’s ${pick(gifts, seed, 3)} for ${pick(names, seed, 1)}.`;

const records = routes.map(({ route, component, index }) => {
  const seed = hash(`${route}:${component}`);
  const nickname = pick(names, seed);
  const kind = route === '/quiz' ? 'single-quiz' : pick(kinds.filter((item) => item !== 'single-quiz'), seed);
  const memory = pick(memories, seed, 1);
  return {
    pageNumber: String(index + 1).padStart(3, '0'), route, component, title: titleFromRoute(route), nickname, kind, accent: pick(accents, seed),
    gift: pick(gifts, seed), compliment: pick(compliments, seed), memory,
    message: `Samjhana, my ${nickname}, Abu made the ${titleFromRoute(route)} room around ${memory}. ${pick(reveals, seed, 2)}`,
    surprise: `${pick(reveals, seed)} ${quote(route, seed)}`,
  };
});

const js = `// Generated from every registered route. Do not replace with generic page copy.\nexport const pageGiftData = ${JSON.stringify(records, null, 2)};\n\nexport const pageGiftByRoute = Object.fromEntries(pageGiftData.map((item) => [item.route, item]));\n`;
fs.writeFileSync(output, js);
console.log(JSON.stringify({ output, records: records.length, kinds: [...new Set(records.map((record) => record.kind))] }, null, 2));
