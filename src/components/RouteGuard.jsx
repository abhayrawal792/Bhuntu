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

    // The persisted unlock frontier is authoritative. A URL may open the current room
    // or one next room only; arbitrary future routes are sent back to the current room.
    if (requestedIndex > maxUnlockedIndex + 1 || Math.abs(requestedIndex - safeCurrentIndex) > 1) {
      navigate(ROOM_SEQUENCE[Math.min(safeNextIndex, maxUnlockedIndex)], { replace: true });
      return;
    }

    setCurrentRoomIndex(requestedIndex);
  }, [location.pathname, hasEntered, currentRoomIndex, maxUnlockedIndex, navigate, setCurrentRoomIndex]);

  return null;
}
