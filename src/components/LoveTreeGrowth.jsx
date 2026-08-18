import React, { useState, useEffect } from 'react';

const CACTUS_STAGES = [
  { height: 40, needles: 2, msg: null },
  { height: 70, needles: 4, msg: null },
  { height: 100, needles: 6, msg: "You watered me 3 times! I'm growing! 🌵" },
  { height: 130, needles: 8, msg: null },
  { height: 160, needles: 10, msg: "I'm blooming just like your love! 🌸" },
  { height: 190, needles: 12, msg: null },
  { height: 220, needles: 14, msg: "Full bloom! Abu loves you more than you know 💙" },
];

const LOVE_DROPS = [
  "💙 Abu misses you", "🌸 You're his sunshine",
  "💕 He thinks of you every day", "✨ His fave person = Bhuntu",
  "🏡 Home is wherever you are", "💫 You make him complete",
  "🥰 His smile is because of you",
];

export default function LoveTreeGrowth() {
  const [stage, setStage] = useState(0);
  const [drops, setDrops] = useState([]);
  const [watering, setWatering] = useState(false);
  const [totalPours, setTotalPours] = useState(0);
  const nextDrop = React.useRef(0);

  const water = () => {
    if (watering || stage >= CACTUS_STAGES.length - 1) return;
    setWatering(true);
    setTotalPours(p => p + 1);

    // Show water drops
    const id = nextDrop.current++;
    const msg = LOVE_DROPS[id % LOVE_DROPS.length];
    setDrops(d => [...d, { id, msg }]);
    setTimeout(() => setDrops(d => d.filter(x => x.id !== id)), 3000);

    setTimeout(() => {
      setStage(s => Math.min(s + 1, CACTUS_STAGES.length - 1));
      setWatering(false);
    }, 1000);
  };

  const current = CACTUS_STAGES[stage];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a1a0a 0%, #1a2e0a 50%, #2d1a0a 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🌵</div>
        <h1 style={{ color: '#4ade80', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Cactus Garden
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Water the cactus to grow Abu's love messages 💚
        </p>
      </div>

      {/* Stage bar */}
      <div style={{ width: '100%', maxWidth: 400, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 12, marginBottom: 6 }}>
          <span>💧 Love poured: {totalPours}</span>
          <span>Stage {stage + 1}/{CACTUS_STAGES.length}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, height: 8 }}>
          <div style={{
            height: '100%', background: 'linear-gradient(to right, #16a34a, #4ade80)',
            borderRadius: 8, width: `${((stage) / (CACTUS_STAGES.length - 1)) * 100}%`,
            transition: 'width 0.5s',
          }} />
        </div>
      </div>

      {/* Scene */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: 400, height: 400,
        background: 'linear-gradient(180deg, #1e3a1e 0%, #2d4a1a 100%)',
        borderRadius: 24, overflow: 'hidden', marginBottom: 24, border: '2px solid rgba(74,222,128,0.2)',
      }}>
        {/* Ground */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(180deg, #78350f, #451a03)', borderRadius: '0 0 22px 22px',
        }}>
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            color: '#a16207', fontSize: 12, fontWeight: 600,
          }}>
            🪨 Abu & Bhuntu's Love Pot 🪨
          </div>
        </div>

        {/* Cactus */}
        <div style={{
          position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
          width: 20, height: current.height,
          background: 'linear-gradient(to right, #16a34a, #22c55e)',
          borderRadius: 10, transition: 'height 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: '0 0 20px rgba(34,197,94,0.4)',
        }}>
          {/* Arms at stage 3+ */}
          {stage >= 3 && (
            <>
              <div style={{
                position: 'absolute', top: '40%', left: -30, width: 30, height: 12,
                background: 'linear-gradient(to right, #16a34a, #22c55e)', borderRadius: 6,
              }} />
              <div style={{
                position: 'absolute', top: '60%', right: -30, width: 30, height: 12,
                background: 'linear-gradient(to right, #22c55e, #16a34a)', borderRadius: 6,
              }} />
            </>
          )}
          {/* Flower at stage 6 */}
          {stage >= 6 && (
            <div style={{
              position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
              fontSize: 36, animation: 'bloom 0.5s ease',
            }}>🌸</div>
          )}
        </div>

        {/* Water drops */}
        {drops.map(d => (
          <div key={d.id} style={{
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,100,255,0.2)', border: '1px solid rgba(100,200,255,0.5)',
            borderRadius: 20, padding: '8px 16px', color: '#93c5fd', fontSize: 13, fontWeight: 600,
            whiteSpace: 'nowrap', animation: 'dropFall 3s ease forwards',
          }}>
            💧 {d.msg}
          </div>
        ))}

        {/* Stage message */}
        {current.msg && (
          <div style={{
            position: 'absolute', top: '10%', left: 16, right: 16,
            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(74,222,128,0.4)',
            borderRadius: 16, padding: '12px 16px', textAlign: 'center',
            color: '#4ade80', fontSize: 14, fontWeight: 600, animation: 'fadeIn 0.5s ease',
          }}>
            {current.msg}
          </div>
        )}
      </div>

      {/* Water button */}
      {stage < CACTUS_STAGES.length - 1 ? (
        <button onClick={water} disabled={watering} style={{
          padding: '16px 48px',
          background: watering ? '#1e3a1e' : 'linear-gradient(135deg, #16a34a, #4ade80)',
          color: '#fff', border: 'none', borderRadius: 40,
          fontSize: 20, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 0 30px rgba(74,222,128,0.4)',
          transition: 'all 0.3s',
        }}>
          {watering ? '💧 Watering...' : '💧 Water with Love!'}
        </button>
      ) : (
        <div style={{
          padding: '24px', background: 'rgba(74,222,128,0.1)',
          border: '2px solid #4ade80', borderRadius: 24, textAlign: 'center', maxWidth: 400,
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌸</div>
          <h3 style={{ color: '#4ade80', fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
            Fully Bloomed! 🌵
          </h3>
          <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>
            Just like this cactus, Abu's love has grown strong and beautiful — 
            thorny on the outside but filled with the softest love inside. 
            That's all for you, Bhuntu 💙
          </p>
        </div>
      )}

      <style>{`
        @keyframes dropFall { 0%{opacity:1;transform:translateX(-50%) translateY(0)} 100%{opacity:0;transform:translateX(-50%) translateY(100px)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes bloom { from{transform:translateX(-50%) scale(0)} to{transform:translateX(-50%) scale(1)} }
      `}</style>
    </div>
  );
}
