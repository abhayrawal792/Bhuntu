// Centralized Content & Configuration for Bhuntu & Bebo's Birthday Website
// All text in English & Romanized Nepali (Nepali Roman)
// Nicknames: Fuchee, Bhuntu, Sanuu, Runchee, Bebo, Beb, Babe
import { getAssetUrl } from '../utils/mediaUtils';

export const birthdayData = {
  person: {
    name: "Bhuntu (Bhuntu..!!👀🤍✨)",
    nepaliName: "Mero Bhuntu / Sanuu (Bebo)",
    nickname: "Bhuntu..!!👀🤍✨, Sanuu, Bebo, Fuchee, Runchee, Bacha, Babe, Mero Budi ❤️",
    birthdateBS: "2061/05/04", // Bikram Sambat
    birthdateGregorian: "2004-08-20", // Gregorian conversion
    favoriteFoods: ["Chau-Chau 🍜", "Panipuri 🥟", "Momo 🥟", "Current Spicy Noodles 🍜", "Chiya ☕", "Chocolates 🍫"],
  },

  partner: {
    name: "Abu (Mero Buda / Sana)",
    locationName: "Nepalgunj, Nepal 🇳🇵",
    coords: [28.0500, 81.6167],
    whatsappPhone: "9779708349123",
  },

  herLocation: {
    locationName: "Sakai, Osaka, Japan 🇯🇵",
    coords: [34.5733, 135.4830],
  },

  relationshipStartDate: "2025-10-28", // Proposal accepted on October 28, 2025! 💕
  anniversaryBadge: "Bhuntu & Abu • 1 Year Together 💕",
  nepaliAnniversaryBadge: "Hamro 1 Barsa Ko Meetho Maya Ra Saath 💕",

  audio: {
    songTitle: "Pinjada - Satish Ghalan",
    bgMusicUrl: "https://raw.githubusercontent.com/mdn/webaudio-examples/main/audio-basics/out.mp3",
    sparkleSoundUrl: "https://assets.mixkit.co/sfx/preview/mixkit-fairy-sparkle-magical-shine-2980.mp3",
    popSoundUrl: "https://assets.mixkit.co/sfx/preview/mixkit-glass-shine-1015.mp3",
  },

  hero: {
    badge: "Special Birthday & Love Realm • 2061/05/04 ✨",
    title: "Abu's Bhuntu",
    nepaliTitle: "Mero Priye Bhuntu, Sanuu (Bebo) ❤️",
    subtitle: "A personalized romantic realm built from our real meeting as homeowner & tenant, Bageshwori temple dates, Chau-chau & Panipuri treats, and eternal love from Nepalgunj to Osaka.",
    nepaliSubtitle: "Hamro Nepalgunj ko ghar ma basda bata Bageshwori Mandir, Water Park, ra Language Institute gardai Osaka samma ko meetho yatra.",
    enterButtonText: "Enter Our World ✨",
  },

  timeline: [
    {
      id: 1,
      date: "First Meeting (Rental Room)",
      title: "Jaba Timi Room Khojrai Hamro Ghar Aayou",
      nepaliTitle: "Hamro Ghar Ko Room Renter Ra Houseowner Ko Chora 💕",
      description: "She came to Abu's family home searching for a room to rent. She stayed as a tenant in our home, and that's how we started talking, laughing, and getting closer every day!",
      nepaliDescription: "Jaba timi room khojrai hamro ghar aayou ra hamro ghar ma basna thalyou! Tyo bela bata hamro kurakani suru bhayo, ra jhandai thaha nai nafai mero mutu temro vayo.",
      tag: "How We Met",
    },
    {
      id: 2,
      date: "Nepalgunj Dates & Language Institute",
      title: "Bageshwori Temple, Water Park & Institute Days",
      nepaliTitle: "Bageshwori Mandir, Water Park Ra Chau-Chau Feeds 🍜",
      description: "Going out together to Bageshwori Temple to pray for us, having fun at the Water Park in Nepalgunj, eating her favorite Chau-chau & Panipuri, and dropping her at her Language Institute before Japan!",
      nepaliDescription: "Bageshwori Mandir ma darshan garera Water Park jane, Chau-Chau ra Panipuri sangai khane, ra Japan jaana bhanda aagadhi Language Institute samma chodna jaane moments!",
      tag: "Nepalgunj Memories",
    },
    {
      id: 3,
      date: "Nepalgunj (Dhamboji) ✈️ Sakai (Osaka, Japan)",
      title: "Nepalgunj to Sakai, Osaka (Japan)",
      nepaliTitle: "Nepalgunj Bata Osaka Samma Ko Atook Duri",
      description: "Countless late-night video calls across hours of time zones. Seeing your face when you laugh, get angry, or stay up makes the distance disappear.",
      nepaliDescription: "Nepalgunj (Dhamboji) bata Osaka (Japan) samma hazaarau miles ko duri bhaye pani, raat bharika video call haru ra temro anuhar le sabai duri birsaidinx.",
      tag: "Nepalgunj to Japan",
    },
    {
      id: 4,
      date: "1 Year Journey",
      title: "Approaching 1 Year of Pure Love",
      nepaliTitle: "Hamro 1 Barsa Ko Atook Prem Ra Biswas",
      description: "Almost 1 year together of unbreakable love, laughter, video calls, and staying strong across every mile.",
      nepaliDescription: "Khai kashari 1 barsa beeti sakyo thaxaina! Dherai maya, kehi risaune moments, ra sadhaiko laagi mutuko dhadkan bhayera basne hamro 1 barsa.",
      tag: "1st Anniversary Soon",
    },
    {
      id: 5,
      date: "Honeymoon & Future Family",
      title: "Honeymoon in Pokhara, Manang & Mustang",
      nepaliTitle: "Hamro Honeymoon Pokhara, Manang Ra Mustang Ma 🏔️💕",
      description: "Going on our dream honeymoon trip to Pokhara, Manang & Mustang, buying our light blue scooter to ride to Bardiya, and building our happy family with cute babies that look just like the two of us!",
      nepaliDescription: "Bihe paxi Pokhara, Manang ra Mustang ma romantic honeymoon jaane, light blue scooter ma Bardiya jaane, ra hami dubaiko jastai cute cute bachha haru paaune hamro meetho sapana!",
      tag: "Future Dream",
    },
    {
      id: 6,
      date: "Our Forever Promise",
      title: "Together Forever & Our Future",
      nepaliTitle: "Hamro Bihe Ra Sangai Hune Sapana",
      description: "Holding onto our dream of getting married and building our happy family together. You are my everything, my Bebo, my Bhuntu.",
      nepaliDescription: "Aalikaati time deu, yo duri hami sangai jitnxam ra paxi sangai kusi bhayera bihe garera basnexam. Temi nai mero sabai thok hou!",
      tag: "Forever Wifey",
    },
  ],

  gallery: [
    {
      id: 1,
      caption: "Your Pure & Beautiful Smile",
      nepaliCaption: "Temro nirdosh ani sundar muskan",
      color: "from-pink-400 to-rose-500",
      quote: "The prettiest eyes in the world belong to my Bebo.",
      image: "photos/photo13.jpg",
    },
    {
      id: 2,
      caption: "Chasing Sunset Dreams",
      nepaliCaption: "Sanjh ko meetho samjhana",
      color: "from-rose-400 to-purple-500",
      quote: "Like a calm sunset, your love brings peace to my soul, Sanuu.",
      image: "photos/photo14.jpg",
    },
    {
      id: 3,
      caption: "Warm Moments & Sweet Laughs",
      nepaliCaption: "Hamra meetha ra ramaila pal haru",
      color: "from-pink-500 to-rose-600",
      quote: "Every video call brings my Fuchhee right next to my heart.",
      image: "photos/photo15.jpg",
    },
    {
      id: 4,
      caption: "Graceful & Radiant",
      nepaliCaption: "Temro sundar roop ra pahiran",
      color: "from-rose-300 to-pink-500",
      quote: "You wear grace and warmth effortlessly every single day, Sanzu.",
      image: "photos/photo16.jpg",
    },
    {
      id: 5,
      caption: "My Greatest Happiness",
      nepaliCaption: "Mero jeevan ko sabai bhanda thulo khusi",
      color: "from-rose-500 to-red-400",
      quote: "Holding my Bhuntu close in my thoughts until I can hold your hand.",
      image: "photos/photo17.jpg",
    },
    {
      id: 6,
      caption: "Endless Togetherness",
      nepaliCaption: "Sadhai bhariko hamro saath",
      color: "from-pink-400 to-rose-500",
      quote: "My heart beats only for you, my sweet Bebo.",
      image: "photos/photo18.jpg",
    },
    {
      id: 7,
      caption: "Abhay & Sanzu Forever",
      nepaliCaption: "Hamro aatook maya ra biswas",
      color: "from-purple-400 to-pink-500",
      quote: "Mani temlai dheraiiiiiiiiiiiiiiiiiii maya grxuuu, Bebo!",
      image: "photos/photo19.jpg",
    },
    {
      id: 8,
      caption: "Sweet Memory Frame",
      nepaliCaption: "Dil ko meetho samjhana",
      color: "from-rose-400 to-amber-500",
      quote: "Paxi sab sangai kusi bhayra bihe garera basnexam!",
      image: "photos/photo20.jpg",
    },
    {
      id: 9,
      caption: "Mero Fuchhee",
      nepaliCaption: "Mero sabai bhanda pyaro partner",
      color: "from-pink-500 to-indigo-500",
      quote: "Temro boli ra bani mero sabai bhanda favorite kura ho.",
      image: "photos/photo21.jpg",
    },
    {
      id: 10,
      caption: "Nepalgunj ↔ Osaka Love",
      nepaliCaption: "Dhamboji bata Sakai samma ko prem",
      color: "from-amber-400 to-rose-500",
      quote: "No distance can ever stop me from loving you, Bebo!",
      image: "photos/photo22.jpg",
    },
  ],

  videoCapsule: {
    title: "A Video Message For You",
    nepaliTitle: "Temro lagi sano video sandesh",
    subtitle: "Tap play to open your vintage video capsule",
    nepaliSubtitle: "Yo video capsule khole ra mero maya mahasoos gara, mero sanu",
    videoUrl: "video/VID-20260424-WA0453.mp4",
    thumbnailUrl: getAssetUrl('photos/photo1.jpg'),
    personalNote: "No matter how many miles separate us, seeing your face instantly makes the distance disappear, my Bebo.",
    nepaliPersonalNote: "Hami jati sukai tadha bhaye pani, temro anuhar dekxne beetikai sabai duri harauxa mero bhuntu.",
  },

  loveLetter: {
    title: "My Heartwritten Letter to You",
    nepaliTitle: "Mero mutu ko dhadkan bata lekhieko letter",
    salutation: "To My Bhuntu…!! Dear Bebo ❤️",
    paragraphs: [
      "Dear bebo I love you soo muchhhhhhhh..!! Malai exactly thaxoina ma temlai yo love letter ma maila temlai kati dherai maya garxu bhnera bhanna sakxu ki nai tara I realyyyy love you soo much…!! kena ki ma temlai jati dherai maya garxu tati ma nata 400,500 word ma bhanna sakxu nata temlai bujhauna nai sakxuu…!! Tara pani ma keahe kura haru bhanxuu cuz temlai tha ta hos ma temlai kati dheraii maya garxu..!!",

      "Ma temi lai taba bata maya garxu jaba bata temla malai ramro sanga chinda ni chindaina thiyou ma temlai temro anuhar herara ra temro sarir ko lagi man parako haina sanu..!! Sanu malai temi pailai bata man parthiyou tara mlai tati bela tha thiyena ki ma temlai yati dheraiii maya garxu bhnera ..!! Bebo malai temro boli temro bani temro character temro kindness man pareko ho I litereally cant just talk about your beauty bebo cuz for me you are litereally aukat ke bahar wala partner..!! I love those eyes beboo kati ramroo anuhar xa temro kanxuu kasto sab kura ramro ramro bhako manxe pauda ta mlai lagxa kasto lucky po raixu ta ma ..!!",

      "Bebo aani temi yo tenson ta ledai na leu ki ma temlai xadxu mlai aaru koi man parxa. Bebo maila temlai makeup garda na garda bharkher uthda resauda ruda hasda bhokako huda periods ko pain ma huda ma nobolda ko dar ra dukhi huda dekeko xu bebo and still I love you bebo and I loved you I still love you and I love keep loving you forever bebo..!! Bebo I litereally very very much obsessed with you and addicted to you malai temi bas mero bhako man pareko ho I love you sooooo much ram lai thxa kta ko intention k hunxa bhnrea sayd holan koi koi ramro tara sab kta haru bus aafno desire pura garna ko lagi matra helpful ra kind hunxan,,!!!",

      "Bebo I love you sooooo much beb..!! malai paila mummle kei bhnya si ya mummy lai kei bhaya si mtra mero aanka ma aasu aauthiy aaila tyo sab temlai hurt huda ya temlai nramro lagda ni mero annkha bata aasu aaihalxa beboo …! Ma yesto kta honi jaslai aafno manxe ko matra matlab xa kya mali aaru jolai j sukai hos kei matlab xoian tara temi sanga ma yati dherai close bhay ki I just feel like u are my part of my life bebo and I love you as much as I love my mummy …!! Temlai yo sano kura ho jasto lagla hana tara mero aanka ma merai aagadi mero koi reliteves marya ni aasu aanna kya aaru jo lai j sukai hos kei matlab xoina bas temlai kei na hunu paryo I litereally loved you sooo much bebo..!!!",

      "Beb sanu kanxu mayalu temi dherai aatyou la ki ma temlai xadxxu hola mya kam hunxa hola testo koi hunn sana I love you sooo much…! Sab hamle sochya jsatai hunxa bus mali aalikati time deu hami paxi sab sangai kusi bhayra basnexam..! please beb ail ko yo duri hamroo aali kati aapnau yeslai aaaila yo garo bhaynai paxi sab ramro hunxa sna ..!! ani jasto j byanya nii love you beb and we are going to marry and have 30 to 40 kiddes..!!!",

      "Mero sana anai temi socha ni ki ma temi sanga bolnai khojdoina testo hainsa snu bas setuation nai testo hunxa kya aani saniut temlai thaxa ta ani maero bani kasto xa kei kura nig are rakhna sakdoina kasto aalxi xu k k huna thalx 1 ta thauma akxin tikdoina so aaaru kei haina I love you sooo muh beboo..!! ani ma temlai yati dherai maya garxu ni ki ma aafu le aafu lai yati dhetai change garna khojerako xu temlia thax ki nai lai lastai dheraii ris uuththiyo ra kasto naramro ris aauxa tara ma aila control garna khojerako xu cuz I fear to loose you bebo..!! ma temlai gumauna channa ra dar lagxa mero ris le garda ya mero harkat le garda ma temlai kaila gumaune ta haina ne bhanera soo plese be ma aakaix ixn resaya nia aakxin paxi fare maya lagxa anii fare temi nai chiyenxa soo Kailai xadera najnu huss beboo I love you sanaaa..!!"
    ],
    closing: "I loveeeeeeeeeeeeeee you sooooooooooo much",
    signature: "Mero kanxu, bebo, budi, wifeyy, bhuntu, fuchhu, beb, mayaluu darling mero sab thok temi ho bebo I love you…!!! ❤️",
  },

  bouquet: [
    {
      id: 1,
      name: "Blush of Elegance Pink Flower Bouquet",
      nepaliName: "गुलाबी सुन्दरताको फूलको गुच्छा",
      flowerImg: "https://zivmart.com/wp-content/uploads/2024/09/flower-bouquet-products-16.jpg",
      herImg: getAssetUrl('photos/photo1.jpg'),
      message: "Exquisite blush pink luxury roses crafted specially for my beautiful Bebo.",
      nepaliMessage: "Temi prati ko mero agaadh maya ra samman ko prateek, mero sanuu.",
    },
    {
      id: 2,
      name: "Royal Orchids & Red Roses Bouquet",
      nepaliName: "शाही अर्किड र रातो गुलाबको गुच्छा",
      flowerImg: "https://perfectgiftadda.com/wp-content/uploads/2023/08/IMG_9142-scaled.jpeg",
      herImg: "photos/photo2.jpg",
      message: "Exquisite orchids & velvet red roses crafted for my royal queen, Bebo.",
      nepaliMessage: "Temi mero jeevan ko ujyalo ra meetho sugandha hou, mero bhuntu.",
    },
    {
      id: 3,
      name: "Victoria Pink Roses & Eucalyptus Bouquet",
      nepaliName: "भिक्टोरिया गुलाबी गुलाब र युकेलिप्टस",
      flowerImg: "https://labellarosaflowers.com/cdn/shop/files/256F22C3-3054-4A05-9410-93319D67BA4F.jpg?v=1682429459&width=1445",
      herImg: "photos/photo3.jpg",
      message: "Elegantly wrapped pink luxury roses bringing warmth and sweet fragrance, Bhuntu.",
      nepaliMessage: "Temro pavitrata ra nishchal man ko lagi, mero sanuu.",
    },
    {
      id: 4,
      name: "Aesthetic Korean Pastel Rose Bouquet",
      nepaliName: "कोरियाली पास्टेल गुलाबको गुच्छा",
      flowerImg: "https://i.pinimg.com/736x/21/3f/43/213f4327ae02dce323e1905065f834f3.jpg",
      herImg: "photos/photo4.jpg",
      message: "Aesthetic soft pastel blooms for the sweetest, purest soul in the world.",
      nepaliMessage: "Mero fuchhee lai sadhai su-swasthya ra saphalta milos.",
    },
    {
      id: 5,
      name: "Starburst Mixed Flower Bouquet",
      nepaliName: "स्टारबर्स्ट मिश्रित फूलको गुच्छा",
      flowerImg: "https://www.flowersonnortonst.com.au/cdn/shop/files/IMG_5481_d9f93a48-1e2c-418c-9194-4c25cb2eac85.jpg?v=1704722635&width=1946",
      herImg: "photos/photo5.jpg",
      message: "Vibrant starburst mixed blooms representing our eternal colorful love and happiness.",
      nepaliMessage: "Hamro anautho ra atoot maya ko prateek, Sanzu Rawal.",
    },
  ],

  finale: {
    title: "Happy Birthday, My Bhuntu & Bebo! 🎂✨",
    nepaliTitle: "Shubha Janmotsav Ko Dherai Dherai Maya Mero Bhuntu, Sanuu! ❤️",
    subtitle: "Tap the 3D Gift Box below to unwrap your final surprise!",
    nepaliSubtitle: "Tala ko gift box thichera surprise hernu hoss!",
    giftBoxMessage: "You are my past, my present, and all of my futures. Happy Birthday, my Bebo, Sanuu, Fuchhee!",
    nepaliGiftBoxMessage: "Temi nai mero vartaman ra bhavishya hou. Janmadin ko dherai dherai shubhakamana mero bhuntu, sanuu!",
  },

  quiz: {
    title: "How Well Do You Know Our Love? 💖",
    nepaliTitle: "Hamro Prem Ra Samjhana Ko Quiz 💖",
    subtitle: "Answer these sweet questions to unlock your Love Compatibility Badge!",
    nepaliSubtitle: "Yo meetho quiz khelera exclusive badge unlock gara!",
    questions: [
      {
        id: 1,
        question: "Where is your love (partner) waiting for you in Nepal?",
        nepaliQuestion: "Mero partner le Nepalgunj ma kahan bata malai maya gardai xan?",
        options: ["Dhamboji, Nepalgunj 🇳🇵", "Kathmandu 🇳🇵", "Pokhara 🇳🇵", "Chitwan 🇳🇵"],
        correctIndex: 0,
        explanation: "Yes! Dhamboji, Nepalgunj bata aafno mutuko dhadkan banayera basya xan ❤️"
      },
      {
        id: 2,
        question: "Where is my Bhuntu currently residing in Japan?",
        nepaliQuestion: "Mero Bhuntu (Bebo) Japan ko kun thau ma basirakheki xin?",
        options: ["Tokyo 🇯🇵", "Sakai, Osaka 🇯🇵", "Kyoto 🇯🇵", "Hokkaido 🇯🇵"],
        correctIndex: 1,
        explanation: "Correct! Sakai, Osaka Japan ma mera cute Bebo xin 💕"
      },
      {
        id: 3,
        question: "How many future kids did we jokingly plan in the love letter?",
        nepaliQuestion: "Hamro love letter ma hami le bihe paxi kati ota bacha sochya thiyam?",
        options: ["1 or 2 kids", "5 kids", "30 to 40 kiddes! 👶", "100 kids"],
        correctIndex: 2,
        explanation: "Haha yes! '30 to 40 kiddes' in our letter! 👶🏻❤️"
      },
      {
        id: 4,
        question: "What is the most special nickname written in your heart?",
        nepaliQuestion: "Mero sabai bhanda meetho ra cute nickname k ho?",
        options: ["Bebo / Bhuntu / Fuchhee", "Professor", "Stranger", "Boss"],
        correctIndex: 0,
        explanation: "Mero Bhuntu, Bebo, Sanuu, Fuchhee, Runchee, Sanzu Rawal! 💕"
      },
      {
        id: 5,
        question: "What is our forever promise across distance?",
        nepaliQuestion: "Duri jati bhaye pani hamro forever promise k ho?",
        options: ["To give up early", "To get married & build a happy life together 💍", "To travel once a year", "To stay strangers"],
        correctIndex: 1,
        explanation: "Sadhai sangai hune, bihe garne, ra khusi sangai basne promise! 💍✨"
      }
    ]
  },

  stars: {
    title: "Written in the Stars ✨",
    nepaliTitle: "Taara Haru Ma Lekhieko Hamro Katha ✨",
    subtitle: "Click on glowing stars to reveal secret love notes connecting our hearts across the sky.",
    nepaliSubtitle: "Glow bhai raheka taara haru ma thichera mero secret notes padha.",
    constellations: [
      { id: 1, name: "Star of First Connection", x: 20, y: 30, note: "Even before you knew me well, my heart had already chosen you, my Bebo. 🌟", nepaliNote: "Jaba temla malai ramro sanga chinda ni chindaina thiyou, taba bata mero man ma temi thiyou." },
      { id: 2, name: "Star of Distance", x: 45, y: 25, note: "From Nepalgunj to Osaka, no distance can diminish my love for you. ✈️", nepaliNote: "Nepalgunj (Dhamboji) bata Osaka samma ko duri le pani hamro maya ghatauna sakdain." },
      { id: 3, name: "Star of Late Night Calls", x: 75, y: 35, note: "Falling asleep listening to your voice is my favorite comfort in the world. 🌙", nepaliNote: "Raat bhar video call ma temro anuhar herda sab thakai harauxa, sanuu." },
      { id: 4, name: "Star of Pure Smiles", x: 30, y: 70, note: "Your innocent smile cures my worst days instantly. 😊", nepaliNote: "Temro nirdosh muskan dekhda mero din nai ujyalo hunxa, Bebo." },
      { id: 5, name: "Star of Forever Marriage", x: 65, y: 75, note: "Holding your hand at the mandap and calling you my wifey is my lifetime goal. 💍", nepaliNote: "Temlai aafno budi/wifey banayera sangai basne dream mero sabai bhanda thulo sapana ho." }
    ]
  },

  timeCapsule: {
    title: "Open When... Love Letters ✉️",
    nepaliTitle: "Mero Meetho Open When Letters ✉️",
    subtitle: "Virtual envelopes created specifically for different moments of your life.",
    nepaliSubtitle: "Kaila man aakul huda ya mero samjhana auda yo envelope khole ra padha.",
    letters: [
      {
        id: "miss-me",
        title: "Open When You Miss Me Deeply 💖",
        nepaliTitle: "Jaba Temlai Mero Dherai Samjhana Aauchha 💖",
        bg: "from-rose-500 to-pink-600",
        icon: "Heart",
        content: "Mero Sanuu, jaba temlai mero dherai samjhana aauchha, aakha chimliya ra aafno mutuma haath rakha. Ma temro dherai najik chhu. Duri le kehi gardaina, hamro prem sadhai ek chha. I love you so much Bebo! ❤️"
      },
      {
        id: "stressed",
        title: "Open When You Feel Stressed or Tired 🌿",
        nepaliTitle: "Jaba Temi Thakeki Chhau Ya Stress Chha 🌿",
        bg: "from-purple-500 to-pink-500",
        icon: "Sparkles",
        content: "Fuchhee, kaam ya padhai ko tension dherai na leu huss! Deep breath leu, paani piye ra aafno khyaal gara. Ma sadhai temro pachhi support garera ubhieko chhu. Temi mero strong girl hou! 💕"
      },
      {
        id: "anniversary",
        title: "Open On Our 1 Year Anniversary 🥂",
        nepaliTitle: "Hamro 1 Barsa Ko Anniversary Ma Kholedai 🥂",
        bg: "from-amber-500 to-rose-500",
        icon: "PartyPopper",
        content: "Happy 1st Anniversary Mero Bebo! 1 barsa beete ko khabari thaxaina. Hazaaraun miles dur bhaye pani hamle yo 1 barsa jati maya garera bitayaum, paxi jhan dherai maya garera jeene chhaum! 🎉❤️"
      },
      {
        id: "need-hug",
        title: "Open When You Need A Warm Hug 🤗",
        nepaliTitle: "Jaba Temlai Euta Meetho Angalo Chahinchha 🤗",
        bg: "from-pink-400 to-rose-400",
        icon: "Sun",
        content: "Sending you the tightest, warmest virtual hug right now! Aakhabhar maya, gaala ma meetho kiss, ra mutuma temlai matra rakhera basya chhu mero Bhuntu! 🤗💋"
      }
    ]
  },

  scratchCards: {
    title: "Romantic Scratch & Win Surprises 🎟️",
    nepaliTitle: "Scratch Garera Aafno Surprise Reward Jitnus 🎟️",
    subtitle: "Use your cursor or finger to scratch off the foil layers and unlock cute love coupons!",
    nepaliSubtitle: "Tala ko silver/gold cards scratch garera prize unlock gara!",
    cards: [
      {
        id: 1,
        title: "Pass #1",
        reward: "Unlimited Late-Night Video Calls 📱",
        nepaliReward: "Jati bela pani late-night video call garne pass 📱",
        code: "CALL-BHUNTU-2026",
        color: "from-pink-500 to-rose-500"
      },
      {
        id: 2,
        title: "Pass #2",
        reward: "Unlimited Hugs & Kisses Upon Meeting 🫂",
        nepaliReward: "Bhete ko din endlessly angalo ra kiss paune pass 🫂💋",
        code: "HUG-BEBO-FOREVER",
        color: "from-purple-500 to-pink-500"
      },
      {
        id: 3,
        title: "Pass #3",
        reward: "One Lifetime Wish Granted by Me (Whatever You Desire!) 💖✨",
        nepaliReward: "Mero taraf bata temro 1 ota jun sukai wish puraa garne golden pass 💖✨",
        code: "GOLDEN-WISH-BHUNTU",
        color: "from-amber-500 to-rose-500"
      }
    ]
  },

  complimentJar: {
    title: "The Magic Compliment Jar 🏺",
    nepaliTitle: "Mero Maya Le Bhari-ieko Magic Jar 🏺",
    subtitle: "Tap the jar to pull out a randomized sweet note or romantic compliment!",
    nepaliSubtitle: "Jar ma thichera mero meetho compliment notes haru nikaala!",
    notes: [
      { id: 1, nepali: "Temro muskan le mero sab thakai birsaidinx, Bebo! 💕", english: "Your smile instantly cures my worst days, my love." },
      { id: 2, nepali: "Duri jati bhaye pani temra aakha ma sadhai mero maya xa! 👀💖", english: "Across every mile, my eyes and heart are always fixed on you." },
      { id: 3, nepali: "Temi nai mero sabai bhanda cute, pyaro, ra sweet partner hou! 🥰", english: "You are the cutest, sweetest, and most precious human to exist." },
      { id: 4, nepali: "Raat bhar video call ma temlai herna pauda dherai khusi lagxa! 🌙", english: "Falling asleep on video call while looking at your face is pure bliss." },
      { id: 5, nepali: "Bihe paxi temlai dherai maya garera budi banayera rakhnexam! 💍", english: "I cannot wait for the day I marry you and hold your hand forever." },
      { id: 6, nepali: "Mero Fuchhee, temro bolne dhang ra bani sabai bhanda pyaro xa! 🌸", english: "Everything about your voice, tone, and character makes me love you more." },
      { id: 7, nepali: "Temi thakeko bela deep breath leu, ma sadhai temro pachhi chhu! 🌿", english: "Whenever you feel tired, take a deep breath — I will always be right behind you." }
    ]
  },

  catcherGame: {
    title: "Falling Love Catcher Game 🎮",
    nepaliTitle: "Maya Ra Phool Haru Smhalne Game 🎮",
    subtitle: "Catch falling hearts, roses, and chocolates using your basket to win high scores!",
    nepaliSubtitle: "Tala ko basket chalaayera khasdaigareka phool ra mutu samjhau!"
  },

  memoryMatch: {
    title: "Our Love Memory Matching Game 🃏",
    nepaliTitle: "Hamro Samjhana Ko Memory Card Match 🃏",
    subtitle: "Flip cards and find matching pairs of romantic photos and icons!",
    nepaliSubtitle: "Cards haru paltaayera matching pair khoja ra sweet message unlock gara!",
    cards: [
      { id: 1, name: "Bebo's Smile", image: "photos/photo23.jpg", text: "Prettiest smile in the world!" },
      { id: 2, name: "Sunset Love", image: "photos/photo24.jpg", text: "Peaceful sunset memories with Abhay." },
      { id: 3, name: "Sweet Laughs", image: "photos/photo25.jpg", text: "Purest laughter on video calls." },
      { id: 4, name: "Graceful Queen", image: "photos/photo26.jpg", text: "My royal Bebo queen, Sanzu." },
      { id: 5, name: "Forever Hug", image: "photos/photo27.jpg", text: "Warmest tight hugs." },
      { id: 6, name: "Endless Bond", image: "photos/photo28.jpg", text: "Forever & always together." }
    ]
  },

  quotesGenerator: {
    title: "Typewriter Love Quote Generator 📜",
    nepaliTitle: "Mero Heartfelt Quote Generator 📜",
    subtitle: "Click the generator button to produce endless romantic quotes & daily reminders.",
    nepaliSubtitle: "Button thichera naya naya love quotes and reminders generate gara!",
    quotes: [
      { nepali: "Jeevan ma hazaarau manxe vetiyelan tara mero mutuma temi bahek koi auna sakdain, Bebo.", english: "Out of thousands in the world, only you reside inside my heart." },
      { nepali: "Nepalgunj bata Osaka samma hazaaraun miles xa tara mero prem ko duri ek mm pani xain.", english: "Thousands of miles separate us, but our hearts beat right next to each other." },
      { nepali: "Mero kanxuu, temi sanga risauda pani pachhi jhan dherai maya lagxa!", english: "Even when we get upset, a minute later I end up loving you 100x more." },
      { nepali: "Aafno khyaal gara, paani piye ra ramro sanga sutne gara, mero Sanuu.", english: "Take great care of your health, stay hydrated, and rest well, my angel." }
    ]
  },

  mysteryGifts: {
    title: "Unwrap Your Mystery Birthday Gifts 🎁",
    nepaliTitle: "Mero 4 Ota Birthday Mystery Gifts Kholedai 🎁",
    subtitle: "Click each wrapped box below to reveal a special virtual surprise created for you!",
    nepaliSubtitle: "Tala ka 4 ota mystery gift box haru ek-ek garera unwrap gara!",
    boxes: [
      { id: 1, title: "Gift #1", name: "Cuddly Virtual Teddy Bear 🧸", nepaliName: "Warm Cute Hug Teddy Bear 🧸", desc: "For you to cuddle with whenever you miss my hugs at night!", nepaliDesc: "Raat ma mero angalo ko samjhana auda cuddling garne cute teddy bear!", bg: "from-pink-500 to-rose-500" },
      { id: 2, title: "Gift #2", name: "Virtual Princess Crown 👑", nepaliName: "Mero Queen Bebo Ko Crown 👑", desc: "Awarded to the queen of my heart, Sanzu Rawal!", nepaliDesc: "Mero mutuko raajkumarilai aafno crown pahiraayera samman!", bg: "from-amber-500 to-rose-500" },
      { id: 3, title: "Gift #3", name: "Birthday Cake Slice 🎂", nepaliName: "Virtual Birthday Cake Slice 🎂", desc: "Sweet strawberry cake slice for the sweetest birthday girl!", nepaliDesc: "Sabai bhanda meetho birthday girl ko lagi strawberry cake slice!", bg: "from-purple-500 to-pink-500" },
      { id: 4, title: "Gift #4", name: "Infinity Love Necklace 💎", nepaliName: "Infinity Love Necklace 💎", desc: "Symbolizing our unbreakable connection across all miles.", nepaliDesc: "Hamro kahillyai natutne atoot maya ko prateek necklace!", bg: "from-rose-500 to-indigo-600" }
    ]
  },

  spinWheel: {
    title: "Love Lucky Spin Wheel 🎡",
    nepaliTitle: "Bhagya Ra Maya Ko Lucky Spin Wheel 🎡",
    subtitle: "Click SPIN to land on an instant romantic prize or sweet voucher!",
    nepaliSubtitle: "SPIN thichera aafno instant romantic prize jitnus!",
    prizes: [
      "1000 Kisses Pass 💋",
      "Virtual Spa & Massage 💆‍♀️",
      "Late Night Ice Cream Date 🍦",
      "Romantic Sunset Walk 🌅",
      "Master Hug Voucher 🫂",
      "Jackpot Love! 💖✨"
    ]
  },

  passport: {
    title: "Our Couple Passport & Flight Ticket ✈️",
    nepaliTitle: "Hamro Couple Passport Ra Airplane Ticket ✈️",
    subtitle: "Flight: Nepalgunj (NEP) ✈️ Osaka, Japan (KIX)",
    nepaliSubtitle: "Nepalgunj bata Osaka, Japan ko flight boarding pass ra passport!",
    passenger: "Sanzu Rawal (Bhuntu / Bebo)",
    passportNo: "NEP-JPN-LOVE-2026",
    seat: "01A (VIP First Class)",
    stamps: [
      { name: "Proposal Accepted 💍", date: "2025-10-28" },
      { name: "Long Distance Bond ✈️", date: "2026-01-01" },
      { name: "Forever Marriage 💍", date: "Future Lifetime" }
    ]
  },

  messageBottle: {
    title: "Message in a Bottle on Ocean Waves 🍾",
    nepaliTitle: "Samundra Ko Chhal Ma Aayeko Message Bottle 🍾",
    subtitle: "Tap the floating ocean bottle to uncork a parchment love letter sent across the seas.",
    nepaliSubtitle: "Ocean ma float bhairakheko bottle thichera mero secret letter padha.",
    letter: "Dear Bebo, no matter how vast the ocean is between Nepal and Japan, every wave carries my heartbeat straight to you. You are my home, my anchor, and my forever love. ❤️"
  },

  musicBox: {
    title: "Wind-up Romantic Music Box 🎶",
    nepaliTitle: "Mero Meetho Wind-up Music Box 🎶",
    subtitle: "Click to wind up the key and play relaxing lullaby melodies for Bebo.",
    nepaliSubtitle: "Chabi ghumaayera meetho dulhan ra love song ko Dhun sunau!"
  },

  lanterns: {
    title: "Sky Lantern Wish Night 🏮",
    nepaliTitle: "Aakash Ma Odai-ieko Wish Lanterns 🏮",
    subtitle: "Tap floating paper lanterns to release glowing wishes into the night sky.",
    nepaliSubtitle: "Paper lanterns ma thichera mero meetho wishes lighting gara!",
    wishes: [
      "May my Bhuntu always stay happy & healthy 🌸",
      "May we get married very soon 💍",
      "May our love stay strong forever across every mile 🇳🇵✈️🇯🇵",
      "May all your dreams come true, Sanzu Rawal! ✨"
    ]
  },

  photoBooth: {
    title: "Polaroid Photo Booth & Sticker Studio 📸",
    nepaliTitle: "Hamro Vintage Polaroid Photo Studio 📸",
    subtitle: "Decorate couple polaroid prints with romantic stickers & custom frames!",
    nepaliSubtitle: "Polaroid frames ma cute stickers ra frames laayera memory create gara!"
  },

  promiseTree: {
    title: "Sakura Tree of Sacred Promises 🌸",
    nepaliTitle: "Pavitra Vachana Ko Sakura Tree 🌸",
    subtitle: "Tap glowing sakura leaves to reveal eternal romantic promises.",
    nepaliSubtitle: "Sakura leaf ma thichera mero 5 ota real promises padha!",
    promises: [
      "I promise to buy our light blue scooter after marriage and let you drive me all the way to Bardiya sitting in the back seat! 🛵💙",
      "I promise to always hold your hand tight during movie dates in the theater! 🎬🍿",
      "I promise to feed you delicious food with my own hands every time we eat together! 🍜🤲",
      "I promise to let you hold my arm everywhere we walk together! 💑✨",
      "I promise to love my cute little Runchi (Bhuntu) forever and ever! 💕"
    ]
  },

  treasureChest: {
    title: "VIP Golden Birthday Treasure Chest 🗝️✨",
    nepaliTitle: "Mero VIP Sunaulo Treasure Chest 🗝️✨",
    subtitle: "Insert the VIP Heart Key to unlock royal golden treasures & birthday crown certification!",
    nepaliSubtitle: "Golden key le lock khole ra royal birthday crown unlock gara!"
  },

  loveSlots: {
    title: "Love Slot Machine 777 Jackpot 🎰",
    nepaliTitle: "Mero Love Slot Machine Jackpot 🎰",
    subtitle: "Pull the lever to hit the 777 Triple Heart Jackpot!",
    nepaliSubtitle: "Lever nikaalera Triple Heart Jackpot jitnus!"
  },

  horoscope: {
    title: "Astrological Zodiac & Love Reading 🔮",
    nepaliTitle: "Hamro Zodiac Ra Star Alignment 🔮",
    subtitle: "Sanu & Her Love: 100% Star Alignment & Planetary Blessings",
    nepaliSubtitle: "Taara haru ko alignment le bhanchha hamro prem sadhai amar rahanchha!"
  },

  loveCalculator: {
    title: "Infinite Love Match Scanner 💓",
    nepaliTitle: "Mutuko Dhadkan Ra Maya Scanner 💓",
    subtitle: "Place your finger on the glowing heart to measure your love compatibility score!",
    nepaliSubtitle: "Heart scanner ma thichera 100% infinite love match measure gara!"
  },

  cookingGame: {
    title: "Birthday Cake Baking & Decorating Studio 🎂",
    nepaliTitle: "Bhuntu Ko Sweet Birthday Cake Baking Studio 🎂",
    subtitle: "Pick frosting, sprinkles & candles to bake your dream cake!",
    nepaliSubtitle: "Cake ko lagi sweet frosting ra sprinkles chunus!"
  },

  lovePet: {
    title: "Virtual Love Pet Companion 🐱",
    nepaliTitle: "Bhuntu Ko Cute Fluffy Pet 🐱",
    subtitle: "Stroke, feed treats, and play with your fluffy birthday kitten!",
    nepaliSubtitle: "Cute kitten lai stroke garera heart purrs sunnus!"
  },

  ferrisWheel: {
    title: "3D Romantic Night Ferris Wheel 🎡",
    nepaliTitle: "Sanjh Ko Meetho Ferris Wheel 🎡",
    subtitle: "Click cabins high up in the sky to reveal romantic date memories!",
    nepaliSubtitle: "Ferris wheel ko cabin thichera date memories hernus!"
  },

  twoTruths: {
    title: "Two Truths & One Lie Quiz ❓",
    nepaliTitle: "Dui Sachha Ra Ek Jhooth Quiz ❓",
    subtitle: "Find the lie to prove how well you know our story!",
    nepaliSubtitle: "Jhooth statement khojera bonus love voucher jitnus!"
  },

  wordSearch: {
    title: "Love Word Search Grid 🔤",
    nepaliTitle: "Hamra Meetha Sabda Haru Ko Grid 🔤",
    subtitle: "Find hidden love words in the magical letter grid!",
    nepaliSubtitle: "Grid ma SANZU, BHUNTU, BEBO, LOVE, MARRIAGE words khoja!"
  },

  wishingWell: {
    title: "3D Stone Wishing Well & Coin Flip ⛲",
    nepaliTitle: "Sunaulo Sikka Odai-ieko Wishing Well ⛲",
    subtitle: "Drop virtual gold coins into the water to grant secret wishes!",
    nepaliSubtitle: "Water ma gold coin khasala ra aafno wish puraa gara!"
  },

  voiceSoundboard: {
    title: "Romantic Soundboard & Voice Clips 🎤",
    nepaliTitle: "Mero Meetho Voice Clips Soundboard 🎤",
    subtitle: "Tap audio pads to play sweet voice clips & cute sound effects!",
    nepaliSubtitle: "Pads thichera mero voice messages ra cute sounds sunnus!"
  },

  ticTacToe: {
    title: "Love Tic-Tac-Toe vs AI ❌⭕",
    nepaliTitle: "Hearts vs Roses Tic-Tac-Toe ❌⭕",
    subtitle: "Play Tic-Tac-Toe using Hearts and Roses against AI!",
    nepaliSubtitle: "Mutu ra phool le Tic-Tac-Toe khelera jitnus!"
  },

  fireworks: {
    title: "Virtual Heart Fireworks Sky 🎆",
    nepaliTitle: "Aakash Ma Heart Fireworks Show 🎆",
    subtitle: "Tap anywhere in the night sky to launch colorful heart fireworks!",
    nepaliSubtitle: "Aakash ma thichera colorful heart fireworks odau!"
  },

  timelineQuiz: {
    title: "Re-order Our Relationship Timeline ⏳",
    nepaliTitle: "Hamro Event Timeline Re-order Game ⏳",
    subtitle: "Arrange our love milestones in chronological order!",
    nepaliSubtitle: "Milestones harulai sahi order ma milayera secret video unlock gara!"
  },

  bubblePop: {
    title: "Romantic Bubble Pop & Heart Explosion 🫧",
    nepaliTitle: "Maya Ko Floating Bubbles Pop Game 🫧",
    subtitle: "Pop floating romantic bubbles with satisfying sounds!",
    nepaliSubtitle: "Float bhai raheka bubbles pop garera heart confetti odau!"
  },

  bucketList: {
    title: "Couples Travel Bucket List & Map 🗺️",
    nepaliTitle: "Hamro Future Travel Bucket List 🗺️",
    subtitle: "Explore dream destinations we will visit together (Paris, Tokyo, Bali)!",
    nepaliSubtitle: "Hami sangai ghumna jaane dream locations dekhi pins hernus!"
  },

  origami: {
    title: "3D Origami Heart Folding Studio 📄",
    nepaliTitle: "Paper Origami Heart Folding Studio 📄",
    subtitle: "Fold paper step-by-step into a 3D origami heart with a secret letter!",
    nepaliSubtitle: "Step-by-step paper fold garera secret origami heart banaau!"
  },

  affirmations: {
    title: "Daily Love Affirmation Cards 🃏",
    nepaliTitle: "Mero Daily Love & Confidence Cards 🃏",
    subtitle: "Draw a daily card for warmth, confidence, and love from Abhay (Abu)!",
    nepaliSubtitle: "Card draw garera aafno daily love affirmation read gara!"
  },

  lovePiano: {
    title: "Romantic Heart Piano Keyboard 🎹",
    nepaliTitle: "Mero Heart Keys Piano 🎹",
    subtitle: "Play musical notes on glowing heart keys to play Happy Birthday!",
    nepaliSubtitle: "Heart keys thichera Happy Birthday dhun bajau!"
  },

  waxSealer: {
    title: "Love Letter Wax Sealing Studio ✉️",
    nepaliTitle: "Pink Wax Seal Stamping Studio ✉️",
    subtitle: "Pour warm pink wax and press the initial stamp onto a golden envelope!",
    nepaliSubtitle: "Pink wax ma initial stamp (A ❤️ S) laayera letter seal gara!"
  },

  loveMaze: {
    title: "Love Maze Puzzle 🧩",
    nepaliTitle: "Maya Ko Maze Puzzle 🧩",
    subtitle: "Navigate through the twisting maze to reach the heart at the center!",
    nepaliSubtitle: "Maze ko bich ma raheko mutu samma bato khojera pugnus!"
  },

  fortuneCookie: {
    title: "Fortune Cookie Cracker 🥠",
    nepaliTitle: "Bhagyako Cookie Todnus 🥠",
    subtitle: "Crack open golden fortune cookies to reveal secret love prophecies!",
    nepaliSubtitle: "Golden cookie todnus ra bhitri bhagya ko love prophecy padhnus!"
  },

  lovePotion: {
    title: "Love Potion Mixing Lab 🧪",
    nepaliTitle: "Maya Ko Potion Lab 🧪",
    subtitle: "Mix magical ingredients to brew the perfect love potion!",
    nepaliSubtitle: "Jaadi ingredients mix garera perfect love potion banau!"
  },

  emojiStory: {
    title: "Emoji Story Decoder 😍",
    nepaliTitle: "Emoji Katha Decode Garnus 😍",
    subtitle: "Decode love stories written entirely in emojis!",
    nepaliSubtitle: "Emoji ma lekhieko hamro love story decode garnus!"
  },

  jigsaw: {
    title: "Heart Jigsaw Puzzle 🧩",
    nepaliTitle: "Mutu Ko Jigsaw Puzzle 🧩",
    subtitle: "Drag puzzle pieces into place to complete the heart!",
    nepaliSubtitle: "Puzzle pieces milayera heart complete garnus!"
  },

  loveDice: {
    title: "Romantic Dare Dice 🎲",
    nepaliTitle: "Romantic Dare Dice Roll 🎲",
    subtitle: "Roll the love dice to get romantic dares and sweet challenges!",
    nepaliSubtitle: "Dice roll garera romantic dare challenge paaunu!"
  },

  balloonPop: {
    title: "Balloon Pop Birthday Countdown 🎈",
    nepaliTitle: "Birthday Balloon Pop Countdown 🎈",
    subtitle: "Pop numbered balloons to reveal hidden birthday messages!",
    nepaliSubtitle: "Numbered balloons pop garera hidden birthday messages padha!"
  },

  coupleBingo: {
    title: "Couple Bingo Card 🎯",
    nepaliTitle: "Hamro Couple Bingo Card 🎯",
    subtitle: "Mark off relationship milestones on your couples bingo card!",
    nepaliSubtitle: "Hamro relationship milestones bingo card ma mark gara!"
  },

  loveReview: {
    title: "5-Star Partner Love Review ⭐",
    nepaliTitle: "Partner Ko 5-Star Love Review ⭐",
    subtitle: "Rate your partner across different love categories!",
    nepaliSubtitle: "Partner lai different categories ma 5-star review dinus!"
  },

  loveDiary: {
    title: "Couple Diary & Journal 📔",
    nepaliTitle: "Hamro Couple Diary Journal 📔",
    subtitle: "Read through special diary entries from our love journey!",
    nepaliSubtitle: "Hamro love journey ka diary entries padhnus!"
  },

  loveScrabble: {
    title: "Love Scrabble Word Builder 🔤",
    nepaliTitle: "Maya Ko Scrabble Word Builder 🔤",
    subtitle: "Arrange letter tiles to spell romantic words like SANZU & BHUNTU!",
    nepaliSubtitle: "Letter tiles milayera romantic sabda haru banau!"
  },

  loveLottery: {
    title: "Golden Love Scratch Lottery 🎰",
    nepaliTitle: "Golden Love Lottery Scratch Card 🎰",
    subtitle: "Scratch 3 matching hearts to win the jackpot of endless love!",
    nepaliSubtitle: "3 ota matching heart scratch garera jackpot jitnus!"
  },

  loveTamagotchi: {
    title: "Virtual Heart Pet Care 🐱",
    nepaliTitle: "Maya Ko Virtual Heart Pet 🐱",
    subtitle: "Feed, cuddle, and play with your virtual love heart pet!",
    nepaliSubtitle: "Virtual heart pet lai khana khuvaunus ra sasto maya dinus!"
  },

  secretVault: {
    title: "Secret Code Vault Unlocker 🔐",
    nepaliTitle: "Guhya Code Vault Unlocker 🔐",
    subtitle: "Enter the secret 4-digit code to open the vault of eternal promises!",
    nepaliSubtitle: "4-digit secret code hanera guhya vault kholnus!"
  },

  loveTarot: {
    title: "Romantic 3-Card Tarot Reading 🔮",
    nepaliTitle: "Romantic 3-Card Tarot Reading 🔮",
    subtitle: "Flip 3 mystical cards for Past, Present, and Future love fortunes!",
    nepaliSubtitle: "3 ota tarot cards paltaera hamro bhagya padhnus!"
  },

  memoryLane: {
    title: "Memory Lane 3D Flipcards 📸",
    nepaliTitle: "Memory Lane 3D Flipcard Haru 📸",
    subtitle: "Flip interactive cards to reveal unforgettable couple memories!",
    nepaliSubtitle: "Cards haru paltaera hamro mitha samjhana haru hera!"
  },

  hugCounter: {
    title: "Infinite Virtual Hug Generator 🫂",
    nepaliTitle: "Ananta Virtual Hug Generator 🫂",
    subtitle: "Press the button to send warm virtual hugs straight to Bebo!",
    nepaliSubtitle: "Button thichera Bebo lai warm virtual hugs pathau!"
  },

  loveCrossword: {
    title: "Mini Couple Love Crossword 🧩",
    nepaliTitle: "Hamro Couple Crossword Puzzle 🧩",
    subtitle: "Solve the mini crossword clues using your couple memory!",
    nepaliSubtitle: "Hamro samjhana bata crossword clues solve gara!"
  },

  loveRadio: {
    title: "Vintage FM Love Radio 📻",
    nepaliTitle: "Purano Vintage FM Love Radio 📻",
    subtitle: "Tune the FM radio dial to listen to romantic love songs & station broadcasts!",
    nepaliSubtitle: "Radio dial ghumaera romantic station ra geet sunus!"
  },

  blessingTree: {
    title: "Divine Prayer Candle & Blessing 🕯️",
    nepaliTitle: "Pabitra Diyo ra Aashirbad 🕯️",
    subtitle: "Light a virtual prayer candle and receive divine blessings for good health & love!",
    nepaliSubtitle: "Pabitra diyo baaler sukha ra swasthya ko aashirbad linu!"
  },

  loveVibe: {
    title: "Love Vibe Rhythm Tapper 🎵",
    nepaliTitle: "Maya Ko Rhythm Beat Tapper 🎵",
    subtitle: "Tap falling heart notes to the beat of love!",
    nepaliSubtitle: "Khasdai gareko heart notes haru beat ma tap gara!"
  },

  coupleQuiz2: {
    title: "Who Knows Who Better? Quiz ❓",
    nepaliTitle: "Kasle Kaslai Dherai Chinchha? Quiz ❓",
    subtitle: "Test who knows each other better in this fun interactive quiz!",
    nepaliSubtitle: "Hamro sambandha ko baarema deep quiz khelnus!"
  },

  loveSpinner3d: {
    title: "3D Spinning Love Prize Wheel 🎡",
    nepaliTitle: "3D Maya Ko Prize Wheel 🎡",
    subtitle: "Spin the 3D prize wheel to win sweet daily love coupons!",
    nepaliSubtitle: "3D prize wheel ghumaera mitha gifts ra coupons jita!"
  },

  bentoBox: {
    title: "Romantic Bento Box Decorator 🍱",
    nepaliTitle: "Romantic Bento Box Studio 🍱",
    subtitle: "Arrange cute heart sushi & strawberries into a love bento box!",
    nepaliSubtitle: "Heart sushi ra mitha phal haru milaera bento box sajaunus!"
  },

  loveWheelFortune: {
    title: "Wheel of Romantic Fortune 🎡",
    nepaliTitle: "Bhagya Ko Love Wheel 🎡",
    subtitle: "Spin the fortune wheel to get romantic dares and compliments!",
    nepaliSubtitle: "Love wheel ghumaera romantic dares ra compliments paau!"
  },

  loveCouponGenerator: {
    title: "Custom Love Coupon Creator 🎟️",
    nepaliTitle: "Aaphnai Custom Love Coupon Creator 🎟️",
    subtitle: "Create and customize your own redeemable love vouchers!",
    nepaliSubtitle: "Aaphnai customized love vouchers banau ra claim gara!"
  },

  starNamer: {
    title: "Name-A-Star Official Certificate ⭐",
    nepaliTitle: "Sanzu Ko Naam Ma Star Certificate ⭐",
    subtitle: "A real star in the night sky named after Sanzu Rawal forever!",
    nepaliSubtitle: "Aakash ko euta taara sadhai bhariko lagi Sanzu ko naam ma!"
  },

  loveJarNotes: {
    title: "365 Daily Love Notes Jar 🏺",
    nepaliTitle: "365 Din Ko Maya Ko Notepaper Jar 🏺",
    subtitle: "Reach into the jar to pull out a sweet love note for every day of the year!",
    nepaliSubtitle: "Jar bata harek din ko lagi mitha love note nikalus!"
  },

  sweetCompliments: {
    title: "Infinite Compliment Slot Machine 🎰",
    nepaliTitle: "Compliment Slot Machine 🎰",
    subtitle: "Spin the slots to combine beautiful compliments made just for Bebo!",
    nepaliSubtitle: "Slot machine ghumaera Bebo ko tarif haru combine gara!"
  },

  kissCollector: {
    title: "Lipstick Kiss Stamping Canvas 💋",
    nepaliTitle: "Maya Ko Lipstick Kiss Canvas 💋",
    subtitle: "Tap anywhere on screen to leave sweet lipstick kiss marks!",
    nepaliSubtitle: "Screen ma jetai thichera mitha kiss marks haru chhoda!"
  },

  loveMemoryFlip: {
    title: "3D Deluxe Memory Matching Cards 🃏",
    nepaliTitle: "3D Deluxe Memory Card Match 🃏",
    subtitle: "Match pairs of romantic photo cards to unlock hidden rewards!",
    nepaliSubtitle: "Photo cards matching milaera special reward unlock gara!"
  },

  soundWave: {
    title: "Love Audio Waveform Visualizer 🎧",
    nepaliTitle: "Maya Ko Audio Wave Visualizer 🎧",
    subtitle: "Tap interactive sound waves to play heartfelt voice notes & music!",
    nepaliSubtitle: "Sound wave bars thichera mitha awaj ra geet sunus!"
  },

  lovePassportStamps: {
    title: "World Tour Passport Stamp Collector ✈️",
    nepaliTitle: "Biswa Bhraman Passport Stamp Collector ✈️",
    subtitle: "Collect stamps for Tokyo, Paris, Venice, and Kathmandu!",
    nepaliSubtitle: "Bhabishya ma jaane thau haru ko passport stamp collect gara!"
  },

  moodRing: {
    title: "Digital Love Mood Ring Scanner 💍",
    nepaliTitle: "Digital Love Mood Ring Scanner 💍",
    subtitle: "Place your thumb on the scanner to reveal your romantic aura color!",
    nepaliSubtitle: "Scanner ma thichi aaphno romantic love aura aura hernus!"
  },

  loveTetris: {
    title: "Heart Block Drop Puzzle 🧩",
    nepaliTitle: "Mutu Ko Block Drop Puzzle 🧩",
    subtitle: "Clear lines by fitting colorful heart blocks into the grid!",
    nepaliSubtitle: "Heart blocks fit garera puzzle lines clear gara!"
  },

  cupidArchery: {
    title: "Cupid's Bow & Arrow Archery 🏹",
    nepaliTitle: "Cupid Ko Tir Dhanu Khel 🏹",
    subtitle: "Aim your bow and shoot arrows to hit floating heart targets!",
    nepaliSubtitle: "Tir dhanu bata udtai gareka heart targets lai hani point banau!"
  },

  loveAlarm: {
    title: "Morning Love Alarm Clock ⏰",
    nepaliTitle: "Bihaniko Maya Alarm ⏰",
    subtitle: "Set your daily morning wake-up alarm with a custom voice note!",
    nepaliSubtitle: "Bihaniko alarm ma mitha love note haru set gara!"
  },

  coupleBucketList2: {
    title: "3D Globe Dream Travel Pins 🗺️",
    nepaliTitle: "3D Globe Dream Travel Pins 🗺️",
    subtitle: "Pin romantic destinations around the globe that we will visit together!",
    nepaliSubtitle: "3D globe ma hamile ghumne thau haru pin gara!"
  },

  loveQuizAdvanced: {
    title: "Deep Soul Connection Card Deck 💬",
    nepaliTitle: "Aatmiya Maya Ko Question Deck 💬",
    subtitle: "Draw deep connection cards to explore feelings & dreams together!",
    nepaliSubtitle: "Deep connection cards paltaera hamra bhavana haru share gara!"
  },

  loveMeterDeluxe: {
    title: "Heartbeat Rhythm Synchronizer 💓",
    nepaliTitle: "Heartbeat Beat Sync Detector 💓",
    subtitle: "Tap along with the pulse to synchronize heartbeats in perfect harmony!",
    nepaliSubtitle: "Pulse sangai tap garera dharakan haru sync gara!"
  },

  loveEnvelope: {
    title: "Sealed Vintage Wax Letter Opener ✉️",
    nepaliTitle: "Khas Pink Wax Letter Opener ✉️",
    subtitle: "Break open wax seals to read private handwritten letters!",
    nepaliSubtitle: "Wax seal baanger guhya love letter padhnus!"
  },

  loveConstellationConnect: {
    title: "Connect-The-Dots Star Constellation ✨",
    nepaliTitle: "Taara Haru Jodne Constellation ✨",
    subtitle: "Connect the glowing stars in sequence to reveal a giant heart constellation!",
    nepaliSubtitle: "Taara haru jodaera vishal mutu constellation banau!"
  },

  loveJournalPrompt: {
    title: "Daily Love & Gratitude Jar 📜",
    nepaliTitle: "Dainik Dhanyabad ra Maya Jar 📜",
    subtitle: "Draw daily gratitude cards expressing why we are thankful for each other!",
    nepaliSubtitle: "Harek din ek arkalaai dhanyabad dine card haru nikalus!"
  },

  loveChimes: {
    title: "Crystal Wind Chime Melody Studio 🎐",
    nepaliTitle: "Crystal Wind Chime Studio 🎐",
    subtitle: "Tap glowing crystal chimes to play soothing romantic melodies!",
    nepaliSubtitle: "Wind chimes thichera man shanta paarne dhun banau!"
  },

  lovePuzzleSlider: {
    title: "15-Tile Sliding Heart Picture Puzzle 🧩",
    nepaliTitle: "15-Tile Sliding Heart Picture Puzzle 🧩",
    subtitle: "Slide numbered tiles to restore the romantic couple photograph!",
    nepaliSubtitle: "Tiles sarkaera couple photo complete gara!"
  },

  loveHoroscopeDaily: {
    title: "Daily Cosmic Zodiac Love Reading 🔮",
    nepaliTitle: "Dainik Rashiphal ra Maya Horoscope 🔮",
    subtitle: "Read daily astrological predictions and blessings for your sign!",
    nepaliSubtitle: "Aajako rashiphal ra love prediction padhnus!"
  },

  loveRecipe: {
    title: "Romantic Recipe Baking Studio 🍳",
    nepaliTitle: "Romantic Cake Recipe Studio 🍳",
    subtitle: "Select & mix secret ingredients to bake the ultimate birthday dessert!",
    nepaliSubtitle: "Recipe ingredients mix garera sweet birthday dessert banau!"
  },

  loveFireflies: {
    title: "Catch Glowing Fireflies in a Jar 🫙",
    nepaliTitle: "Jugunu Samatne Magic Jar 🫙",
    subtitle: "Tap glowing fireflies under the moonlit sky to catch them in a jar!",
    nepaliSubtitle: "Raatko aakash muni udtai gareka jugunu jar ma samata!"
  },

  loveTreeGrowth: {
    title: "Sakura Love Tree Watering Studio 🌸",
    nepaliTitle: "Sakura Love Tree Paani Halne Studio 🌸",
    subtitle: "Water the magic sakura tree to watch it sprout pink flowers & glowing hearts!",
    nepaliSubtitle: "Sakura rukh ma paani halera mutu ra phool phulaau!"
  },

  loveWishesSky: {
    title: "Sky Lantern Wish Release 🏮",
    nepaliTitle: "Sky Lantern Wish Release 🏮",
    subtitle: "Write your heartfelt birthday wishes and release them into the night sky!",
    nepaliSubtitle: "Aaphno birthday wish lekhi sky lantern aakash ma udau!"
  },

  hallOfFame: {
    title: "The 100th Jubilee Hall of Fame & Eternal Love 👑🏆",
    nepaliTitle: "100th Jubilee Hall of Fame & Ultimate Eternal Love Decree 👑🏆",
    subtitle: "The 100th milestone room displaying all unlocked awards, crowns & certificates!",
    nepaliSubtitle: "Sabai 100 ota rooms completed! Temi nai mero sadhai bhariko rani hou!"
  },

  loveTimeMachine: {
    title: "Love Time Machine & Future Promises ⏰",
    nepaliTitle: "समयको यात्रा — Hamro Bhavishya ⏰",
    subtitle: "Travel through time from Year 1 to Year 50 to unlock secret love promises!",
    nepaliSubtitle: "1 barsa dekhi 50 barsa samma ko prem ko yatra gara!"
  },

  loveMemoryMatch: {
    title: "Heart Memory Match Game 🃏",
    nepaliTitle: "मायाको खेल — Memory Match 🃏",
    subtitle: "Match all hidden heart pairs in fewer moves to earn 3 golden stars!",
    nepaliSubtitle: "Sabai mutuko jodi milayera 3 stars jitnus!"
  },

  loveOrigamiHeart: {
    title: "3D Origami Heart Folding Studio 📄",
    nepaliTitle: "ओरिगामी माया — Step-by-Step Folding 📄",
    subtitle: "Fold a paper heart step-by-step and tuck a secret note inside!",
    nepaliSubtitle: "Kagaj ko mutu banayera gupta sandesh rakha!"
  },

  loveFortuneCookie: {
    title: "Love Fortune Cookie Bakery 🥠",
    nepaliTitle: "भाग्यको कुकी — Fortune Cookie 🥠",
    subtitle: "Crack open golden fortune cookies to reveal celestial love predictions!",
    nepaliSubtitle: "Sunaulo cookie futaera prem ko bhabishyabani hera!"
  },

  loveScratchCard: {
    title: "Scratch-to-Reveal Surprise Ticket 🎫",
    nepaliTitle: "स्क्र्याच सरप्राइज — Gift Ticket 🎫",
    subtitle: "Scratch off the pink silver foil to unlock secret birthday vouchers!",
    nepaliSubtitle: "Foil scratch garera secret birthday gift unlock gara!"
  },

  loveAudioVisualizer: {
    title: "Love Frequency Audio Visualizer 📡",
    nepaliTitle: "मायाको फ्रिक्वेन्सी — Sound Wave 📡",
    subtitle: "Tune into 528Hz love frequencies and watch dynamic audio waveforms!",
    nepaliSubtitle: "528Hz love frequency ma heart sound wave hera!"
  },

  loveTriviaQuiz: {
    title: "How Well Do You Know Bebo? Trivia 🧠",
    nepaliTitle: "सञ्जु सम्बन्धी प्रश्नोत्तरी — Trivia Quiz 🧠",
    subtitle: "Answer 5 romantic trivia questions to prove your Sanzu expertise!",
    nepaliSubtitle: "5 ota prashna ko uttar deera 100% love score lau!"
  },

  lovePhotoBooth: {
    title: "Virtual Polaroid Photo Booth 📸",
    nepaliTitle: "फोटो बुथ — Birthday Polaroid 📸",
    subtitle: "Select custom frames, drag stickers, write captions & snap polaroids!",
    nepaliSubtitle: "Frame ra sticker chhanera polaroid photo khichnus!"
  },

  loveWishWell: {
    title: "Enchanted Birthday Wishing Well 🪙",
    nepaliTitle: "चमत्कारी इनार — Wishing Well 🪙",
    subtitle: "Toss golden coins into the glowing well to seal eternal birthday wishes!",
    nepaliSubtitle: "Inar ma sikka khasala ra wish puraa gara!"
  },

  loveGrandFinale: {
    title: "Grand Finale Birthday Coronation 👑",
    nepaliTitle: "भव्य समापन र ताजपोशी — 110th Coronation 👑",
    subtitle: "The ultimate 110th page — Crown Sanzu as the official Queen of your heart!",
    nepaliSubtitle: "Sanzu Rawal lai official Queen crown garne grand finale!"
  }
};



