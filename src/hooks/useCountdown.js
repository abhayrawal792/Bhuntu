import { useState, useEffect } from 'react';
import { getNextBirthdayCountdown } from '../utils/bs-to-ad';

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getNextBirthdayCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getNextBirthdayCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}
