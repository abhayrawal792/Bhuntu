export const personalVoice = {
  giver: {
    name: 'Abhay',
    nickname: 'Abu',
    voice: 'your Abu',
  },
  recipient: {
    name: 'Samjhana',
    nicknames: ['Sanzu', 'Bhoot', 'Bhuntu', 'Sanu', 'Babe', 'Runchi', 'Runchee', 'Bebo', 'Fuchee'],
    preferred: ['Samjhana', 'Sanzu', 'Bhuntu', 'Sanu', 'Babe'],
  },
  origin: {
    line: 'You called Abhay “Abu,” and somehow that one name became a small home for both of us.',
    detail: 'From a room-search conversation in Nepalgunj to Bageshwori, Water Park, Chau-Chau, Panipuri, the Language Institute, and late-night calls between Nepalgunj and Sakai, Osaka.',
  },
  promises: [
    'I will keep choosing you when the distance feels heavy.',
    'I will remember the small things: your food cravings, your moods, your laugh, and the nicknames only we understand.',
    'I will keep saving the future we talk about: the light-blue scooter, Bardiya roads, Pokhara, Manang, Mustang, and a home that sounds like us.',
  ],
  statements: {
    welcome: 'Samjhana, my Sanzu, this is the birthday world your Abu made for you.',
    opening: 'You are not a generic “birthday girl” here. You are my Bhuntu when I miss you, my Bhoot when you tease me, my Sanu when I want to protect you, and my Babe whenever my heart gets soft.',
    distance: 'Nepalgunj to Sakai is a long line on a map, but it has never been long enough to reach outside my heart.',
    future: 'One day the calls will become a shared room, the plans will become roads, and Abu will be beside his Bhuntu for real.',
    closing: 'Happy birthday, Samjhana. I love you in every name you let me call you.',
  },
};

export const nicknameFor = (index) => {
  const names = personalVoice.recipient.preferred;
  return names[index % names.length];
};
