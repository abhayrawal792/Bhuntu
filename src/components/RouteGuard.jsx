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
  const { hasEntered, currentRoomIndex, setCurrentRoomIndex } = useAppStore();

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
    const safeCurrentIndex = Math.max(0, Math.min(currentRoomIndex, ROOM_SEQUENCE.length - 1));

    // Every registered route belongs to the sequence. Unknown routes return to the current page.
    if (requestedIndex === -1) {
      navigate(ROOM_SEQUENCE[safeCurrentIndex], { replace: true });
      return;
    }

    // Allow the current page or exactly one adjacent page. If a page tries to jump,
    // move only one step in the requested direction.
    const distance = requestedIndex - safeCurrentIndex;
    if (Math.abs(distance) > 1) {
      const nextIndex = safeCurrentIndex + (distance > 0 ? 1 : -1);
      navigate(ROOM_SEQUENCE[Math.max(0, Math.min(nextIndex, ROOM_SEQUENCE.length - 1))], { replace: true });
      return;
    }

    setCurrentRoomIndex(requestedIndex);
  }, [location.pathname, hasEntered, currentRoomIndex, navigate, setCurrentRoomIndex]);

  return null;
}
