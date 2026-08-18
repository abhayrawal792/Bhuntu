import React, { useState } from 'react';

const EXPERIMENTS = [
  { name: 'Chemistry Mix 🧪', result: '100% Spark Match! Reaction caused endless affection bubbles!' },
  { name: 'Magnet Test 🧲', result: 'Gravitational attraction = INFINITE! Irreversible soul binding!' },
  { name: 'Heartbeat Scan 💓', result: 'Rhythms perfectly in sync! Frequency matches across Nepal & Japan!' },
];

export default function CoupleQuiz2() {
  const [expIdx, setExpIdx] = useState(null);

  const testExp = (idx) => {
    setExpIdx(idx);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #09090b 0%, #18181b 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🔬</div>
        <h1 style={{ color: '#10b981', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Science Lab
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Run scientific tests proving Abu & Bhuntu are 100% certified soulmates! 🔬🧬
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, width: '100%', maxWidth: 360, marginBottom: 24 }}>
        {EXPERIMENTS.map((e, idx) => (
          <button key={idx} onClick={() => testExp(idx)} style={{
            background: expIdx === idx ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
            border: `2px solid ${expIdx === idx ? '#10b981' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 18, padding: '16px 14px', cursor: 'pointer', textAlign: 'left',
            color: '#fff', fontSize: 14, fontWeight: 800,
          }}>
            🧪 {e.name}
          </button>
        ))}
      </div>

      {expIdx !== null && (
        <div style={{
          width: '100%', maxWidth: 360, background: 'rgba(16,185,129,0.15)',
          border: '2px solid #10b981', borderRadius: 24, padding: '20px', textAlign: 'center',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ color: '#10b981', fontSize: 16, fontWeight: 900, marginBottom: 8 }}>
            TEST RESULT #00{expIdx + 1}
          </div>
          <p style={{ color: '#a7f3d0', fontSize: 15, lineHeight: 1.6, margin: 0, fontWeight: 700 }}>
            "{EXPERIMENTS[expIdx].result}"
          </p>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
