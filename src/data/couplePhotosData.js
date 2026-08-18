import { ALL_PHOTOS, getAssetUrl } from '../utils/mediaUtils';

// Explicit Couple & Sanzu Photos Data Structure (Strictly 42 photos from public/photos/)
export const couplePhotosData = ALL_PHOTOS.map((path, idx) => {
  const captions = [
    { title: "Our Sweet First Date 💕", eng: "The prettiest smile in the universe next to me ❤️", nep: "Mero sabai bhanda pyaro pal temisanga! 💕" },
    { title: "Nepalgunj to Osaka Connection ✈️", eng: "Every moment with you feels like magic ✨", nep: "Nepalgunj bata Osaka, mutu eutai xa! ✈️" },
    { title: "Holding Hands Forever 🤝", eng: "Holding your hand in my dreams until we meet 🤝", nep: "Hamro 1 Barsa ko meetho maya ra saath! 💍" },
    { title: "Sunset Moments Together 🌅", eng: "My favorite day in the world is any day with you 🌟", nep: "Temi nai mero vartaman ra bhavishya hou! 🌹" },
    { title: "Forever Choosing You Promise 💍", eng: "Forever and always your favourite person, my Bhuntu 💖", nep: "Mero kanxu, Bebo, Sanu, Bhuntu — mero sabai bhanda pyaro manxe! 👑" },
    { title: "Special Long-Distance Memory 🇳🇵✈️🇯🇵", eng: "Two souls, one beautiful long distance journey", nep: "Hamro bihe ra sadhai bhariko saath ko promise! <ctrl42>" },
    { title: "Her Adorable Smile 🥰", eng: "Your laugh makes all distance disappear instantly 🥰", nep: "Temro yo muskan mero sabai thakai harauxa Bebo! ❤️" },
    { title: "Pure Romance 🌸", eng: "My heart beats only for you, my sweet Bebo ❤️", nep: "Temi bina mero kunai sansar xaina Fuchhee! 🌸" }
  ];
  const cap = captions[idx % captions.length];
  return {
    id: idx + 1,
    url: getAssetUrl(path),
    rawPath: path,
    category: 'couple',
    type: 'image',
    title: `${cap.title} (${idx + 1})`,
    compliment: cap.eng,
    nepaliCompliment: cap.nep
  };
});
