import React, { useState } from 'react';

const INGREDIENTS = [
  { name: 'Sweet Hugs 🥑', emoji: '🥑' },
  { name: 'Endless Laughter 🌽', emoji: '🌽' },
  { name: 'Warm Sunshine 🍊', emoji: '🍊' },
  { name: 'Pure Loyalty 🥦', emoji: '🥦' },
  { name: 'Late Night Chats 🫐', emoji: '🫐' },
];

export default function LoveRecipe() {
  const [bowl, setBowl] = useState([]);
  const [isMixed, setIsMixed] = useState(false);

  const addIngredient = (ing) => {
    if (bowl.includes(ing.name)) return;
    setBowl(b => [...b, ing]);
    setIsMixed(false);
  };

  const mix = () => setIsMixed(true);
  const reset = () => { setBowl([]); setIsMixed(false); };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #064e3b 0%, #022c22 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🥗</div>
        <h1 style={{ color: '#34d399', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Salad Mixer
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Toss the perfect love salad with personality ingredients! 🥗💚
        </p>
      </div>

      <div style={{
        position: 'relative', width: 220, height: 160,
        background: 'rgba(255,255,255,0.05)', border: '4px solid #34d399',
        borderRadius: '0 0 100px 100px', display: 'flex', flexWrap: 'wrap',
        gap: 8, alignItems: 'center', justifyContent: 'center', padding: 16,
        marginBottom: 24, boxShadow: '0 10px 30px rgba(52,211,153,0.2)',
      }}>
        {bowl.length === 0 ? (
          <div style={{ color: '#a7f3d0', fontSize: 13, textAlign: 'center' }}>
            Pick ingredients below! 🥗
          </div>
        ) : (
          bowl.map((ing, idx) => (
            <div key={idx} style={{ fontSize: 32, animation: 'popIn 0.3s ease' }}>
              {ing.emoji}
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, width: '100%', maxWidth: 360, marginBottom: 20 }}>
        {INGREDIENTS.map(i => (
          <button key={i.name} onClick={() => addIngredient(i)} style={{
            background: bowl.some(x => x.name === i.name) ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.05)',
            border: `2px solid ${bowl.some(x => x.name === i.name) ? '#34d399' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 16, padding: '12px 6px', cursor: 'pointer', textAlign: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>
            {i.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={reset} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid #64748b',
          color: '#cbd5e1', padding: '12px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 600,
        }}>
          Reset
        </button>
        <button onClick={mix} disabled={bowl.length === 0} style={{
          background: bowl.length > 0 ? 'linear-gradient(135deg, #059669, #34d399)' : 'rgba(255,255,255,0.1)',
          border: 'none', color: '#fff', padding: '12px 32px', borderRadius: 20, cursor: 'pointer',
          fontWeight: 900, boxShadow: bowl.length > 0 ? '0 0 20px rgba(52,211,153,0.4)' : 'none',
        }}>
          🥗 Toss Salad!
        </button>
      </div>

      {isMixed && (
        <div style={{
          marginTop: 20, width: '100%', maxWidth: 360,
          background: 'rgba(52,211,153,0.15)', border: '2px solid #34d399',
          borderRadius: 20, padding: '16px', textAlign: 'center', color: '#a7f3d0', fontSize: 14, fontWeight: 700,
        }}>
          Healthy & sweet! Abu & Bhuntu's love salad is 100% full of vitamins & affection! 🥗💚
        </div>
      )}

      <style>{`
        @keyframes popIn { from{transform:scale(0)} to{transform:scale(1)} }
      `}</style>
    </div>
  );
}
