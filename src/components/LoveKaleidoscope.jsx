import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Share2, RefreshCw, Lock, Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Birthday Surprise configuration for Queen Sanzu (Bhuntu / Bebo)
const CONFIG = {
  recipientName: "sanzu",
  nameHint: 'Nickname for Queen Sanzu (e.g. Sanzu, Bebo, Bhuntu)',

  soloGalleryTitle: "✨ My Birthday Girl: Queen Sanzu ✨",
  togetherGalleryTitle: "💕 Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵 Memories 💕",
  messageTitle: "To My Favorite Person: Queen Sanzu 💖",

  typingTextFirst: "Hey, wait a second!",
  typingTextSecond: "This website is only for someone special: Queen Sanzu.",

  messageParagraphs: [
    "Happy Birthday, my love!",
    "I hope today is filled with boundless joy, warm laughter, and all the little moments that make you smile. As you step into this new year of your life, may it bring exciting opportunities, meaningful memories, and the confidence to chase everything you dream of.",
    "From Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵, distance can never shrink the love in Abu's heart. Our October 28, 2025 proposal vow is written in the stars forever.",
    "You have so much bright happiness ahead of you, Bebo, and I hope you never stop believing in yourself. May this birthday year be kind to you, rewarding, and full of delicious momos, panipuris, and endless celebrations.",
    "Wishing you a beautiful birthday and an even more amazing year to come.",
    "- With eternal love, Abu ❤️"
  ]
};

export default function LoveKaleidoscope() {
  const { triggerHaptic } = useAppStore();

  // Navigation state (0: Name Gate / Start, 1: Hero Greeting, 2: Solo Gallery, 3: Together Gallery, 4: Love Letter)
  const [currentSection, setCurrentSection] = useState(0);
  const [inputName, setInputName] = useState('Sanzu');
  const [typedText, setTypedText] = useState('');
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const photo1 = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const photo2 = BHUNTU_PHOTOS[(photoIdx + 1) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const photo3 = BHUNTU_PHOTOS[(photoIdx + 2) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const photo4 = BHUNTU_PHOTOS[(photoIdx + 3) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  // Typing effect on start screen
  useEffect(() => {
    if (currentSection === 0) {
      const text = `${CONFIG.typingTextFirst} ${CONFIG.typingTextSecond}`;
      let idx = 0;
      setTypedText('');
      const timer = setInterval(() => {
        if (idx < text.length) {
          setTypedText(prev => prev + text.charAt(idx));
          idx++;
        } else {
          clearInterval(timer);
        }
      }, 40);
      return () => clearInterval(timer);
    }
  }, [currentSection]);

  const runConfetti = () => {
    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  // Immediate Unlock (Never stuck, Never blank)
  const handleVerifyName = (e) => {
    if (e) e.preventDefault();
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    runConfetti();
    setCurrentSection(1);
  };

  const handleNextSection = () => {
    playPop();
    triggerHaptic(15);
    if (currentSection < 4) {
      const nextSec = currentSection + 1;
      setCurrentSection(nextSec);
      setPhotoIdx(prev => (prev + 1) % BHUNTU_PHOTOS.length);
      if (nextSec === 4) {
        playBloom();
        playSparkle();
        runConfetti();
      }
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setCurrentSection(0);
    setInputName('Sanzu');
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💖 BIRTHDAY SURPRISE TEMPLATE 💖\n\nRecipient: Queen Sanzu\n"Wishing you a beautiful birthday and an even more amazing year to come!"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <div className="bday-surprise-root">
      
      {/* EXACT STYLES FROM aungbbo/birthday-surprise-template REPO */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Quicksand:wght@500;700&display=swap');

        .bday-surprise-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 50%, #fdf2f8 100%);
          font-family: 'Quicksand', sans-serif;
          color: #333333;
          position: relative;
          overflow-x: hidden;
          padding: 2rem 1rem 4rem;
          user-select: none;
        }

        .bday-start-screen {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #1a1a2e;
          border-radius: 30px;
          padding: 2.5rem 1.5rem;
          color: #ffffff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          text-align: center;
        }

        .bday-title-handwritten {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(2.5rem, 6vw, 3.8rem);
          color: #ec4899;
          margin-bottom: 0.5rem;
        }

        .bday-card-white {
          background: #ffffff;
          border-radius: 28px;
          padding: 2.5rem 1.5rem;
          box-shadow: 0 12px 30px rgba(236, 72, 153, 0.2);
          max-width: 650px;
          margin: 1.5rem auto;
          text-align: center;
          border: 3px solid #fbcfe8;
        }

        .bday-photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.2rem;
          margin: 1.8rem 0;
        }

        .bday-photo-card {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          border: 3px solid #fbcfe8;
          height: 220px;
          background: #fdf2f8;
        }

        .bday-btn-primary {
          background: linear-gradient(45deg, #ec4899, #db2777);
          color: white;
          font-weight: 700;
          padding: 1rem 2.2rem;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.35);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        .bday-btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(236, 72, 153, 0.5);
        }

        .bday-input {
          padding: 0.9rem 1.2rem;
          border-radius: 50px;
          border: 2px solid #ec4899;
          outline: none;
          font-size: 1rem;
          text-align: center;
          background: rgba(255,255,255,0.95);
          color: #1a1a2e;
          font-weight: 700;
          width: 100%;
          max-width: 280px;
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

      <div className="max-w-3xl mx-auto">
        
        {/* SECTION 0: NAME VERIFICATION GATE (NameGate.tsx) */}
        {currentSection === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bday-start-screen"
          >
            <Lock className="w-12 h-12 text-pink-400 mb-2 animate-bounce" />
            <h1 className="bday-title-handwritten">Security Gate</h1>
            
            <p className="text-sm font-mono text-pink-200 min-h-[3rem] max-w-sm mb-6">
              "{typedText}"
            </p>

            <form onSubmit={handleVerifyName} className="space-y-4 w-full max-w-xs flex flex-col items-center">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Enter Recipient Name..."
                className="bday-input"
              />

              <button type="submit" className="bday-btn-primary mt-2">
                <span>Unlock Birthday World 💖</span>
              </button>
            </form>
          </motion.div>
        )}

        {/* SECTION 1: HERO SECTION (HeroSection.tsx) */}
        {currentSection === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bday-card-white"
          >
            <h1 className="bday-title-handwritten">✨ Happy Birthday Queen Sanzu! ✨</h1>
            
            <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl my-6 bg-pink-100">
              <img
                src={photo1}
                alt="Queen Sanzu Hero Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <p className="text-sm font-semibold text-stone-700 max-w-md mx-auto mb-8 leading-relaxed">
              Welcome to the private birthday surprise world prepared with endless love from Abu!
            </p>

            <button type="button" onClick={handleNextSection} className="bday-btn-primary">
              <span>Ready for a little surprise?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* SECTION 2: SOLO PHOTO GALLERY (PhotoGallery.tsx) */}
        {currentSection === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bday-card-white"
          >
            <h1 className="bday-title-handwritten">{CONFIG.soloGalleryTitle}</h1>

            <div className="bday-photo-grid">
              <div className="bday-photo-card">
                <img src={photo1} alt="Sanzu 1" onError={(e) => handlePhotoError(e, photoIdx)} className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105" />
              </div>
              <div className="bday-photo-card">
                <img src={photo2} alt="Sanzu 2" onError={(e) => handlePhotoError(e, photoIdx + 1)} className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105" />
              </div>
            </div>

            <button type="button" onClick={handleNextSection} className="bday-btn-primary mt-4">
              <span>Want to see more?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* SECTION 3: TOGETHER MEMORIES GALLERY (PhotoGallery.tsx) */}
        {currentSection === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bday-card-white"
          >
            <h1 className="bday-title-handwritten">{CONFIG.togetherGalleryTitle}</h1>

            <div className="bday-photo-grid">
              <div className="bday-photo-card">
                <img src={photo3} alt="Together 1" onError={(e) => handlePhotoError(e, photoIdx + 2)} className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105" />
              </div>
              <div className="bday-photo-card">
                <img src={photo4} alt="Together 3" onError={(e) => handlePhotoError(e, photoIdx + 3)} className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105" />
              </div>
            </div>

            <button type="button" onClick={handleNextSection} className="bday-btn-primary mt-4">
              <span>One last thing...</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* SECTION 4: ROMANTIC LOVE LETTER (LetterSection.tsx) */}
        {currentSection === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bday-card-white space-y-6"
          >
            <h1 className="bday-title-handwritten">{CONFIG.messageTitle}</h1>

            <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl bg-pink-100">
              <img
                src={photo1}
                alt="Queen Sanzu Letter Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="space-y-4 text-left text-stone-700 text-sm leading-relaxed max-w-lg mx-auto bg-pink-50/90 p-6 rounded-2xl border border-pink-200">
              {CONFIG.messageParagraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 || idx === CONFIG.messageParagraphs.length - 1 ? 'font-bold text-pink-600 font-serif text-base' : ''}>
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button type="button" onClick={handleReset} className="bday-btn-primary bg-purple-600">
                <RefreshCw className="w-4 h-4" />
                <span>Replay Surprise</span>
              </button>

              <button type="button" onClick={handleShareWhatsApp} className="bday-btn-primary bg-emerald-600">
                <Share2 className="w-4 h-4" />
                <span>Share Surprise 💝</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
