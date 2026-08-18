import React, { useState } from 'react';

const PAINTINGS = [
  { title: 'The Mona Bhuntu 🖼️', artist: 'Leonardo da Abu (1503)', desc: 'The most iconic smile in human history, re-imagined.' },
  { title: 'Starry Osaka Night 🌃', artist: 'Vincent van Abu (1889)', desc: 'Swirling blue and gold skies over their future cityscape.' },
  { title: 'The Lovers Kiss 💋', artist: 'Gustav Abu (1907)', desc: 'Golden blankets wrapping two soulmates in eternity.' },
];

export default function MemoryLane() {
  const [pIdx, setPIdx] = useState(0);

  const nextPainting = () => {
    setPIdx(i => (i + 1) % PAINTINGS.length);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🖼️</div>
        <h1 style={{ color: '#fbbf24', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Abu & Bhuntu Masterpiece Gallery
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Famous classical paintings re-imagined with Abu & Bhuntu! 🎨✨
        </p>
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 360, height: 260,
        background: '#fef3c7', border: '8px solid #b45309', borderRadius: 16,
        padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', marginBottom: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🖼️</div>
        <h3 style={{ color: '#78350f', fontSize: 18, fontWeight: 900, marginBottom: 4 }}>
          {PAINTINGS[pIdx].title}
        </h3>
        <div style={{ color: '#92400e', fontSize: 12, fontWeight: 700, fontStyle: 'italic', marginBottom: 8 }}>
          By {PAINTINGS[pIdx].artist}
        </div>
        <p style={{ color: '#451a03', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
          "{PAINTINGS[pIdx].desc}"
        </p>
      </div>

      <button onClick={nextPainting} style={{
        background: 'linear-gradient(135deg, #d97706, #fbbf24)', border: 'none', color: '#fff',
        padding: '16px 40px', borderRadius: 28, fontSize: 16, fontWeight: 900, cursor: 'pointer',
        boxShadow: '0 0 25px rgba(251,191,36,0.4)',
      }}>
        🖼️ Next Louvre Masterpiece!
      </button>
    </div>
  );
}
