import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, TrendingUp, Crown, Star, Flame, ChevronUp, ChevronDown, Minus } from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  )
}

const players = [
  { rank: 1, name: 'ShadowKing', role: 'Jungler', score: 94, tier: 'Platinum', trend: 'up', change: 2 },
  { rank: 2, name: 'AceMLBB', role: 'Gold Laner', score: 91, tier: 'Platinum', trend: 'same', change: 0 },
  { rank: 3, name: 'NightFury', role: 'Roamer', score: 89, tier: 'Platinum', trend: 'up', change: 1 },
  { rank: 4, name: 'BlazeFire', role: 'Mid Laner', score: 87, tier: 'Gold', trend: 'down', change: 2 },
  { rank: 5, name: 'StormRider', role: 'EXP Laner', score: 85, tier: 'Gold', trend: 'up', change: 3 },
  { rank: 6, name: 'IceVenom', role: 'Jungler', score: 83, tier: 'Gold', trend: 'same', change: 0 },
  { rank: 7, name: 'DarkSlayer', role: 'Mid Laner', score: 81, tier: 'Gold', trend: 'up', change: 5 },
  { rank: 8, name: 'PhoenixRise', role: 'Roamer', score: 80, tier: 'Gold', trend: 'down', change: 1 },
  { rank: 9, name: 'TigerClaw', role: 'Gold Laner', score: 78, tier: 'Silver', trend: 'up', change: 4 },
  { rank: 10, name: 'WolfPack', role: 'EXP Laner', score: 76, tier: 'Silver', trend: 'down', change: 3 },
  { rank: 47, name: 'ProdigyX', role: 'Jungler', score: 72, tier: 'Gold', trend: 'up', change: 5, isYou: true },
]

const tierColors = { Platinum: '#00f0ff', Gold: '#ffd700', Silver: '#c0c0c0', Free: '#888' }

export default function Leaderboard() {
  const [tab, setTab] = useState('all')

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Leaderboard</h1>
          <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Ranking berdasarkan Talent Score — updated daily</p>
        </div>
      </Anim>

      {/* Tabs */}
      <Anim delay={0.05}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflow: 'auto' }}>
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'jungler', label: 'Jungler' },
            { id: 'goldlane', label: 'Gold Lane' },
            { id: 'midlane', label: 'Mid Lane' },
            { id: 'roamer', label: 'Roamer' },
            { id: 'explane', label: 'EXP Lane' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="font-rajdhani"
              style={{
                padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                background: tab === t.id ? 'rgba(0,240,255,0.1)' : 'transparent',
                color: tab === t.id ? '#00f0ff' : '#8888a8',
                borderBottom: tab === t.id ? '2px solid #00f0ff' : '2px solid transparent',
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </Anim>

      {/* Top 3 Podium */}
      <Anim delay={0.1}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, alignItems: 'flex-end' }}>
          {[players[1], players[0], players[2]].map((p, i) => {
            const isFirst = i === 1
            const medals = ['🥈', '🥇', '🥉']
            return (
              <motion.div key={i} whileHover={{ y: -4 }}
                className="ix-card" style={{
                  padding: '16px 12px', textAlign: 'center', flex: 1, maxWidth: 160,
                  borderColor: isFirst ? 'rgba(255,215,0,0.3)' : 'rgba(0,240,255,0.1)',
                  boxShadow: isFirst ? '0 0 20px rgba(255,215,0,0.1)' : 'none',
                }}>
                <div style={{ fontSize: isFirst ? 36 : 28, marginBottom: 6 }}>{medals[i]}</div>
                <div className="font-orbitron" style={{ fontSize: isFirst ? 16 : 14, fontWeight: 800, marginBottom: 2 }}>{p.name}</div>
                <div className="font-exo" style={{ fontSize: 11, color: '#8888a8', marginBottom: 6 }}>{p.role}</div>
                <div className="font-orbitron" style={{ fontSize: isFirst ? 28 : 22, fontWeight: 900, color: '#00f0ff' }}>{p.score}</div>
                <div className="font-rajdhani" style={{ fontSize: 10, color: '#555570', textTransform: 'uppercase' }}>Talent Score</div>
              </motion.div>
            )
          })}
        </div>
      </Anim>

      {/* Full Table */}
      <Anim delay={0.15}>
        <div className="ix-card" style={{ overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '50px 1fr 100px 80px 60px',
            padding: '10px 16px', background: 'rgba(0,240,255,0.03)',
            borderBottom: '1px solid rgba(0,240,255,0.1)',
          }}>
            {['#', 'Player', 'Role', 'Score', 'Trend'].map((h, i) => (
              <span key={i} className="font-rajdhani" style={{
                fontSize: 11, fontWeight: 700, color: '#555570',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {players.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.03 }}
              style={{
                display: 'grid', gridTemplateColumns: '50px 1fr 100px 80px 60px',
                padding: '12px 16px', alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                background: p.isYou ? 'rgba(0,240,255,0.05)' : 'transparent',
                borderLeft: p.isYou ? '3px solid #00f0ff' : '3px solid transparent',
              }}>
              <span className="font-orbitron" style={{
                fontSize: 14, fontWeight: 700,
                color: p.rank <= 3 ? '#ffd700' : p.isYou ? '#00f0ff' : '#8888a8',
              }}>
                {p.rank}
              </span>
              <div>
                <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>
                  {p.name}
                  {p.isYou && <span style={{ fontSize: 10, color: '#00f0ff', marginLeft: 6 }}>(You)</span>}
                </span>
              </div>
              <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>{p.role}</span>
              <span className="font-orbitron" style={{ fontSize: 14, fontWeight: 700, color: tierColors[p.tier] || '#888' }}>
                {p.score}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {p.trend === 'up' && <ChevronUp size={14} color="#22c55e" />}
                {p.trend === 'down' && <ChevronDown size={14} color="#ff2d55" />}
                {p.trend === 'same' && <Minus size={14} color="#555570" />}
                {p.change > 0 && (
                  <span className="font-exo" style={{ fontSize: 11, color: p.trend === 'up' ? '#22c55e' : '#ff2d55' }}>
                    {p.change}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Anim>
    </div>
  )
}
