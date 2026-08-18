import { useState, useEffect } from 'react';

export function useDeviceGyro() {
  const [tilt, setTilt] = useState({ tiltX: 0, tiltY: 0 });

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.beta !== null && e.gamma !== null) {
        // Limit tilt ranges for smooth 3D parallax
        const tiltX = Math.max(-20, Math.min(20, e.beta - 45)); // Pitch tilt
        const tiltY = Math.max(-20, Math.min(20, e.gamma));     // Roll tilt
        setTilt({ tiltX, tiltY });
      }
    };

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const tiltX = ((e.clientY / innerHeight) - 0.5) * -15;
      const tiltY = ((e.clientX / innerWidth) - 0.5) * 15;
      setTilt({ tiltX, tiltY });
    };

    if (typeof window !== 'undefined') {
      if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', handleOrientation);
      }
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return tilt;
}
