import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { playSparkle } from './AudioController';
import { ROOM_SEQUENCE } from '../data/roomSequence';

export default function PageFooter() {
  const { hasEntered, currentRoomIndex, setCurrentRoomIndex, triggerHaptic } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const totalRooms = ROOM_SEQUENCE.length;

  // Find exact index of current URL route in ROOM_SEQUENCE safely
  const rawIdx = ROOM_SEQUENCE.indexOf(location.pathname);
  const activeIndex = (ROOM_SEQUENCE[currentRoomIndex] === location.pathname)
    ? currentRoomIndex
    : (rawIdx >= 0 ? rawIdx : currentRoomIndex);

  // Keep store synchronized with active route
  useEffect(() => {
    if (rawIdx >= 0 && rawIdx !== currentRoomIndex && ROOM_SEQUENCE[currentRoomIndex] !== location.pathname) {
      setCurrentRoomIndex(rawIdx);
    }
  }, [location.pathname, rawIdx, currentRoomIndex, setCurrentRoomIndex]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      playSparkle();
      triggerHaptic(15);
      const prevIdx = activeIndex - 1;
      setCurrentRoomIndex(prevIdx);
      navigate(ROOM_SEQUENCE[prevIdx]);
    }
  };

  const handleNext = () => {
    if (!hasEntered) {
      navigate('/');
      return;
    }
    if (activeIndex < totalRooms - 1) {
      playSparkle();
      triggerHaptic(15);
      const nextIdx = activeIndex + 1;
      setCurrentRoomIndex(nextIdx);
      navigate(ROOM_SEQUENCE[nextIdx]);
    }
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const showContinueButton = !isHomePage;

  if (isHomePage) return null;

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-100 py-2.5 px-3 sm:px-4 shadow-lg"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1.5">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeIndex === 0
              ? 'opacity-30 cursor-not-allowed text-gray-400 bg-gray-100'
              : 'bg-pink-100 text-rose-700 hover:bg-rose-500 hover:text-white shadow-2xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Center: Sequential Page Counter Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 font-ui bg-pink-50/90 px-3.5 py-1.5 rounded-full border border-pink-200/80 shadow-2xs">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse flex-shrink-0" />
          <span className="text-[11px] sm:text-xs font-extrabold text-rose-700">
            Page {activeIndex + 1} of {totalRooms} 💕
          </span>
        </div>

        {/* Next Button — only rendered from Memory Vault (/secret-vault) onwards */}
        {showContinueButton ? (
          <button
            onClick={handleNext}
            disabled={activeIndex === totalRooms - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              activeIndex === totalRooms - 1
                ? 'opacity-40 cursor-not-allowed text-gray-400 bg-gray-100'
                : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>
    </footer>
  );
}
