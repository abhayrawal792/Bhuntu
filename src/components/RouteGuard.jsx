import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ROOM_SEQUENCE } from '../data/roomSequence';

export { ROOM_SEQUENCE };

/* These routes are always accessible (no lock) */
const FREE_ROUTES = ['/', '/home', '/curated-journey', '/curated-journey/'];

export default function RouteGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasEntered, currentRoomIndex, setCurrentRoomIndex } = useAppStore();

  useEffect(() => {
    const path = location.pathname;

    // Landing home page is accessible to view the password prompt
    if (path === '/' || path === '/home') return;

    // STRICT LOCK: If secret password has NOT been entered, block access & redirect to landing home
    if (!hasEntered) {
      navigate('/', { replace: true });
      return;
    }

    // Check if the requested path is in the sequence
    const requestedIndex = ROOM_SEQUENCE.indexOf(path);

    // Not in linear sequence (standalone page or route) — allow access
    if (requestedIndex === -1) return;

    // Synchronize room index with current route
    setCurrentRoomIndex(requestedIndex);
  }, [location.pathname, hasEntered, navigate, setCurrentRoomIndex]);

  return null;
}
