import { ALL_PHOTOS, ALL_VIDEOS, getAssetUrl } from '../utils/mediaUtils';

// Curated Media Vault strictly mapping to public/photos/ and public/video/
export const allMediaData = [
  ...ALL_PHOTOS.map((p, i) => ({
    name: `Bhuntu Photo #${i + 1}`,
    isVideo: false,
    path: getAssetUrl(p),
    size: 100000
  })),
  ...ALL_VIDEOS.map((v, i) => ({
    name: `Bhuntu Video Moment #${i + 1}`,
    isVideo: true,
    path: getAssetUrl(v),
    size: 5000000
  }))
];