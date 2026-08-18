import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Custom Reasons & Memories database from HappyBirthdayGF adapted for Queen Sanzu (Bhuntu / Bebo)
const REASONS = [
  { 
    text: "You’re such a kind, sweet, and wonderful person, Sanzu, and I feel so lucky to share such an eternal bond with you! 💖", 
    emoji: "🌟"
  },
  { 
    text: "May your day be filled with love, laughter, and endless joy across Nepalgunj 🇳🇵 & Sakai, Osaka 🇯🇵! 🌸", 
    emoji: "💗"
  },
  { 
    text: "Wishing you success, happiness, and everything your beautiful heart desires. October 28 proposal vow is sealed! ✨", 
    emoji: "💕"
  },
  { 
    text: "Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead, Bebo! 🥳", 
    emoji: "🌟"
  }
];

export default function LoveNeonSignDesigner() {
  const { triggerHaptic } = useAppStore();

  const [page, setPage] = useState('index'); // 'index' -> 'cause' -> 'last'
  const [typedGreeting, setTypedGreeting] = useState('');
  const [currentReasonIdx, setCurrentReasonIdx] = useState(0);
  const [stackedReasons, setStackedReasons] = useState([REASONS[0]]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const fullGreeting = "Hey You Know What! You're the most adorable human i ever met! 💖";

  const photo1 = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const photo2 = BHUNTU_PHOTOS[(photoIdx + 1) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const photo3 = BHUNTU_PHOTOS[(photoIdx + 2) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  // Typing effect for Greeting on index page
  useEffect(() => {
    if (page === 'index') {
      let index = 0;
      setTypedGreeting('');
      const timer = setInterval(() => {
        if (index < fullGreeting.length) {
          setTypedGreeting(prev => prev + fullGreeting.charAt(index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [page]);

  // Cursor following physics
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNextReason = () => {
    playPop();
    triggerHaptic(15);

    if (currentReasonIdx + 1 < REASONS.length) {
      const nextIdx = currentReasonIdx + 1;
      setCurrentReasonIdx(nextIdx);
      setStackedReasons(prev => [...prev, REASONS[nextIdx]]);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    } else {
      // Move to last page
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setPage('last');
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setPage('index');
    setCurrentReasonIdx(0);
    setStackedReasons([REASONS[0]]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💖 HAPPY BIRTHDAY SANZU 💖\n\nHappy Birthday GF Card:\n"You're the BESTEST Bebo Ever! 💖"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <div className="hbd-app-root">
      {/* EXACT CSS STYLES FROM HappyBirthdayGF REPO */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Comic+Neue:wght@700&family=Quicksand:wght@500;600&family=Dancing+Script:wght@700&display=swap');

        .hbd-app-root {
          min-height: 100vh;
          background: linear-gradient(-45deg, #ffe6e6, #e6e6ff, #ffebf5, #ffd1dc);
          background-size: 400% 400%;
          animation: hbdGradient 15s ease infinite;
          font-family: 'Quicksand', sans-serif;
          color: #4a4a4a;
          position: relative;
          overflow-x: hidden;
          padding: 2rem 1rem;
        }

        @keyframes hbdGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hbd-custom-cursor {
          width: 30px;
          height: 30px;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s;
        }

        .hbd-custom-cursor svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 5px rgba(255, 182, 193, 0.8));
        }

        .hbd-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hbd-h1 {
          font-family: 'Bubblegum Sans', cursive;
          font-size: 3.5rem;
          color: #ff69b4;
          text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
          margin-bottom: 1.5rem;
          animation: hbdBounce 1s ease infinite;
        }

        @keyframes hbdBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hbd-greeting {
          font-family: 'Comic Neue', cursive;
          font-size: 1.5rem;
          color: #8a2be2;
          margin-bottom: 2.5rem;
          min-height: 2.5em;
        }

        .hbd-cta-button {
          background: linear-gradient(45deg, #ff69b4, #ff99cc);
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          font-size: 1.25rem;
          color: white;
          cursor: pointer;
          font-family: 'Comic Neue', cursive;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.5);
          transition: all 0.3s ease;
        }

        .hbd-cta-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.7);
        }

        .hbd-reason-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 20px;
          padding: 1.8rem;
          margin: 1.2rem auto;
          max-width: 650px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: left;
        }

        .hbd-reason-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.2);
        }

        .hbd-reason-text {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 1rem;
        }

        .hbd-reason-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
        }

        .hbd-shuffle-button {
          background: linear-gradient(45deg, #ff69b4, #ff99cc);
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          font-size: 1.2rem;
          color: white;
          margin: 2rem 0 1rem;
          cursor: pointer;
          font-family: 'Comic Neue', cursive;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
          transition: all 0.3s;
        }

        .hbd-shuffle-button.story-mode {
          background: linear-gradient(45deg, #9b6dff, #ff6dc7);
          transform: scale(1.1);
        }

        .hbd-shuffle-button:hover {
          transform: scale(1.1);
        }

        .hbd-reason-counter {
          font-size: 0.95rem;
          color: #ff69b4;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .hbd-welcome-section {
          text-align: center;
          padding: 2rem 1rem;
        }

        .hbd-welcome-section h1 {
          font-family: 'Dancing Script', cursive;
          font-size: 3.8rem;
          color: #ff69b4;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hbd-welcome-section p {
          font-size: 1.2rem;
          max-width: 650px;
          margin: 1rem auto;
          line-height: 1.6;
        }

        .hbd-memory-container {
          max-width: 1050px;
          margin: 2rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.8rem;
        }

        .hbd-memory-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 20px;
          padding: 1.4rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          text-align: left;
        }

        .hbd-memory-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(255, 105, 180, 0.2);
        }

        .hbd-memory-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 14px;
          margin-bottom: 1rem;
        }

        .hbd-memory-date {
          font-family: 'Dancing Script', cursive;
          color: #ff69b4;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .hbd-memory-caption {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #555;
        }

        .hbd-final-message {
          text-align: center;
          padding: 3rem 1.5rem;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          margin-top: 3rem;
          border: 2px border rgba(255, 105, 180, 0.3);
        }

        .hbd-final-message h2 {
          font-family: 'Dancing Script', cursive;
          font-size: 3.2rem;
          color: #ff69b4;
          margin-bottom: 1.5rem;
        }

        .hbd-final-message p {
          font-size: 1.15rem;
          max-width: 750px;
          margin: 0 auto 1.5rem;
          line-height: 1.8;
        }

        .hbd-goodbye-btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          font-size: 1.2rem;
          background: linear-gradient(45deg, #ff69b4, #da70d6);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
          transition: all 0.3s ease;
        }

        .hbd-goodbye-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.6);
        }

        @media (max-width: 768px) {
          .hbd-h1 { font-size: 2.3rem; }
          .hbd-greeting { font-size: 1.15rem; }
          .hbd-welcome-section h1 { font-size: 2.6rem; }
          .hbd-final-message h2 { font-size: 2.3rem; }
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

      {/* CUSTOM HEART CURSOR (cause.html custom-cursor) */}
      <div
        className="hbd-custom-cursor hidden sm:block"
        style={{ left: `${cursorPos.x - 15}px`, top: `${cursorPos.y - 15}px` }}
      >
        <svg viewBox="0 0 24 24">
          <path fill="#ff69b4" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* PAGE 1: INDEX PAGE (index.html) */}
      {page === 'index' && (
        <div className="hbd-container py-12">
          <h1 className="hbd-h1">Happy Birthday Sanzu💗</h1>
          
          <div className="hbd-greeting">
            "{typedGreeting}"
          </div>

          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl mb-8 bg-black">
            <img
              src={photo1}
              alt="Sanzu Entrance Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <button
            type="button"
            onClick={() => { playBloom(); playSparkle(); setPage('cause'); }}
            className="hbd-cta-button"
          >
            Click to Enter Our World 💕
          </button>
        </div>
      )}

      {/* PAGE 2: CAUSE PAGE (cause.html & cause.js) */}
      {page === 'cause' && (
        <div className="hbd-container py-8">
          <h1 className="hbd-h1">Why You're My Best Friend! 💖</h1>

          <div id="reasons-container">
            <AnimatePresence>
              {stackedReasons.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="hbd-reason-card"
                >
                  <div className="hbd-reason-text">
                    {r.emoji} {r.text}
                  </div>
                  <img
                    src={BHUNTU_PHOTOS[(photoIdx + i) % BHUNTU_PHOTOS.length] || photo1}
                    alt="Sanzu Reason Memory"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="hbd-reason-img"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={handleNextReason}
            className={`hbd-shuffle-button ${currentReasonIdx + 1 === REASONS.length ? 'story-mode' : ''}`}
          >
            {currentReasonIdx + 1 === REASONS.length ? 'Enter Our Storylane 💫' : 'Click Here... 💕'}
          </button>

          <div className="hbd-reason-counter">
            Reason {currentReasonIdx + 1} of {REASONS.length}
          </div>
        </div>
      )}

      {/* PAGE 3: LAST STORYLANE PAGE (last.html) */}
      {page === 'last' && (
        <div className="hbd-container">
          <section className="hbd-welcome-section">
            <h1>Our Beautiful Moments Together</h1>
            <p>Every moment spent with you has been magical. Let's cherish these precious memories for Queen Sanzu...</p>
          </section>

          <div className="hbd-memory-container">
            <div className="hbd-memory-card">
              <img
                src={photo1}
                alt="Her Smile Says It All"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="hbd-memory-img"
              />
              <div className="hbd-memory-date">Her Smile Says It All</div>
              <div className="hbd-memory-caption">
                You’re truly one of the sweetest girls I know, Sanzu, and I feel so lucky to have you in my life. ❤️
              </div>
            </div>

            <div className="hbd-memory-card">
              <img
                src={photo2}
                alt="Together Vibes"
                onError={(e) => handlePhotoError(e, photoIdx + 1)}
                className="hbd-memory-img"
              />
              <div className="hbd-memory-date">Together Vibes</div>
              <div className="hbd-memory-caption">
                May your journey ahead across Nepalgunj 🇳🇵 & Sakai, Osaka 🇯🇵 be filled with happiness, success, and endless smiles. 😊💕
              </div>
            </div>

            <div className="hbd-memory-card">
              <img
                src={photo3}
                alt="Pretty Soul"
                onError={(e) => handlePhotoError(e, photoIdx + 2)}
                className="hbd-memory-img"
              />
              <div className="hbd-memory-date">Pretty Soul</div>
              <div className="hbd-memory-caption">
                Keep being the amazing person you are, Bebo—you make every moment brighter. 🌸💖
              </div>
            </div>
          </div>

          <section className="hbd-final-message">
            <h2>Thank You for the Memories</h2>
            <p>
              Every laugh, every chat, and every moment we’ve shared has been truly special. 💫<br/>
              I’m so grateful for the bond we have, and for the positivity you always bring into my life.<br/>
              On your birthday, I just wish for endless happiness, love, and success to come your way. 🌸
            </p>
            <p>
              You deserve all the joy in the world—keep shining and spreading your beautiful energy. ✨
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="hbd-goodbye-btn flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Replay Storylane</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="hbd-goodbye-btn flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Birthday Wishes 💝</span>
              </button>
            </div>
          </section>
        </div>
      )}

    </div>
  );
}
