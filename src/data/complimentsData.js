// Dynamic Romantic Compliments Generator for every photo and video (enriched with real WhatsApp chat dialogue)
export const complimentsList = [
  { nepali: "Sanu, jab temi le 'Sanzu..!!👀🤍✨' vanera meetho message garchau, mero heart full smile huncha! ❤️", english: "The prettiest smile in the universe, my Bebo!" },
  { nepali: "Temro aakha kati ramro xa kanxuu, 'Love you so much ❤️♥️💋' message le din bhori khusi banauxa! ✨", english: "Your eyes hold my entire world." },
  { nepali: "Without makeup huda pani temi mera lagi aukat bhanda bahar wala partner hou! 💕", english: "Pure natural beauty, effortlessly stunning." },
  { nepali: "Nepalgunj bata Osaka (Sakai) hazaarau miles bhaye pani temro 'Call garne 🥺' message le duri birsaidinx! ✈️", english: "Distance disappears the moment I hear your voice." },
  { nepali: "Panipuri, momo ra current noodles khana man lagda temi kasto pyari baby lagchau! 🥟🍜", english: "Your cute food cravings make me love you even more!" },
  { nepali: "Temi resauda pani kasto pyaro dekhinxau, mero Fuchhee Sanzu! 👑", english: "Even when you get angry, you are the cutest person ever." },
  { nepali: "Temro yo style ra look le mero mutu chyo, Sanzu Rawal! 🔥", english: "Effortlessly graceful, radiant, and gorgeous." },
  { nepali: "Temi sanga video call ma kura garda mero sabai bhanda thulo khusi milxa! 🎵", english: "Your laugh is my favorite sound in the world." },
  { nepali: "Ma temlai sadhai usto dherai maya gariraxu ra sadhai garirahansuk, mero Bebo! 💍", english: "Loved you yesterday, love you today, love you forever." },
  { nepali: "Temi nai mero vartaman ra bhavishya hou, mero Bebo! 🎂", english: "You are the person Abu keeps choosing in every future he imagines." },
  { nepali: "Every morning 'Good morning babe' vanera waking up is the greatest feeling ever! ☀️", english: "You bring endless warmth and joy into my life." },
  { nepali: "'Ramrari padhnu ani sangai basne' — yo hamro promise forever ho! 🥂", english: "Every promise we made in chat will come true." },
  { nepali: "Paxi hjur le tya sabai ko agadi maya ra kissi garnu hunxa... Haan ji! 💋", english: "Forever and always together in front of the whole world." },
  { nepali: "Temro 'Huss', 'Umms', ra malai 'Abu' vanne meetho bani le mero heart melt gardinxa! 🌸", english: "Your sweet texting style — especially when you call me Abu — melts my heart every single day." }
];

export function getComplimentForMedia(index, filename = "") {
  const comp = complimentsList[index % complimentsList.length];
  return comp;
}

