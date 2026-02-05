import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Trophy, Calendar, Users, MapPin, Clock, ChevronRight,
  Star, Gamepad2, TrendingUp, Eye, Crown, Zap, CheckCircle2,
  Bell, Target, BookOpen, Award, MessageSquare, DollarSign,
  BarChart3, AlertCircle, User, Mail, Phone, Lock, Shield
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

/* ============================================
   EVENTS
   ============================================ */
const events = [
  { title: 'IXON Weekly Scrim #12', type: 'Scrim', date: '8 Feb 2025', time: '19:00 WIB', slots: '8/10', prize: '-', tier: 'Silver+', status: 'open', color: '#00f0ff' },
  { title: 'Rising Stars Tournament', type: 'Tournament', date: '15 Feb 2025', time: '14:00 WIB', slots: '24/32', prize: 'Rp 2.5jt', tier: 'Gold+', status: 'open', color: '#ffd700' },
  { title: 'Coach Raven Live Session', type: 'Workshop', date: '10 Feb 2025', time: '20:00 WIB', slots: '45/50', prize: '-', tier: 'All', status: 'open', color: '#a855f7' },
  { title: 'IXON Cup Season 1', type: 'Tournament', date: '1 Mar 2025', time: 'TBA', slots: '0/64', prize: 'Rp 10jt', tier: 'Platinum', status: 'upcoming', color: '#ff2d55' },
]

export function Events() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Events</h1>
        <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 20 }}>Tournament, scrim, dan workshop</p>
      </Anim>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map((e, i) => (
          <Anim key={i} delay={i * 0.06}>
            <div className="ix-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                <div>
                  <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 600, background: `${e.color}15`, color: e.color, border: `1px solid ${e.color}30`, textTransform: 'uppercase', marginRight: 6 }}>{e.type}</span>
                  {e.status === 'upcoming' && <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 600, background: 'rgba(255,45,85,0.1)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)', textTransform: 'uppercase' }}>Coming Soon</span>}
                </div>
                <span className="font-rajdhani" style={{ fontSize: 12, color: '#8888a8' }}>Min: {e.tier}</span>
              </div>
              <h3 className="font-rajdhani" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{e.title}</h3>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {e.date}</span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {e.time}</span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {e.slots}</span>
                {e.prize !== '-' && <span className="font-exo" style={{ fontSize: 12, color: '#ffd700', display: 'flex', alignItems: 'center', gap: 4 }}><Trophy size={12} /> {e.prize}</span>}
              </div>
              {e.status === 'open' && (
                <button className="font-rajdhani" style={{ padding: '8px 20px', borderRadius: 6, border: 'none', cursor: 'pointer', background: `${e.color}20`, color: e.color, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
                  Register
                </button>
              )}
            </div>
          </Anim>
        ))}
      </div>
    </div>
  )
}

/* ============================================
   SCOUTING
   ============================================ */
const scoutedPlayers = [
  { name: 'ShadowKing', role: 'Jungler', score: 94, status: 'Trial Scheduled', statusColor: '#22c55e', badges: 7 },
  { name: 'AceMLBB', role: 'Gold Laner', score: 91, status: 'Under Review', statusColor: '#ffd700', badges: 6 },
  { name: 'NightFury', role: 'Roamer', score: 89, status: 'Watchlist', statusColor: '#00f0ff', badges: 5 },
  { name: 'BlazeFire', role: 'Mid Laner', score: 87, status: 'Watchlist', statusColor: '#00f0ff', badges: 5 },
  { name: 'StormRider', role: 'EXP Laner', score: 85, status: 'New Entry', statusColor: '#a855f7', badges: 4 },
]

export function Scouting() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Scouting Board</h1>
        <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 6 }}>Top talent terdeteksi untuk pipeline tim profesional</p>
        <p className="font-exo" style={{ fontSize: 11, color: '#555570', marginBottom: 20 }}>Threshold: Talent Score ≥ 85 · Hanya visible untuk Platinum members</p>
      </Anim>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {scoutedPlayers.map((p, i) => (
          <Anim key={i} delay={i * 0.06}>
            <div className="ix-card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff20, #a855f720)', border: '2px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, fontFamily: 'Orbitron', color: '#00f0ff', flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{p.name}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{p.role}</span>
                  <span className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>🏅 {p.badges} badges</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, color: '#00f0ff' }}>{p.score}</div>
                <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 9, fontFamily: 'Rajdhani', fontWeight: 600, background: `${p.statusColor}15`, color: p.statusColor, border: `1px solid ${p.statusColor}30` }}>{p.status}</span>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  )
}

/* ============================================
   PRICING
   ============================================ */
const tiers = [
  { name: 'Free', price: 'Gratis', color: '#888', features: ['Lihat komunitas (read-only)', 'React & vote post', 'Weekly insight digest', '1 quiz gratis/minggu', 'Leaderboard visibility'] },
  { name: 'Silver', price: 'Rp 29K', period: '/bln', color: '#c0c0c0', features: ['Semua Free +', 'Akses LMS lengkap', 'Post di komunitas', 'Progress tracking', 'Daily missions & XP', 'Badge collection'] },
  { name: 'Gold', price: 'Rp 79K', period: '/bln', color: '#ffd700', popular: true, features: ['Semua Silver +', 'Submit gameplay review (3/bln)', 'Coach feedback personal', 'Improvement plan', 'Priority community support', 'Exclusive workshop access'] },
  { name: 'Platinum', price: 'Rp 149K', period: '/bln', color: '#00f0ff', features: ['Semua Gold +', 'Submit review (unlimited)', 'Scrim simulation access', 'Priority queue review', 'Scouting Board visibility', 'Direct coach messaging', 'Trial invitation eligibility'] },
]

export function Pricing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 1000, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 className="font-orbitron" style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Membership</h1>
          <p className="font-exo" style={{ fontSize: 14, color: '#8888a8' }}>Investasi kecil, potensi karir besar</p>
        </div>
      </Anim>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
        {tiers.map((t, i) => (
          <Anim key={i} delay={i * 0.08}>
            <div className="ix-card" style={{
              padding: 24, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
              border: t.popular ? `1px solid ${t.color}50` : undefined,
              boxShadow: t.popular ? `0 0 30px ${t.color}15` : undefined,
            }}>
              {t.popular && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', padding: '3px 14px', borderRadius: 100, background: 'linear-gradient(135deg, #ffd700, #ff8c00)', fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700, color: '#000', textTransform: 'uppercase' }}>Most Popular</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <Crown size={16} color={t.color} />
                <span className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, color: t.color, textTransform: 'uppercase' }}>{t.name}</span>
              </div>
              <div style={{ marginBottom: 18 }}>
                <span className="font-orbitron" style={{ fontSize: 26, fontWeight: 800 }}>{t.price}</span>
                {t.period && <span className="font-exo" style={{ fontSize: 13, color: '#555570' }}>{t.period}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {t.features.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                    <CheckCircle2 size={13} color={t.color} style={{ marginTop: 2, flexShrink: 0, opacity: 0.6 }} />
                    <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => t.name === 'Free' ? navigate('/login') : navigate(`/checkout?tier=${t.name.toLowerCase()}`)}
                style={{
                  marginTop: 20, padding: 10, borderRadius: 8, textAlign: 'center', width: '100%',
                  fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', cursor: 'pointer',
                  color: t.popular ? '#000' : t.color,
                  background: t.popular ? `linear-gradient(135deg, ${t.color}, #ff8c00)` : 'transparent',
                  border: t.popular ? 'none' : `1px solid ${t.color}40`,
                }}
              >
                {t.name === 'Free' ? 'Daftar Gratis' : 'Upgrade Now'}
              </button>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  )
}

/* ============================================
   COACH DASHBOARD
   ============================================ */
export function CoachDashboard() {
  const stats = [
    { label: 'Queue', value: '5', icon: Clock, color: '#ffd700' },
    { label: 'CQS Score', value: '4.6', icon: Star, color: '#22c55e' },
    { label: 'Total Reviews', value: '142', icon: Target, color: '#00f0ff' },
    { label: 'Earnings', value: 'Rp 2.8jt', icon: DollarSign, color: '#a855f7' },
  ]
  const queue = [
    { player: 'ProdigyX', hero: 'Ling', role: 'Jungler', submitted: '2 jam lalu', priority: false },
    { player: 'BlazeFire', hero: 'Kagura', role: 'Mid', submitted: '4 jam lalu', priority: true },
    { player: 'TigerClaw', hero: 'Wanwan', role: 'Gold Lane', submitted: '6 jam lalu', priority: false },
  ]

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Coach Dashboard</h1>
        <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 20 }}>Welcome, Coach Raven</p>
      </Anim>
      <Anim delay={0.05}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={i} className="ix-card" style={{ padding: 14, textAlign: 'center' }}>
              <s.icon size={18} color={s.color} style={{ marginBottom: 4 }} />
              <div className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div className="font-rajdhani" style={{ fontSize: 10, color: '#8888a8', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Anim>
      <Anim delay={0.1}>
        <div className="ix-card" style={{ padding: 20 }}>
          <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>Review Queue</h3>
          {queue.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: i < queue.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>
                  {q.player} {q.priority && <span style={{ fontSize: 10, color: '#ff2d55', fontWeight: 600 }}>⚡ PRIORITY</span>}
                </div>
                <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{q.hero} · {q.role} · {q.submitted}</div>
              </div>
              <button className="font-rajdhani" style={{ padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', background: 'rgba(0,240,255,0.1)', color: '#00f0ff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                Start Review
              </button>
            </div>
          ))}
        </div>
      </Anim>
    </div>
  )
}

/* ============================================
   NOTIFICATIONS
   ============================================ */
const notifications = [
  { icon: Target, text: 'Review gameplay-mu sudah selesai oleh Coach Raven', time: '2 jam lalu', color: '#00f0ff', unread: true },
  { icon: Award, text: 'Badge baru unlocked: "Streak Master" 🔥', time: '5 jam lalu', color: '#ffd700', unread: true },
  { icon: TrendingUp, text: 'Rank naik ke #47 — keep grinding!', time: '1 hari lalu', color: '#22c55e', unread: false },
  { icon: MessageSquare, text: 'ShadowKing membalas post-mu di komunitas', time: '1 hari lalu', color: '#a855f7', unread: false },
  { icon: Trophy, text: 'IXON Weekly Scrim #12 — registrasi dibuka!', time: '2 hari lalu', color: '#ff2d55', unread: false },
  { icon: BookOpen, text: 'Modul baru tersedia: "Advanced Jungle Rotations"', time: '3 hari lalu', color: '#00f0ff', unread: false },
]

export function Notifications() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 700, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Notifications</h1>
        <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 20 }}>2 unread</p>
      </Anim>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {notifications.map((n, i) => (
          <Anim key={i} delay={i * 0.04}>
            <div className="ix-card" style={{
              padding: 14, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
              borderLeft: n.unread ? `3px solid ${n.color}` : '3px solid transparent',
              background: n.unread ? 'rgba(0,240,255,0.03)' : undefined,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${n.color}12`, border: `1px solid ${n.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <n.icon size={16} color={n.color} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="font-exo" style={{ fontSize: 13, lineHeight: 1.4 }}>{n.text}</p>
                <p className="font-exo" style={{ fontSize: 11, color: '#555570', marginTop: 2 }}>{n.time}</p>
              </div>
              {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, flexShrink: 0 }} />}
            </div>
          </Anim>
        ))}
      </div>
    </div>
  )
}

/* ============================================
   LOGIN / REGISTER
   ============================================ */
export function Login() {
  const [mode, setMode] = useState('login')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="ix-card ix-border-gradient" style={{ padding: 32, width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 12px', background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,45,85,0.1))', border: '2px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={28} color="#00f0ff" />
          </div>
          <h1 className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, marginBottom: 2 }}>IXON ACADEMY</h1>
          <p className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>{mode === 'login' ? 'Welcome back, player' : 'Mulai perjalananmu'}</p>
        </div>

        {mode === 'register' && (
          <div style={{ marginBottom: 12 }}>
            <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Nama Lengkap</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
              <User size={14} color="#555570" />
              <input type="text" placeholder="Nama sesuai KTP/Kartu Pelajar" style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }} />
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Email</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
            <Mail size={14} color="#555570" />
            <input type="email" placeholder="email@example.com" style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }} />
          </div>
        </div>

        {mode === 'register' && (
          <div style={{ marginBottom: 12 }}>
            <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>No. HP (untuk OTP)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
              <Phone size={14} color="#555570" />
              <input type="tel" placeholder="08xxxxxxxxxx" style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }} />
            </div>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
            <Lock size={14} color="#555570" />
            <input type="password" placeholder="••••••••" style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }} />
          </div>
        </div>

        <button className="font-rajdhani" style={{
          width: '100%', padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
          fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 14,
        }}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>

        <p className="font-exo" style={{ textAlign: 'center', fontSize: 12, color: '#8888a8' }}>
          {mode === 'login' ? "Belum punya akun?" : "Sudah punya akun?"}{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontFamily: 'Exo 2', fontSize: 12, fontWeight: 600 }}>
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
