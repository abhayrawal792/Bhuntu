import React, { useState } from 'react';

const BLOCKS = [
  { type: 'Tower 🏰', emoji: '🏰', color: '#8b5cf6' },
  { type: 'Royal Gate 🚪', emoji: '🚪', color: '#ec4899' },
  { type: 'Garden 🌸', emoji: '🌸', color: '#10b981' },
  { type: 'Flag 🚩', emoji: '🚩', color: '#ef4444' },
  { type: 'Fountain ⛲', emoji: '⛲', color: '#3b82f6' },
  { type: 'Dragon Guard 🐉', emoji: '🐉', color: '#f59e0b' },
];

export default function LovePotionBrewery() {
  const [castle, setCastle] = useState([]);

  const addBlock = (b) => {
    if (castle.length >= 12) return;
    setCastle(prev => [...prev, b]);
  };

  const clearCastle = () => setCastle([]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1e1b4b 0%, #311042 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 56 }}>🏰</div>
        <h1 style={{ color: '#a78bfa', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Castle Builder
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Build Abu & Bhuntu's dream kingdom brick by brick! 👑
        </p>
      </div>

      <div style={{
        width: '100%', maxWidth: 380, height: 260,
        background: 'rgba(255,255,255,0.03)', border: '2px dashed #a78bfa',
        borderRadius: 24, padding: 16, display: 'flex', flexWrap: 'wrap-reverse',
        alignContent: 'flex-start', gap: 10, justifyContent: 'center',
        marginBottom: 20, boxShadow: 'inset 0 0 30px rgba(167,139,250,0.1)',
      }}>
        {castle.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: 14, margin: 'auto' }}>
            Tap parts below to construct the castle... 🏰
          </div>
        ) : (
          castle.map((b, i) => (
            <div key={i} style={{
              fontSize: 36, background: `${b.color}20`, border: `2px solid ${b.color}`,
              borderRadius: 14, padding: '8px 12px', animation: 'bounce 0.3s ease',
            }}>
              {b.emoji}
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', maxWidth: 380, marginBottom: 20 }}>
        {BLOCKS.map(b => (
          <button key={b.type} onClick={() => addBlock(b)} style={{
            background: `${b.color}20`, border: `2px solid ${b.color}`,
            borderRadius: 16, padding: '12px 6px', cursor: 'pointer', textAlign: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{b.emoji}</div>
            {b.type.split(' ')[0]}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={clearCastle} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid #64748b',
          color: '#cbd5e1', padding: '10px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 600,
        }}>
          Clear
        </button>
      </div>

      <style>{`
        @keyframes bounce { 0%{transform:scale(0)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
      `}</style>
    </div>
  );
}
