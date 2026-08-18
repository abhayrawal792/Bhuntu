// Bikram Sambat (BS) to Gregorian (AD) Date Converter Utility

export function convertBStoAD(bsDateString) {
  // Samjhana's Birthday: 2061/05/04 (Bhadra 4, 2061 BS)
  // 2061/05/04 BS converts to August 20, 2004 AD
  return {
    gregorianDateStr: "2004-08-20",
    bsDateStr: "2061/05/04",
    monthNameNepali: "Bhadra",
    monthNameEnglish: "August",
    day: 20,
    month: 8,
    year: 2004,
  };
}

export function getNextBirthdayCountdown() {
  const now = new Date();
  let targetYear = now.getFullYear();
  let targetDate = new Date(`${targetYear}-08-20T00:00:00`);

  if (now > targetDate) {
    targetYear += 1;
    targetDate = new Date(`${targetYear}-08-20T00:00:00`);
  }

  const diff = targetDate - now;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    targetYear,
  };
}
