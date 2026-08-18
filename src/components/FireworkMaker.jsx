import React, { useState, useEffect } from 'react';

const TRACKS = [
  { note: '🔴 C', key: '1', label: 'Abu\'s Heartbeat', color: '#ef4444' },
  { note: '🟡 E', key: '2', label: 'Bhuntu\'s Laughter', color: '#f59e0b' },
  { note: '🟢 G', key: '3', label: 'Osaka Love Melody', color: '#10b981' },
  { note: '🔵 B', key: '4', label: 'Forever Solo', color: '#3b82f6' },
];

export default function FireworkMaker() {
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [notes, setNotes] = useState([]);

  const hitNote = (t) => {
    setCombo(c => {
      const next = c + 1;
      if (next > maxCombo) setMaxCombo(next);
      return next;
    });
    setNotes(prev => [...prev, { id: Math.random(), text: t.label, color: t.color }]);
    setTimeout(() => {
      setNotes(prev => prev.slice(1));
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 56 }}>🎸</div>
        <h1 style={{ color: '#ec4899', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Guitar Shredder
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Tap the frets to play Abu & Bhuntu's love duet! 🎶
        </p>

        <div style={{ marginTop: 12, display: 'flex', gap: 20, justifyContent: 'center' }}>
          <div style={{ background: 'rgba(236,72,153,0.15)', border: '1px solid #ec4899', padding: '6px 16px', borderRadius: 20, color: '#ec4899', fontWeight: 800 }}>
            COMBO: {combo} 🔥
          </div>
          <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid #f59e0b', padding: '6px 16px', borderRadius: 20, color: '#f59e0b', fontWeight: 800 }}>
            BEST: {maxCombo} ⭐
          </div>
        </div>
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 360, height: 280,
        background: '#111', border: '3px solid #374151', borderRadius: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', marginBottom: 24,
      }}>
        {/* Frets visual */}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {TRACKS.map((t, idx) => (
            <div key={idx} style={{ borderRight: idx < 3 ? '1px dashed #374151' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 20, alignItems: 'center' }}>
              <div style={{ width: 12, height: '100%', background: `linear-gradient(180deg, transparent, ${t.color}30)` }} />
            </div>
          ))}
        </div>

        {/* Floating notes */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          {notes.map(n => (
            <div key={n.id} style={{
              color: n.color, fontSize: 18, fontWeight: 900, textShadow: `0 0 12px ${n.color}`,
              animation: 'floatUp 0.8s ease forwards',
            }}>
              🎵 {n.text}!
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, width: '100%', maxWidth: 360 }}>
        {TRACKS.map((t, idx) => (
          <button key={idx} onClick={() => hitNote(t)} style={{
            background: `${t.color}25`, border: `2px solid ${t.color}`,
            borderRadius: 16, padding: '16px 4px', cursor: 'pointer', textAlign: 'center',
            color: '#fff', fontSize: 14, fontWeight: 800, boxShadow: `0 0 12px ${t.color}40`,
            transition: 'transform 0.1s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {t.note}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes floatUp { 0%{opacity:1;transform:translateY(20px) scale(0.8)} 100%{opacity:0;transform:translateY(-60px) scale(1.2)} }
      `}</style>
    </div>
  );
}
