import React, { useState } from 'react';

const DATES = [
  { title: 'Midnight Stargazing & Hot Cocoa 🌌', desc: 'Drive to a quiet hill, wrap under one big blanket, drink hot cocoa & count shooting stars.' },
  { title: 'Homemade Osaka Takoyaki Night 🐙', desc: 'Cook Japanese takoyaki together in the kitchen, laughing when the first batch gets messy!' },
  { title: 'Virtual Museum Tour Hand-in-Hand 🏛️', desc: 'Explore the Louvre museum online together late at night, making up silly backstories for paintings.' },
  { title: 'Sunset Beach Walk & Shell Hunting 🐚', desc: 'Walk barefoot where ocean waves touch the sand, picking up shells to save in a glass jar.' },
  { title: 'Cozy Bookstore & Coffee Date 📚', desc: 'Browse cozy bookstore aisles, picking out books for each other with handwritten bookmarks.' },
];

export default function CoupleBucketList2() {
  const [dateIdx, setDateIdx] = useState(null);

  const generateDate = () => {
    setDateIdx(Math.floor(Math.random() * DATES.length));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🗓️</div>
        <h1 style={{ color: '#a78bfa', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          365 Date Night Generator
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Generate unique, romantic date night ideas for Abu & Bhuntu! 💖
        </p>
      </div>

      <button onClick={generateDate} style={{
        background: 'linear-gradient(135deg, #7c3aed, #ec4899)', border: 'none', color: '#fff',
        padding: '16px 44px', borderRadius: 28, fontSize: 17, fontWeight: 900, cursor: 'pointer',
        boxShadow: '0 0 30px rgba(236,72,153,0.4)', marginBottom: 28,
      }}>
        ✨ Generate Random Date Idea!
      </button>

      {dateIdx !== null && (
        <div style={{
          width: '100%', maxWidth: 380, background: 'rgba(167,139,250,0.15)',
          border: '2px solid #a78bfa', borderRadius: 24, padding: '24px', textAlign: 'center',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>{DATES[dateIdx].title.split(' ').pop()}</div>
          <h3 style={{ color: '#a78bfa', fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
            {DATES[dateIdx].title}
          </h3>
          <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            "{DATES[dateIdx].desc}"
          </p>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
