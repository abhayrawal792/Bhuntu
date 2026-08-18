import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, MapPin, ChevronDown, Compass, Award, Music, Gift, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import { useAppStore } from '../store/useAppStore';
import PasswordEntryPage from './PasswordEntryPage';
import InteractiveBackground from './InteractiveBackground';

const FloatingHeart = ({ style }) => (
  <motion.div
    className="absolute text-rose-400 pointer-events-none select-none"
    style={style}
    initial={{ y: 0, opacity: 0.9, scale: 1 }}
    animate={{ y: -140, opacity: 0, scale: 0.5, rotate: [0, 45, -45, 0] }}
    transition={{ duration: 3.5 + Math.random() * 2, ease: 'easeOut' }}
  >
    ❤️
  </motion.div>
);

const FloatingPetal = ({ delay, left, size }) => (
  <motion.div
    className="absolute pointer-events-none select-none text-pink-300"
    style={{ left, top: -20, fontSize: size }}
    initial={{ y: -20, x: 0, rotate: 0, opacity: 0.8 }}
    animate={{ y: '110vh', x: 80, rotate: 720, opacity: 0 }}
    transition={{ duration: 7 + Math.random() * 5, delay, ease: 'linear', repeat: Infinity, repeatDelay: Math.random() * 6 }}
  >
    🌸
  </motion.div>
);

export default function HeroSection() {
  const navigate = useNavigate();
  const { tapEasterEgg, triggerHaptic, setCurrentRoomIndex } = useAppStore();
  const [hearts, setHearts] = useState([]);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heartIdRef = useRef(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // 3D Card Tilt Mouse Tracker
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // -10 to +10 deg
    const y = (clientY / innerHeight - 0.5) * -20; // -10 to +10 deg
    setTilt({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interval heart emitter
  useEffect(() => {
    const interval = setInterval(() => {
      const id = heartIdRef.current++;
      setHearts(prev => [...prev, {
        id,
        style: {
          left: `${8 + Math.random() * 84}%`,
          bottom: '8%',
          fontSize: `${16 + Math.random() * 20}px`,
          zIndex: 5,
        }
      }]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 5500);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setShowScrollHint(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const handleStart = () => {
    triggerHaptic(40);
    setShowPasswordModal(true);
  };

  const handleAccessGranted = () => {
    setShowPasswordModal(false);
    useAppStore.getState().setHasEntered(true);
    setCurrentRoomIndex(0);
    navigate('/curated-journey');
  };

  const petals = Array.from({ length: 10 }, (_, i) => ({
    delay: i * 1.0,
    left: `${5 + i * 10}%`,
    size: `${14 + Math.random() * 12}px`,
  }));

  // Asymmetrical Feature Highlight Badges
  const highlightBadges = [
    { title: 'Nepalgunj ✈️ Osaka', desc: '4,892 KM Bridge of Love', icon: Compass, color: 'from-rose-500 to-pink-500' },
    { title: 'Curated Birthday Journey', desc: 'A polished story with standout moments', icon: Award, color: 'from-purple-500 to-indigo-500' },
    { title: 'Secret Surprise Vault', desc: 'Handpicked keepsakes and golden reveals', icon: Gift, color: 'from-amber-500 to-pink-500' },
  ];

  return (
    <section className="relative min-h-dvh flex flex-col justify-center items-center px-4 md:px-8 py-12 overflow-hidden bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-slate-900/10 bg-noise-overlay">
      {/* Feature 1: Interactive Canvas Background */}
      <InteractiveBackground />

      {/* Falling Petals Layer */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {petals.map((p, i) => (
          <FloatingPetal key={i} {...p} />
        ))}
      </div>

      {/* Floating Hearts Layer */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <AnimatePresence>
          {hearts.map(h => <FloatingHeart key={h.id} style={h.style} />)}
        </AnimatePresence>
      </div>

      {/* ── Main Asymmetrical Editorial Container ── */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-16"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Editorial Hero Content Column (7 cols) */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Animated Graphic Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 shadow-xl text-xs sm:text-sm font-extrabold text-rose-600 offset-border-card"
          >
            <motion.div
              animate={{ rotate: [0, 18, -18, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
            </motion.div>
            <span className="tracking-wide uppercase font-ui">{birthdayData.hero.badge}</span>
            <motion.div
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </motion.div>
          </motion.div>

          {/* Kinetic & Nepali Graphic Title */}
          <motion.h1
            onClick={() => tapEasterEgg()}
            className="text-5xl sm:text-7xl lg:text-8xl font-black font-nepali tracking-tight text-slate-900 leading-none cursor-pointer select-none relative group drop-shadow-md"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            title="Tap 3 times for a secret surprise!"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-kinetic-gradient block">{birthdayData.hero.title}</span>
          </motion.h1>

          <motion.h2
            className="text-4xl sm:text-6xl font-script text-rose-600 drop-shadow-sm pl-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {birthdayData.hero.title}
          </motion.h2>

          {/* Subtitle Quote */}
          <motion.p
            className="text-slate-700 font-nepali text-lg sm:text-2xl max-w-xl leading-relaxed font-medium pl-1 border-l-4 border-rose-400/60"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            "{birthdayData.hero.nepaliSubtitle}"
          </motion.p>

          {/* Interactive Feature 2: Magnetic Action Callouts */}
          <motion.div
            className="pt-4 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <button
              onClick={handleStart}
              className="btn-graphic-primary px-9 py-4 text-white text-lg font-bold flex items-center gap-3 cursor-pointer group"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 fill-white text-white" />
              </motion.div>
              <span>Enter the Curated Birthday Journey ✨</span>
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-bold font-ui shadow-sm">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{birthdayData.anniversaryBadge}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Asymmetrical Interactive Feature Cards Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 pt-4 lg:pt-0">
          {/* Interactive Feature 3: Asymmetrical Hover Tilt Cards */}
          {highlightBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const isHovered = activeCardIndex === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => {
                  setActiveCardIndex(idx);
                  triggerHaptic(15);
                }}
                onMouseLeave={() => setActiveCardIndex(null)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.15, duration: 0.6 }}
                className={`glass-graphic-card p-5 rounded-3xl cursor-pointer flex items-center gap-4 relative overflow-hidden transition-all duration-300 ${
                  isHovered ? 'scale-[1.03] shadow-2xl border-rose-400' : ''
                }`}
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${badge.color} text-white shadow-lg shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-ui text-slate-900 text-base sm:text-lg flex items-center gap-2">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{badge.desc}</p>
                </div>
                <motion.div
                  className="absolute right-4 text-rose-400 opacity-30"
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Interactive Distance Tag Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="p-4 rounded-3xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-indigo-500/10 border border-rose-200/60 flex items-center justify-between font-ui text-xs sm:text-sm text-slate-700 font-bold"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{birthdayData.partner.locationName}</span>
            </div>
            <motion.span
              animate={{ x: [-4, 4, -4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-xl"
            >
              ✈️
            </motion.span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{birthdayData.herLocation.locationName}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-ui pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="font-semibold text-rose-500">Scroll down for full experience</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5 text-rose-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Entry Modal Overlay */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <PasswordEntryPage onAccessGranted={handleAccessGranted} />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
