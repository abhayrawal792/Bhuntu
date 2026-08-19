import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { playSparkle } from './AudioController';
import { ROOM_SEQUENCE } from '../data/roomSequence';
import { pageNameByRoute } from '../data/pageNames';

/*
 * The footer's Previous/Next buttons MUST always be relative to the page the
 * visitor is actually looking at (the URL), never to a stale persisted index.
 * Otherwise a store/URL drift makes taps feel dead ("nothing happens").
 */
export default function PageFooter() {
  const { triggerHaptic, unlockNextRoom, setCurrentRoomIndex } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const totalRooms = ROOM_SEQUENCE.length;

  // Source of truth = the URL. Room routes are unique, so indexOf never returns -1.
  const activeIndex = Math.max(0, ROOM_SEQUENCE.indexOf(location.pathname));
  const activePage = pageNameByRoute[location.pathname];

  // Advance both the current index and the unlock frontier whenever the
  // visitor legitimately moves, so progress persists for later visits.
  const unlockFromIndex = useCallback(
    (index) => {
      setCurrentRoomIndex(index);
      unlockNextRoom();
    },
    [setCurrentRoomIndex, unlockNextRoom]
  );

  const safeAudio = (fn) => {
    try {
      fn();
    } catch (_) {
      // Never let a sound/haptic hiccup cancel a tap.
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      safeAudio(() => {
        playSparkle();
        triggerHaptic(15);
      });
      const prevIdx = activeIndex - 1;
      unlockFromIndex(prevIdx);
      navigate(ROOM_SEQUENCE[prevIdx]);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalRooms - 1) {
      safeAudio(() => {
        playSparkle();
        triggerHaptic(15);
      });
      const nextIdx = activeIndex + 1;
      unlockFromIndex(nextIdx);
      navigate(ROOM_SEQUENCE[nextIdx]);
    }
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/home';
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
          <span>{activeIndex === 0 ? 'Doorway' : 'Previous'}</span>
        </button>

        {/* Center: Sequential Page Counter Badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 font-ui bg-pink-50/90 px-3.5 py-1.5 rounded-full border border-pink-200/80 shadow-2xs">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse flex-shrink-0" />
          <span className="text-[11px] sm:text-xs font-extrabold text-rose-700">
            Page {activeIndex + 1} of {totalRooms} · {activePage?.title || 'The next part of our story'}
          </span>
        </div>

        {/* Next Button — always advances exactly one page in the canonical sequence */}
        <button
          onClick={handleNext}
          disabled={activeIndex === totalRooms - 1}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
            activeIndex === totalRooms - 1
              ? 'opacity-40 cursor-not-allowed text-gray-400 bg-gray-100'
              : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md hover:scale-105 active:scale-95'
          }`}
        >
          <span>{activeIndex === totalRooms - 1 ? 'Finished' : 'Next page'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
