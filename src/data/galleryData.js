import { ALL_PHOTOS, ALL_VIDEOS, getAssetUrl } from '../utils/mediaUtils';

// Video clips dataset (35 videos from public/video/)
const videoItems = ALL_VIDEOS.map((vPath, idx) => ({
  id: 1000 + idx + 1,
  url: getAssetUrl(vPath),
  category: 'video',
  type: 'video',
  title: `Sanzu Special Video Clip #${idx + 1} 🎬`,
  compliment: `Special Video Moment #${idx + 1} 🎥`,
  nepaliCompliment: `Mero Bebo Ko Pyaro Video Clip #${idx + 1} 💕`
}));

// Photo items dataset (42 curated photos from public/photos/)
const photoItems = ALL_PHOTOS.map((pPath, idx) => ({
  id: idx + 1,
  url: getAssetUrl(pPath),
  category: idx % 2 === 0 ? 'couple' : 'bhuntu',
  type: 'image',
  title: `Sanzu & Abu Memory #${idx + 1} 🌸`,
  compliment: `Beautiful memory with my sweet Bebo #${idx + 1} 💕`,
  nepaliCompliment: `Mero sabai bhanda pyaro pal temisanga #${idx + 1}! ✨`
}));

// Structured Gallery Data
export const galleryItems = [...photoItems, ...videoItems];
