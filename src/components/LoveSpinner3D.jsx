import React, { useState } from 'react';

const BEADS = [
  { color: '#ec4899', name: 'Love' },
  { color: '#38bdf8', name: 'Trust' },
  { color: '#f59e0b', name: 'Joy' },
  { color: '#10b981', name: 'Hope' },
  { color: '#a855f7', name: 'Magic' },
];

export default function LoveSpinner3D() {
  const [bracelet, setBracelet] = useState([]);

  const addBead = (b) => {
    if (bracelet.length < 8) setBracelet(prev => [...prev, b]);
  };

  const clear = () => setBracelet([]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>📿</div>
        <h1 style={{ color: '#f0abfc', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Bead Bracelet Studio
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          String colorful beads to craft matching couple bracelets! 📿✨
        </p>
      </div>

      <div style={{
        position: 'relative', width: 220, height: 220, borderRadius: '50%',
        border: '4px dashed #f0abfc', display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: 24, padding: 12,
      }}>
        {bracelet.length === 0 ? (
          <div style={{ color: '#f0abfc', fontSize: 14, textAlign: 'center' }}>
            Tap beads below to string them! 📿
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {bracelet.map((b, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: '50%', background: b.color,
                boxShadow: `0 0 10px ${b.color}`, border: '2px solid #fff',
              }} />
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 360, marginBottom: 20 }}>
        {BEADS.map(b => (
          <button key={b.name} onClick={() => addBead(b)} style={{
            background: `${b.color}25`, border: `2px solid ${b.color}`,
            borderRadius: 16, padding: '10px 14px', cursor: 'pointer',
            color: '#fff', fontSize: 13, fontWeight: 800,
          }}>
            {b.name}
          </button>
        ))}
      </div>

      <button onClick={clear} style={{
        background: 'rgba(255,255,255,0.1)', border: '1px solid #64748b',
        color: '#cbd5e1', padding: '10px 24px', borderRadius: 18, cursor: 'pointer', fontWeight: 600,
      }}>
        Reset Bracelet
      </button>
    </div>
  );
}
