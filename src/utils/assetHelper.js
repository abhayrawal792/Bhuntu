import { ALL_PHOTOS, ALL_VIDEOS, getAssetUrl } from './mediaUtils';

// Combine clean 42 photos + 35 videos (excluding WhatsApp chat screenshots)
export const ALL_MEDIA_COMBINED = [
  ...ALL_PHOTOS.map(p => ({ type: 'image', src: getAssetUrl(p) })),
  ...ALL_VIDEOS.map(v => ({ type: 'video', src: getAssetUrl(v) }))
];

/**
 * Returns a unique media item (photo or video) for any page index from 1 to 300.
 * Excludes WhatsApp chat screenshots — uses clean photos & videos only.
 */
export const getUniqueMediaForPage = (pageIndex = 1) => {
  const total = ALL_MEDIA_COMBINED.length;
  const idx = (Math.max(1, pageIndex) - 1);
  
  if (idx < total) {
    return ALL_MEDIA_COMBINED[idx];
  }
  
  const permutedIdx = (idx * 37) % total;
  return ALL_MEDIA_COMBINED[permutedIdx];
};

/**
 * Returns a unique clean photo of Sanzu for any page index (1..300)
 */
export const getUniquePhotoForPage = (pageIndex = 1) => {
  const total = ALL_PHOTOS.length;
  const idx = (Math.max(1, pageIndex) - 1);
  const selectedPath = idx < total ? ALL_PHOTOS[idx] : ALL_PHOTOS[(idx * 7) % total];
  return getAssetUrl(selectedPath);
};

/**
 * Returns a unique video for any page index (1..300) from the 35 real videos of Sanzu
 */
export const getUniqueVideoForPage = (pageIndex = 1) => {
  const total = ALL_VIDEOS.length;
  const idx = (Math.max(1, pageIndex) - 1) % total;
  return getAssetUrl(ALL_VIDEOS[idx]);
};

export { getAssetUrl };
