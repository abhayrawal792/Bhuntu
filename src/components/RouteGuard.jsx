import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ROOM_SEQUENCE } from '../data/roomSequence';

export { ROOM_SEQUENCE };

/* The doorway is always reachable; every other page must be entered in sequence.
   Bonus rooms (games, arcade hub, landing extras) are NOT part of the curated
   sequence, so once the visitor has unlocked the site they may visit these
   freely via their own navigation links. */
const DOORWAY_ROUTES = ['/', '/home'];

const ALLOWED_BONUS_ROUTES = new Set([
  '/curated-journey',
  '/story',
  '/ring',
  '/scratch-surprises',
  '/catcher-game',
  '/memory-match',
  '/bouquet-reasons',
  '/love-slots',
  '/future-night-ride',
  '/two-truths',
  '/word-search',
  '/tic-tac-toe',
  '/timeline-quiz',
  '/bubble-pop',
  '/jigsaw',
  '/couple-quiz-2',
  '/promise-trio',
  '/letter-tonight',
  '/love-quiz-advanced',
  '/love-puzzle-slider',
  '/love-memory-match',
  '/love-trivia-quiz',
  '/love-map-canvas',
  '/secret-language',
  '/pixel-heart-painter',
  '/scratch-memory',
  '/quiz-duel',
  '/word-jumble',
  '/memory-replay',
  '/love-quiz-personality',
  '/love-scratch-off-gallery',
  '/heart-shape-tangram',
  '/sweet-dream-catcher',
  '/arcade-dance-machine',
  '/bhuntu-trivia-showdown',
  '/love-scratch-voucher-book',
  '/birthday-sky-letter',
  '/couple-quiz-master',
  '/bhuntu-emoji-arcade',
  '/love-crossword-puzzle',
  '/bhuntu-personality-quiz',
  '/love-rhythm-drum-pad',
  '/little-things-abu-notices',
  '/love-memory-match-3d',
  '/love-scratch-off-gallery-2',
  '/bonus-arcade',
  '/games-arcade',
]);
const ALLOWED_BONUS_PREFIXES = ['/room/'];

export default function RouteGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasEntered, currentRoomIndex, maxUnlockedIndex, setCurrentRoomIndex } = useAppStore();

  useEffect(() => {
    const path = location.pathname;

    // The doorway is always reachable, but all other pages are sequentially locked.
    if (DOORWAY_ROUTES.includes(path)) {
      if (currentRoomIndex !== 0) setCurrentRoomIndex(0);
      return;
    }

    // STRICT LOCK: If secret password has NOT been entered, block access & redirect to landing home
    if (!hasEntered) {
      navigate('/', { replace: true });
      return;
    }

    const requestedIndex = ROOM_SEQUENCE.indexOf(path);
    const safeCurrentIndex = Math.max(0, Math.min(currentRoomIndex, maxUnlockedIndex, ROOM_SEQUENCE.length - 1));
    const safeNextIndex = Math.min(ROOM_SEQUENCE.length - 1, safeCurrentIndex + 1);

    // Every registered route belongs to the sequence. Unknown routes return to the current page.
    if (requestedIndex === -1) {
      const isBonus =
        ALLOWED_BONUS_ROUTES.has(path) ||
        ALLOWED_BONUS_PREFIXES.some((prefix) => path.startsWith(prefix));
      // Bonus rooms (games, arcade hub, landing extras) are freely reachable
      // once the site has been unlocked — their own navigation links live there.
      if (isBonus) return;
      navigate(ROOM_SEQUENCE[safeCurrentIndex], { replace: true });
      return;
    }

    // FORWARD DRIFT: if the visitor is already on this page or the URL moved one
    // legitimate step ahead (e.g. a footer tap that beat the store update), sync
    // the store and advance the unlock frontier instead of redirecting backwards
    // — backwards redirects make "Next page" taps feel dead.
    if (requestedIndex <= safeNextIndex) {
      setCurrentRoomIndex(requestedIndex);
      return;
    }

    // The persisted unlock frontier is authoritative. Arbitrary future routes
    // are sent back to the last page the visitor actually reached.
    if (requestedIndex > maxUnlockedIndex + 1) {
      navigate(ROOM_SEQUENCE[maxUnlockedIndex], { replace: true });
      return;
    }

    setCurrentRoomIndex(requestedIndex);
  }, [location.pathname, hasEntered, currentRoomIndex, maxUnlockedIndex, navigate, setCurrentRoomIndex]);

  return null;
}
