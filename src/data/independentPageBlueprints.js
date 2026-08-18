import { ROOM_SEQUENCE } from './roomSequence';
import { pageNameByRoute } from './pageNames';

const visualLanguages = [
  ['paper atelier', '#9a5b3c'], ['ink noir', '#e5b45e'], ['sakura editorial', '#e86aa7'], ['blue-hour cinema', '#65b7e8'],
  ['film negative', '#e6b86b'], ['mint desk', '#43b89a'], ['terracotta sunset', '#ef8d5a'], ['lavender diary', '#9b83e8'],
  ['museum cream', '#a98250'], ['neon cassette', '#39d8ec'], ['sunlit postcard', '#e9a62a'], ['everest night', '#8bc7e8'],
  ['rose theatre', '#ef7eb9'], ['post-it wall', '#a7c957'], ['sea glass', '#35bcb2'], ['candle archive', '#e7b04d'],
  ['botanical garden', '#63b56f'], ['train-window blue', '#65a9de'], ['red envelope', '#e5a84b'], ['cloud paper', '#72b8e6'],
  ['vinyl blue', '#54c8e8'], ['future scooter', '#9bcf32'], ['quiet sunrise', '#ec9c73'], ['final gallery', '#ed75b5'],
];
const compositions = [
  'asymmetric split-screen', 'full-bleed portrait with margin notes', 'vertical museum placard', 'cinema title card',
  'desktop scrapbook', 'passport spread', 'floating island cards', 'long editorial scroll', 'postcard stack', 'map-and-route board',
  'ticket-window frame', 'three-column contact sheet', 'diary spread', 'window-seat vignette', 'altar table', 'archive index',
];
const rituals = [
  'open a sealed line', 'trace the memory path', 'choose one promise', 'listen for Abu’s cue', 'place a keepsake',
  'turn the page slowly', 'light the next mark', 'pair the photo with its note', 'leave a tiny answer', 'unlock the next scene',
  'collect a future detail', 'send one thought across distance', 'press the room’s hidden button', 'read the margin note',
  'build a small constellation', 'name the feeling', 'fold the moment', 'watch the reveal', 'save the sentence', 'follow the quiet route',
];
const photoTreatments = [
  'full portrait on warm paper', 'black-and-gold contact print', 'sakura-framed vertical crop-free print', 'blue-hour film still',
  'polaroid with handwritten caption', 'passport stamp beside portrait', 'gallery label with exact visible detail', 'soft-focus memory window',
  'three-photo proof sheet', 'postcard edge with destination note', 'museum mount with photo metadata', 'night-sky portrait card',
  'transparent film overlay', 'photo pinned to a map', 'portrait under a paper lantern', 'keepsake envelope insert',
];
const giftForms = [
  'a private sentence', 'a memory ticket', 'a promise card', 'a Nepalgunj–Sakai route note', 'a future date invitation',
  'a keepsake label', 'a voice-note transcript', 'a tiny travel voucher', 'a birthday blessing', 'a photo annotation',
  'a handwritten-style confession', 'a shared-plan card', 'a ring-side promise', 'a food-memory recipe', 'a late-night message', 'a final-room key',
];
const voices = [
  'Abu writes softly', 'Abu speaks in a late-night voice', 'Abu leaves a museum label', 'Abu writes from Dhamboji',
  'Abu sends a Sakai-distance note', 'Abu remembers a small detail', 'Abu makes a future promise', 'Abu keeps the sentence short',
];

const pick = (items, index, multiplier, offset = 0) => items[(index * multiplier + offset) % items.length];

export const independentPageBlueprints = Object.fromEntries(ROOM_SEQUENCE.map((route, index) => {
  const page = pageNameByRoute[route] || {};
  return [route, {
    order: index + 1,
    route,
    title: page.title || route,
    visual: pick(visualLanguages, index, 7),
    composition: pick(compositions, index, 5, 1),
    ritual: pick(rituals, index, 11, 3),
    photoTreatment: pick(photoTreatments, index, 13, 2),
    giftForm: pick(giftForms, index, 17, 4),
    voice: pick(voices, index, 19, 1),
    identity: `${String(index + 1).padStart(3, '0')}-${pick(visualLanguages, index, 7)[0].replaceAll(' ', '-')}-${pick(rituals, index, 11, 3).replaceAll(' ', '-')}`,
  }];
}));

export const getIndependentBlueprint = (route) => independentPageBlueprints[route] || {
  order: 0,
  route,
  title: route,
  visual: visualLanguages[0],
  composition: compositions[0],
  ritual: rituals[0],
  photoTreatment: photoTreatments[0],
  giftForm: giftForms[0],
  voice: voices[0],
  identity: 'outside-sequence',
};
