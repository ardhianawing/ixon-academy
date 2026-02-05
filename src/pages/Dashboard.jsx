import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Zap, Target, BookOpen, Trophy, TrendingUp, Clock,
  ChevronRight, Flame, Star, Award, Play, CheckCircle2
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

const dailyMissions = [
  { title: 'Selesaikan 1 Modul LMS', xp: 50, icon: BookOpen, done: true },
  { title: 'Post di Komunitas', xp: 30, icon: Target, done: true },
  { title: 'Tonton 1 Video Tutorial', xp: 20, icon: Play, done: false },
  { title: 'Berikan Vote di 3 Post', xp: 15, icon: Star, done: false },
]

const recentActivity = [
  { text: 'Coach Raven menyelesaikan review gameplay-mu', time: '2 jam lalu', color: '#00f0ff' },
  { text: 'Badge "First Blood" unlocked!', time: '5 jam lalu', color: '#ffd700' },
  { text: 'Rank naik ke #47 di Leaderboard', time: '1 hari lalu', color: '#22c55e' },
  { text: 'Modul "Jungle Pathing Advanced" selesai', time: '1 hari lalu', color: '#a855f7' },
]

export default function Dashboard() {
  const talentScore = 72
  const level = 14
  const xpCurrent = 340
  const xpNext = 500
  const streak = 7

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 1000, margin: '0 auto', padding: '80px 16px 40px' }}>
      {/* Welcome */}
      <Anim>
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-rajdhani" style={{ fontSize: 28, fontWeight: 700 }}>
            Welcome back, <span style={{ color: '#00f0ff' }}>ProdigyX</span> 👋
          </h1>
          <p className="font-exo" style={{ fontSize: 14, color: '#8888a8' }}>
            Keep grinding — kamu di jalur yang benar.
          </p>
        </div>
      </Anim>

      {/* Stats Row */}
      <Anim delay={0.1}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Talent Score', value: talentScore, icon: TrendingUp, color: '#00f0ff', suffix: '/100' },
            { label: 'Level', value: level, icon: Award, color: '#ffd700', suffix: '' },
            { label: 'Streak', value: `${streak} hari`, icon: Flame, color: '#ff2d55', suffix: '' },
            { label: 'Rank', value: '#47', icon: Trophy, color: '#a855f7', suffix: '' },
          ].map((s, i) => (
            <div key={i} className="ix-card" style={{ padding: 16, textAlign: 'center' }}>
              <s.icon size={20} color={s.color} style={{ marginBottom: 6 }} />
              <div className="font-orbitron" style={{ fontSize: 22, fontWeight: 800, color: s.color }}>
                {s.value}<span style={{ fontSize: 12, color: '#555570' }}>{s.suffix}</span>
              </div>
              <div className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Anim>

      {/* XP Progress */}
      <Anim delay={0.15}>
        <div className="ix-card" style={{ padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Level {level} Progress
            </span>
            <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>
              {xpCurrent}/{xpNext} XP
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: '#1a1a2e', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(xpCurrent / xpNext) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #00f0ff, #0088cc)' }}
            />
          </div>
        </div>
      </Anim>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* Daily Missions */}
        <Anim delay={0.2}>
          <div className="ix-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Zap size={18} color="#ffd700" />
              <span className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Daily Missions</span>
              <span className="font-exo" style={{ fontSize: 11, color: '#22c55e', marginLeft: 'auto' }}>2/4</span>
            </div>
            {dailyMissions.map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                borderBottom: i < dailyMissions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                opacity: m.done ? 0.5 : 1,
              }}>
                {m.done ? <CheckCircle2 size={18} color="#22c55e" /> : <m.icon size={18} color="#8888a8" />}
                <span className="font-exo" style={{ fontSize: 13, flex: 1, textDecoration: m.done ? 'line-through' : 'none' }}>
                  {m.title}
                </span>
                <span className="font-rajdhani" style={{ fontSize: 12, color: '#ffd700', fontWeight: 600 }}>+{m.xp} XP</span>
              </div>
            ))}
          </div>
        </Anim>

        {/* Recent Activity */}
        <Anim delay={0.25}>
          <div className="ix-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Clock size={18} color="#00f0ff" />
              <span className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase' }}>Activity</span>
            </div>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
                borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <p className="font-exo" style={{ fontSize: 13 }}>{a.text}</p>
                  <p className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Anim>
      </div>

      {/* Quick Actions */}
      <Anim delay={0.3}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 24 }}>
          {[
            { label: 'Lanjut Belajar', desc: 'Jungle Pathing Lv.3', path: '/courses', icon: BookOpen, color: '#00f0ff' },
            { label: 'Submit Gameplay', desc: '2 review tersisa', path: '/evaluation', icon: Target, color: '#ff2d55' },
            { label: 'Lihat Rank', desc: 'Naik 5 posisi!', path: '/leaderboard', icon: Trophy, color: '#ffd700' },
          ].map((q, i) => (
            <Link key={i} to={q.path} style={{ textDecoration: 'none' }}>
              <div className="ix-card" style={{
                padding: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${q.color}12`, border: `1px solid ${q.color}30`,
                }}>
                  <q.icon size={20} color={q.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>{q.label}</div>
                  <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{q.desc}</div>
                </div>
                <ChevronRight size={16} color="#555570" />
              </div>
            </Link>
          ))}
        </div>
      </Anim>
    </div>
  )
}
