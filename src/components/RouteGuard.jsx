import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ROOM_SEQUENCE } from '../data/roomSequence';

export { ROOM_SEQUENCE };

/* The doorway is always reachable; every other page must be entered in sequence. */
const DOORWAY_ROUTES = ['/', '/home'];

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
