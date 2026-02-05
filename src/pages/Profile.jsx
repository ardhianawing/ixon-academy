import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Award, Shield, Star, TrendingUp, Gamepad2, Clock,
  Target, Flame, Eye, Calendar, MapPin, ChevronRight
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  )
}

const badges = [
  { name: 'First Blood', desc: 'Selesaikan review pertama', rarity: 'common', icon: '⚔️', unlocked: true },
  { name: 'Scholar', desc: '10 modul selesai', rarity: 'common', icon: '📚', unlocked: true },
  { name: 'Streak Master', desc: '7 hari berturut-turut', rarity: 'rare', icon: '🔥', unlocked: true },
  { name: 'Community Voice', desc: '50 post di forum', rarity: 'rare', icon: '💬', unlocked: true },
  { name: 'Coach Favorite', desc: 'Rating 5★ dari coach', rarity: 'epic', icon: '⭐', unlocked: true },
  { name: 'Rising Star', desc: 'Top 50 Leaderboard', rarity: 'epic', icon: '🌟', unlocked: true },
  { name: 'The Prodigy', desc: 'Talent Score 80+', rarity: 'legendary', icon: '👑', unlocked: false },
  { name: 'Trial Ready', desc: 'Diundang trial tim pro', rarity: 'legendary', icon: '🏆', unlocked: false },
]

const rarityColors = {
  common: { border: '#888', bg: 'rgba(136,136,136,0.08)', glow: 'none' },
  rare: { border: '#4488ff', bg: 'rgba(68,136,255,0.08)', glow: '0 0 10px rgba(68,136,255,0.2)' },
  epic: { border: '#a855f7', bg: 'rgba(168,85,247,0.08)', glow: '0 0 10px rgba(168,85,247,0.2)' },
  legendary: { border: '#ffd700', bg: 'rgba(255,215,0,0.08)', glow: '0 0 15px rgba(255,215,0,0.3)' },
}

const skillRadar = [
  { label: 'Macro', value: 78 },
  { label: 'Micro', value: 65 },
  { label: 'Farming', value: 82 },
  { label: 'Teamfight', value: 70 },
  { label: 'Map Awareness', value: 75 },
]

export default function Profile() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
      {/* Profile Header */}
      <Anim>
        <div className="ix-card ix-border-gradient" style={{ padding: 24, marginBottom: 20, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 900, fontFamily: 'Orbitron, monospace',
            color: '#000', flexShrink: 0,
          }}>
            P
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h1 className="font-orbitron" style={{ fontSize: 22, fontWeight: 800 }}>ProdigyX</h1>
              <span style={{
                padding: '2px 8px', borderRadius: 4, fontSize: 10,
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                background: 'rgba(255,215,0,0.15)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)',
                textTransform: 'uppercase',
              }}>Gold</span>
            </div>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 8 }}>
              Jungler Main · Mythical Glory · IXON Academy Member since Jan 2025
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span className="font-exo" style={{ fontSize: 12, color: '#555570', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} /> Jakarta, ID
              </span>
              <span className="font-exo" style={{ fontSize: 12, color: '#555570', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={12} /> Joined Jan 2025
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="font-orbitron" style={{ fontSize: 36, fontWeight: 900, color: '#00f0ff' }}>72</div>
            <div className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Talent Score</div>
          </div>
        </div>
      </Anim>

      {/* Talent Score Breakdown */}
      <Anim delay={0.1}>
        <div className="ix-card" style={{ padding: 20, marginBottom: 20 }}>
          <h2 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} color="#00f0ff" /> Talent Score Breakdown
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Skill (40%)', value: 75, color: '#00f0ff' },
              { label: 'Mindset (30%)', value: 68, color: '#a855f7' },
              { label: 'Commitment (30%)', value: 72, color: '#22c55e' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="font-rajdhani" style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                  <span className="font-orbitron" style={{ fontSize: 13, color: s.color }}>{s.value}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: '#1a1a2e', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                    style={{ height: '100%', borderRadius: 3, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Anim>

      {/* Skill Radar (simplified bar chart) */}
      <Anim delay={0.15}>
        <div className="ix-card" style={{ padding: 20, marginBottom: 20 }}>
          <h2 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Gamepad2 size={18} color="#ff2d55" /> Skill Analysis
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {skillRadar.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="font-rajdhani" style={{ fontSize: 12, fontWeight: 600, width: 100, textAlign: 'right', color: '#8888a8' }}>
                  {s.label}
                </span>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#1a1a2e', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    style={{
                      height: '100%', borderRadius: 4,
                      background: `linear-gradient(90deg, #ff2d55, #ff6b8a)`,
                    }}
                  />
                </div>
                <span className="font-orbitron" style={{ fontSize: 12, width: 30, color: '#ff2d55' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Anim>

      {/* Badges */}
      <Anim delay={0.2}>
        <div className="ix-card" style={{ padding: 20, marginBottom: 20 }}>
          <h2 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={18} color="#ffd700" /> Badge Collection
            <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', fontWeight: 400, marginLeft: 'auto' }}>
              6/8 Unlocked
            </span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
            {badges.map((b, i) => {
              const r = rarityColors[b.rarity]
              return (
                <motion.div
                  key={i}
                  whileHover={b.unlocked ? { scale: 1.05 } : {}}
                  style={{
                    padding: 14, borderRadius: 10, textAlign: 'center',
                    background: b.unlocked ? r.bg : 'rgba(30,30,40,0.5)',
                    border: `1px solid ${b.unlocked ? r.border : '#333'}`,
                    boxShadow: b.unlocked ? r.glow : 'none',
                    opacity: b.unlocked ? 1 : 0.4,
                    filter: b.unlocked ? 'none' : 'grayscale(1)',
                    cursor: b.unlocked ? 'pointer' : 'default',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{b.icon}</div>
                  <div className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700, color: b.unlocked ? '#e8e8f0' : '#555' }}>
                    {b.name}
                  </div>
                  <div className="font-exo" style={{ fontSize: 10, color: '#8888a8', marginTop: 2 }}>{b.desc}</div>
                  <div className="font-rajdhani" style={{
                    fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: r.border, marginTop: 6,
                  }}>
                    {b.rarity}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Anim>

      {/* Stats Summary */}
      <Anim delay={0.25}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
          {[
            { label: 'Modul Selesai', value: '23', icon: BookOpen, color: '#00f0ff' },
            { label: 'Review Diterima', value: '8', icon: Target, color: '#ff2d55' },
            { label: 'Post Komunitas', value: '47', icon: Eye, color: '#a855f7' },
            { label: 'Login Streak', value: '7 hari', icon: Flame, color: '#ffd700' },
          ].map((s, i) => (
            <div key={i} className="ix-card" style={{ padding: 14, textAlign: 'center' }}>
              <s.icon size={18} color={s.color} style={{ marginBottom: 4 }} />
              <div className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div className="font-rajdhani" style={{ fontSize: 10, color: '#8888a8', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Anim>
    </div>
  )
}
