import React, { useState, useRef } from 'react';

const DNA_TRAITS = [
  { label: 'Cuteness', abu: 97, bhuntu: 99, color: '#ff6b9d' },
  { label: 'Loyalty', abu: 100, bhuntu: 100, color: '#c084fc' },
  { label: 'Love Strength', abu: 98, bhuntu: 99, color: '#f472b6' },
  { label: 'Stubbornness', abu: 85, bhuntu: 88, color: '#fb923c' },
  { label: 'Caring', abu: 100, bhuntu: 100, color: '#34d399' },
  { label: 'Humor', abu: 92, bhuntu: 89, color: '#60a5fa' },
  { label: 'Romance', abu: 96, bhuntu: 97, color: '#f87171' },
  { label: 'Silliness', abu: 94, bhuntu: 91, color: '#fbbf24' },
];

const COMPATIBILITY_RESULT = {
  score: 99.7,
  grade: 'COSMIC SOULMATES ✨',
  message: 'Abu 💙 Bhuntu — Your DNA strands are literally designed to intertwine. Scientists cannot explain this level of compatibility. It defies all known genetic laws. You two are simply meant to be.',
};

export default function LoveScratchCard() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startScan = () => {
    if (scanned || scanning) return;
    setScanning(true);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setScanning(false);
        setScanned(true);
      }
      setProgress(Math.min(p, 100));
    }, 60);
  };

  const reset = () => {
    setScanned(false);
    setScanning(false);
    setProgress(0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🧬</div>
        <h1 style={{ color: '#f0abfc', fontSize: 28, fontWeight: 900, margin: 0 }}>
          DNA Love Match
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14, margin: '8px 0 0' }}>
          Genetic compatibility analysis: Abu 💙 Bhuntu
        </p>
      </div>

      {/* DNA Helix Visual */}
      <div style={{ position: 'relative', width: 120, height: 200, marginBottom: 32 }}>
        {[...Array(10)].map((_, i) => {
          const y = i * 20;
          const phase = (i / 10) * Math.PI * 2;
          const x1 = 60 + Math.sin(phase) * 40;
          const x2 = 60 - Math.sin(phase) * 40;
          const colorA = i % 2 === 0 ? '#f0abfc' : '#818cf8';
          const colorB = i % 2 === 0 ? '#818cf8' : '#f0abfc';
          return (
            <React.Fragment key={i}>
              <div style={{
                position: 'absolute', top: y, left: x1 - 8, width: 16, height: 16,
                borderRadius: '50%', background: colorA,
                boxShadow: `0 0 ${scanned ? 20 : 8}px ${colorA}`,
                transition: 'box-shadow 0.3s',
                animation: scanning ? 'pulse 0.5s infinite alternate' : 'none',
              }} />
              <div style={{
                position: 'absolute', top: y, left: x2 - 8, width: 16, height: 16,
                borderRadius: '50%', background: colorB,
                boxShadow: `0 0 ${scanned ? 20 : 8}px ${colorB}`,
                transition: 'box-shadow 0.3s',
                animation: scanning ? 'pulse 0.5s infinite alternate' : 'none',
              }} />
              {/* Rung between them */}
              <div style={{
                position: 'absolute', top: y + 6, left: Math.min(x1, x2), width: Math.abs(x2 - x1),
                height: 4, background: `linear-gradient(to right, ${colorA}, ${colorB})`,
                opacity: 0.5,
              }} />
            </React.Fragment>
          );
        })}
      </div>

      {/* Scan Button */}
      {!scanned && (
        <button
          onClick={startScan}
          disabled={scanning}
          style={{
            background: scanning ? '#4c1d95' : 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: '#fff', border: 'none', borderRadius: 40,
            padding: '14px 40px', fontSize: 18, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)', marginBottom: 24,
            transition: 'all 0.3s',
          }}
        >
          {scanning ? '🔬 Scanning DNA...' : '🔬 Run DNA Analysis'}
        </button>
      )}

      {/* Progress Bar */}
      {(scanning || progress > 0) && (
        <div style={{ width: '100%', maxWidth: 360, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c084fc', fontSize: 13, marginBottom: 6 }}>
            <span>Analyzing genetic sequences...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ background: '#1e1b4b', borderRadius: 8, height: 12, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(to right, #7c3aed, #ec4899)',
              transition: 'width 0.1s', borderRadius: 8,
              boxShadow: '0 0 12px rgba(236, 72, 153, 0.6)',
            }} />
          </div>
        </div>
      )}

      {/* Results */}
      {scanned && (
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Score */}
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b, #2d1b69)',
            borderRadius: 20, padding: 24, textAlign: 'center', marginBottom: 20,
            border: '2px solid #7c3aed', boxShadow: '0 0 40px rgba(124, 58, 237, 0.3)',
          }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: '#f0abfc', lineHeight: 1 }}>
              {COMPATIBILITY_RESULT.score}%
            </div>
            <div style={{ color: '#fbbf24', fontSize: 18, fontWeight: 700, marginTop: 8 }}>
              {COMPATIBILITY_RESULT.grade}
            </div>
            <p style={{ color: '#c4b5fd', fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>
              {COMPATIBILITY_RESULT.message}
            </p>
          </div>

          {/* Trait Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {DNA_TRAITS.map((trait) => (
              <div key={trait.label} style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 16px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600 }}>{trait.label}</span>
                  <div style={{ display: 'flex', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                    <span>Abu: <b style={{ color: trait.color }}>{trait.abu}%</b></span>
                    <span>Bhuntu: <b style={{ color: trait.color }}>{trait.bhuntu}%</b></span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['Abu', 'Bhuntu'].map((name, ni) => {
                    const val = ni === 0 ? trait.abu : trait.bhuntu;
                    return (
                      <div key={name} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${val}%`, background: trait.color,
                          boxShadow: `0 0 8px ${trait.color}`, borderRadius: 6,
                          animation: 'slideIn 1s ease forwards',
                        }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button onClick={reset} style={{
            width: '100%', background: 'rgba(255,255,255,0.1)',
            color: '#c084fc', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12,
            padding: '12px', fontSize: 16, cursor: 'pointer',
          }}>
            🔄 Re-run Analysis
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse { from { transform: scale(1); } to { transform: scale(1.3); } }
        @keyframes slideIn { from { width: 0; } }
      `}</style>
    </div>
  );
}
