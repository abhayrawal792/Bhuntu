import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Share2, RefreshCw, Music, Lightbulb, Heart, Gift, Sparkles } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Message sequence lines from Shizu-ka/Birthday-Website adapted for Queen Sanzu (Bhuntu / Bebo)
const STORY_LINES = [
  "Today is...",
  "as beautiful as other days",
  "but you realize",
  "another year has gone",
  "in a blink of an eye",
  "however...",
  "Do you know..?",
  "today is just special",
  "so special to you & Abu",
  "that's why...",
  "Let's make it...",
  "the best celebration ever",
  "and let me share...",
  "a piece of happiness to you",
  "I made all this...",
  "as a birthday present for Queen Sanzu",
  "Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵",
  "thanks for the love we made",
  "thanks for everything, Bebo",
  "I wish you all the best",
  "May your life be at ease",
  "May all your wishes come true",
  "Remember...",
  "our October 28 proposal vow 💍",
  "you live as a free bird...",
  "flying in the blue sky",
  "Now things are different...",
  "real story of your life",
  "is just about to begin",
  "indeed..",
  "but...",
  "don't worry",
  "because...",
  "Abu & God has your back",
  "and this year will be better",
  "and I hope",
  "you'll find...",
  "happiness along the way",
  "keep your spirit up",
  "enjoy every single moment...",
  "that you experience today",
  "fill it with your most beautiful smile",
  "and make it the best memory..",
  "lastly...",
  "I'd like to wish you one more time",
  "a very happy birthday babyy ❤️"
];

export default function BhuntuEmojiComic() {
  const { triggerHaptic } = useAppStore();

  // Sequential Step States from Shizu-ka/Birthday-Website effect.js
  const [step, setStep] = useState(0); 
  // 0: Lights off, 1: Lights on, 2: Music playing, 3: Banner coming, 4: Balloons flying, 5: Cake fadein, 6: Light candle, 7: Happy Birthday wish, 8: Story reading

  const [storyIdx, setStoryIdx] = useState(0);
  const [storyFinished, setStoryFinished] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  // Story scrolling loop (Step 8)
  useEffect(() => {
    if (step === 8 && !storyFinished) {
      if (storyIdx < STORY_LINES.length - 1) {
        const timer = setTimeout(() => {
          setStoryIdx(prev => prev + 1);
        }, 1800);
        return () => clearTimeout(timer);
      } else {
        setStoryFinished(true);
        playBloom();
        playSparkle();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      }
    }
  }, [step, storyIdx, storyFinished]);

  const handleNextStep = () => {
    playPop();
    triggerHaptic(15);

    if (step === 0) {
      // Turn On Lights
      playBloom();
      setStep(1);
    } else if (step === 1) {
      // Play Music
      playSparkle();
      setStep(2);
    } else if (step === 2) {
      // Decorate Banner
      setStep(3);
    } else if (step === 3) {
      // Fly Balloons
      setStep(4);
    } else if (step === 4) {
      // Cake Fadein
      setStep(5);
    } else if (step === 5) {
      // Light Candle
      playSparkle();
      setStep(6);
    } else if (step === 6) {
      // Wish Message
      setStep(7);
      confetti({ particleCount: 85, spread: 70, origin: { y: 0.5 } });
    } else if (step === 7) {
      // Story Message
      setStep(8);
      setStoryIdx(0);
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setStep(0);
    setStoryIdx(0);
    setStoryFinished(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎂 HAPPY BIRTHDAY QUEEN SANZU 🎂\n\n"A very happy birthday babyy ❤️"\nFrom Abu with eternal love!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <div className={`shizuka-bday-root ${step >= 1 ? 'shizuka-peach' : 'shizuka-dark'}`}>
      
      {/* EXACT CSS STYLES FROM Shizu-ka/Birthday-Website REPO */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Signika:wght@600;700&family=Nunito:wght@700;800&display=swap');

        .shizuka-bday-root {
          min-height: 100vh;
          font-family: 'Signika', sans-serif;
          position: relative;
          overflow-x: hidden;
          padding: 2rem 1rem 6rem;
          transition: background-color 2s ease;
          user-select: none;
        }

        .shizuka-dark {
          background-color: #0d0d11;
          color: #ffffff;
        }

        .shizuka-peach {
          background-color: #FFDAB9;
          animation: shizukaPeachPulse 8s infinite ease-in-out;
          color: #333333;
        }

        @keyframes shizukaPeachPulse {
          0% { background-color: #FFDAB9; }
          25% { background-color: #FFE4B5; }
          50% { background-color: #FFDAB9; }
          75% { background-color: #FFEFD5; }
          100% { background-color: #FFDAB9; }
        }

        /* BULB HOLDERS & BULBS */
        .shizuka-bulbs-row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .shizuka-bulb {
          width: 24px;
          height: 36px;
          border-radius: 50%;
          background: #444;
          transition: all 0.5s ease;
          position: relative;
        }

        .shizuka-bulb::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 7px;
          width: 10px;
          height: 8px;
          background: #222;
        }

        .shizuka-bulb-glow-yellow { background: #ffd700; box-shadow: 0 0 30px 10px #ffd700; }
        .shizuka-bulb-glow-red { background: #ff4500; box-shadow: 0 0 30px 10px #ff4500; }
        .shizuka-bulb-glow-blue { background: #1e90ff; box-shadow: 0 0 30px 10px #1e90ff; }
        .shizuka-bulb-glow-green { background: #32cd32; box-shadow: 0 0 30px 10px #32cd32; }
        .shizuka-bulb-glow-pink { background: #ff69b4; box-shadow: 0 0 30px 10px #ff69b4; }
        .shizuka-bulb-glow-orange { background: #ffa500; box-shadow: 0 0 30px 10px #ffa500; }

        /* BANNER */
        .shizuka-banner {
          max-width: 550px;
          margin: 0 auto 2rem;
          transform: translateY(-100px);
          opacity: 0;
          transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .shizuka-banner-come {
          transform: translateY(0);
          opacity: 1;
        }

        /* FLOATING BALLOONS */
        .shizuka-balloons-container {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }

        .shizuka-balloon {
          width: 45px;
          height: 55px;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.4rem;
          color: white;
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.15);
          animation: shizukaFloat 3s ease-in-out infinite alternate;
        }

        @keyframes shizukaFloat {
          0% { transform: translateY(0) rotate(-4deg); }
          100% { transform: translateY(-15px) rotate(4deg); }
        }

        /* 3D BIRTHDAY CAKE & CANDLE FLAMES */
        .shizuka-cake-box {
          position: relative;
          width: 280px;
          height: 260px;
          margin: 0 auto 2rem;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          padding: 1.5rem;
          display: flex;
          flex-col;
          align-items: center;
          justify-content: center;
        }

        .shizuka-cake-photo {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 4px solid #ff69b4;
          object-fit: cover;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
        }

        .shizuka-velas {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .shizuka-candlestick {
          width: 10px;
          height: 35px;
          background: repeating-linear-gradient(45deg, #ff69b4, #ff69b4 5px, #ffffff 5px, #ffffff 10px);
          border-radius: 4px;
          position: relative;
        }

        .shizuka-fuego {
          width: 14px;
          height: 22px;
          background: #ffd700;
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          top: -20px;
          left: -2px;
          box-shadow: 0 0 15px #ff4500;
          animation: shizukaFuego 1.2s infinite ease-in-out alternate;
        }

        @keyframes shizukaFuego {
          0% { transform: scale(0.9) rotate(-3deg); }
          100% { transform: scale(1.15) rotate(3deg); }
        }

        /* BOTTOM NAVBAR BUTTONS */
        .shizuka-navbar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          width: 90%;
          max-width: 450px;
        }

        .shizuka-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.15rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .shizuka-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.6);
        }
      `}</style>

      {/* FLOATING BACK TO HOME */}
      <a
        href="#/"
        className="fixed top-4 left-4 z-50 bg-white/90 text-pink-600 px-4 py-2 rounded-full border border-pink-300 shadow-md font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </a>

      <div className="max-w-xl mx-auto text-center pt-8">

        {/* HANGING BULBS ROW */}
        <div className="shizuka-bulbs-row">
          <div className={`shizuka-bulb ${step >= 1 ? 'shizuka-bulb-glow-yellow' : ''}`} />
          <div className={`shizuka-bulb ${step >= 1 ? 'shizuka-bulb-glow-red' : ''}`} />
          <div className={`shizuka-bulb ${step >= 1 ? 'shizuka-bulb-glow-blue' : ''}`} />
          <div className={`shizuka-bulb ${step >= 1 ? 'shizuka-bulb-glow-green' : ''}`} />
          <div className={`shizuka-bulb ${step >= 1 ? 'shizuka-bulb-glow-pink' : ''}`} />
          <div className={`shizuka-bulb ${step >= 1 ? 'shizuka-bulb-glow-orange' : ''}`} />
        </div>

        {/* HAPPY BIRTHDAY BANNER (Step 3+) */}
        <div className={`shizuka-banner ${step >= 3 ? 'shizuka-banner-come' : ''}`}>
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white font-extrabold text-2xl sm:text-3xl py-3 px-6 rounded-2xl shadow-xl tracking-wider uppercase font-serif">
            🎉 Happy Birthday Sanzu 🎉
          </div>
        </div>

        {/* FLOATING BALLOONS (Step 4+) */}
        {step >= 4 && (
          <div className="shizuka-balloons-container">
            {['H','A','P','P','Y','','B','D','A','Y'].map((char, i) => (
              <div
                key={i}
                className="shizuka-balloon"
                style={{
                  backgroundColor: ['#ff4757','#ffa502','#2ed573','#1e90ff','#9b59b6'][i % 5],
                  animationDelay: `${i * 0.2}s`
                }}
              >
                {char}
              </div>
            ))}
          </div>
        )}

        {/* 3D BIRTHDAY CAKE & CANDLES (Step 5+) */}
        {step >= 5 && step < 8 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="shizuka-cake-box"
          >
            {/* CANDLES */}
            <div className="shizuka-velas">
              {[0,1,2,3,4].map(idx => (
                <div key={idx} className="shizuka-candlestick">
                  {step >= 6 && <div className="shizuka-fuego" />}
                </div>
              ))}
            </div>

            {/* SANZU'S FACE PHOTO */}
            <img
              src={currentPhoto}
              alt="Queen Sanzu Cake Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="shizuka-cake-photo object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </motion.div>
        )}

        {/* STEP 8: SCROLLING STORY MESSAGE (story) */}
        {step === 8 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/90 border-4 border-pink-400 shadow-2xl space-y-6 max-w-md mx-auto my-4 text-stone-900"
          >
            {!storyFinished ? (
              <div className="min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={storyIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-xl font-extrabold text-pink-600 leading-relaxed font-serif"
                  >
                    "{STORY_LINES[storyIdx]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-pink-600 font-serif">
                  A Very Happy Birthday Bebo! ❤️
                </h2>

                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl bg-black">
                  <img
                    src={currentPhoto}
                    alt="Storylane Sanzu Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                </div>

                <p className="text-sm font-semibold text-stone-700 leading-relaxed">
                  "May all your dreams come true, Queen Sanzu. Nepalgunj 🇳🇵 & Sakai, Osaka 🇯🇵 are forever connected!"
                </p>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3 px-5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Replay Celebration</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Wishes 💝</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </div>

      {/* SEQUENTIAL NAVIGATION BUTTON TOOLBAR (navbar fixed-bottom) */}
      <div className="shizuka-navbar">
        {step === 0 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-amber-500 to-yellow-500">
            💡 Turn On Lights
          </button>
        )}

        {step === 1 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-purple-500 to-indigo-500">
            🎵 Play the Music Buddy
          </button>
        )}

        {step === 2 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-pink-500 to-rose-500">
            🎀 Let's Decorate
          </button>
        )}

        {step === 3 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-cyan-500 to-blue-500">
            🎈 Calm, i got you some balloons
          </button>
        )}

        {step === 4 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-emerald-500 to-teal-500">
            🎂 Cake? of course!
          </button>
        )}

        {step === 5 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-amber-500 to-orange-500">
            🕯️ Don't forget to Light the Candle
          </button>
        )}

        {step === 6 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-pink-500 to-purple-500">
            🎉 Happy Birthday
          </button>
        )}

        {step === 7 && (
          <button type="button" onClick={handleNextStep} className="shizuka-btn bg-gradient-to-r from-rose-500 to-red-500">
            💌 A message for you
          </button>
        )}
      </div>

    </div>
  );
}
