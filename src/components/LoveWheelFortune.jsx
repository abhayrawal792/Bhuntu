import React, { useState } from 'react';

const BALLOONS = [
  { text: '100% Soulmates! 🎯', color: '#ef4444' },
  { text: 'Forever & Always! 🎈', color: '#ec4899' },
  { text: 'Endless Hugs! 🤗', color: '#f59e0b' },
  { name: 'Pure Happiness! ✨', color: '#10b981' },
];

export default function LoveWheelFortune() {
  const [popped, setPopped] = useState([]);

  const popBalloon = (idx) => {
    if (!popped.includes(idx)) setPopped(p => [...p, idx]);
  };

  const reset = () => setPopped([]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🎯</div>
        <h1 style={{ color: '#ef4444', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Darts Champion
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Throw darts to pop romantic balloons at the carnival! 🎯🎈
        </p>
        <div style={{ marginTop: 8, color: '#ef4444', fontSize: 15, fontWeight: 800 }}>
          Balloons Popped: {popped.length}/{BALLOONS.length}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, width: '100%', maxWidth: 320, marginBottom: 24 }}>
        {BALLOONS.map((b, idx) => (
          <button key={idx} onClick={() => popBalloon(idx)} style={{
            height: 110, background: popped.includes(idx) ? 'transparent' : b.color,
            border: popped.includes(idx) ? '2px dashed #64748b' : 'none',
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            fontSize: 14, fontWeight: 800, textAlign: 'center', padding: 8,
            boxShadow: popped.includes(idx) ? 'none' : `0 0 20px ${b.color}60`,
          }}>
            {popped.includes(idx) ? '💥 POP!' : '🎈 Pop Me!'}
          </button>
        ))}
      </div>

      <button onClick={reset} style={{
        background: 'rgba(255,255,255,0.1)', border: '1px solid #ef4444',
        color: '#ef4444', padding: '10px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 700,
      }}>
        Reset Balloons
      </button>
    </div>
  );
}
