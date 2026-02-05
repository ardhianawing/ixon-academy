import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Clock, Star, Target, DollarSign, Calendar, TrendingUp, MessageSquare,
  Video, Play, Eye, CheckCircle, XCircle, Filter, Search, Award,
  BarChart3, Users, BookOpen, Send, Pause, PlayCircle, SkipForward,
  FileText, ThumbsUp, ThumbsDown, AlertCircle, Zap, ChevronRight
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

// Mock Data
const mockReviewQueue = [
  { id: 1, player: 'ProdigyX', hero: 'Ling', role: 'Jungler', rank: 'Mythic Glory', submitted: '2 jam lalu', priority: true, tier: 'Platinum', duration: '12:34', status: 'pending' },
  { id: 2, player: 'BlazeFire', hero: 'Kagura', role: 'Mid', rank: 'Mythical Glory', submitted: '4 jam lalu', priority: true, tier: 'Platinum', duration: '15:22', status: 'pending' },
  { id: 3, player: 'TigerClaw', hero: 'Wanwan', role: 'Gold Lane', rank: 'Mythic', submitted: '6 jam lalu', priority: false, tier: 'Gold', duration: '18:45', status: 'pending' },
  { id: 4, player: 'NightFury', hero: 'Atlas', role: 'Roamer', rank: 'Legend I', submitted: '1 hari lalu', priority: false, tier: 'Gold', duration: '14:12', status: 'pending' },
  { id: 5, player: 'StormRider', hero: 'Esmeralda', role: 'EXP Lane', rank: 'Epic II', submitted: '1 hari lalu', priority: false, tier: 'Silver', duration: '16:50', status: 'pending' },
]

const completedReviews = [
  { id: 101, player: 'DragonSlayer', hero: 'Hayabusa', completedAt: '3 jam lalu', rating: 5, feedback: 'Sangat membantu!' },
  { id: 102, player: 'AceMLBB', hero: 'Claude', completedAt: '1 hari lalu', rating: 5, feedback: 'Detail banget coach!' },
  { id: 103, player: 'ShadowKing', hero: 'Lancelot', completedAt: '2 hari lalu', rating: 4, feedback: 'Good insights' },
]

const earningsHistory = [
  { month: 'Jan 2025', amount: 'Rp 8.2jt', reviews: 42, avgRating: 4.8 },
  { month: 'Dec 2024', amount: 'Rp 7.5jt', reviews: 38, avgRating: 4.7 },
  { month: 'Nov 2024', amount: 'Rp 6.9jt', reviews: 35, avgRating: 4.9 },
]

const studentProgress = [
  { name: 'ProdigyX', sessions: 8, improvement: '+340 MMR', lastSession: '2 hari lalu', trend: 'up' },
  { name: 'BlazeFire', sessions: 5, improvement: '+210 MMR', lastSession: '4 hari lalu', trend: 'up' },
  { name: 'NightFury', sessions: 3, improvement: '+120 MMR', lastSession: '1 minggu lalu', trend: 'neutral' },
]

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('queue')
  const [selectedReview, setSelectedReview] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const stats = [
    { label: 'Queue', value: mockReviewQueue.length, icon: Clock, color: '#ffd700' },
    { label: 'CQS Score', value: '4.8', icon: Star, color: '#22c55e' },
    { label: 'Total Reviews', value: '142', icon: Target, color: '#00f0ff' },
    { label: 'Earnings (MTD)', value: 'Rp 8.2jt', icon: DollarSign, color: '#a855f7' },
  ]

  const filteredQueue = mockReviewQueue.filter(r => {
    const matchSearch = r.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       r.hero.toLowerCase().includes(searchTerm.toLowerCase())
    return matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 1400, margin: '0 auto', padding: '80px 20px 40px' }}>
      {/* Header */}
      <Anim>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Award size={24} color="#ffd700" />
              <h1 className="font-orbitron" style={{ fontSize: 28, fontWeight: 800 }}>Coach Dashboard</h1>
            </div>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Welcome back, Coach Raven</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="font-rajdhani" style={{
              padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
              background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Calendar size={14} /> Schedule
            </button>
            <button className="font-rajdhani" style={{
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <MessageSquare size={14} /> Messages
            </button>
          </div>
        </div>
      </Anim>

      {/* Stats Grid */}
      <Anim delay={0.05}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={i} className="ix-card" style={{ padding: 16, textAlign: 'center' }}>
              <s.icon size={20} color={s.color} style={{ marginBottom: 6 }} />
              <div className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div className="font-rajdhani" style={{ fontSize: 10, color: '#8888a8', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Anim>

      {/* Tabs */}
      <Anim delay={0.1}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
          {['queue', 'students', 'earnings', 'completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-rajdhani"
              style={{
                padding: '10px 20px', background: 'none', border: 'none',
                borderBottom: activeTab === tab ? '2px solid #00f0ff' : '2px solid transparent',
                color: activeTab === tab ? '#00f0ff' : '#8888a8',
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </Anim>

      {/* Queue Tab */}
      {activeTab === 'queue' && (
        <>
          {/* Search & Filter */}
          <Anim delay={0.15}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
                <Search size={16} color="#555570" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search player or hero..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="font-exo"
                  style={{
                    width: '100%', padding: '10px 12px 10px 40px', borderRadius: 8,
                    border: '1px solid rgba(0,240,255,0.15)', background: '#12121a',
                    color: '#e8e8f0', fontSize: 13, outline: 'none'
                  }}
                />
              </div>
            </div>
          </Anim>

          {/* Review Queue */}
          <Anim delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredQueue.map((q, i) => (
                <div key={q.id} className="ix-card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Thumbnail */}
                    <div style={{
                      width: 120, height: 68, borderRadius: 8, background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(168,85,247,0.1))',
                      border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', flexShrink: 0
                    }}>
                      <Video size={28} color="#00f0ff" opacity={0.5} />
                      <div style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontFamily: 'Orbitron', color: '#fff' }}>
                        {q.duration}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                        <span className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700 }}>{q.player}</span>
                        {q.priority && (
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700, background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Zap size={10} /> Priority
                          </span>
                        )}
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700, background: 'rgba(255,215,0,0.15)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)', textTransform: 'uppercase' }}>
                          {q.tier}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                        <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Hero: <strong style={{ color: '#00f0ff' }}>{q.hero}</strong></span>
                        <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Role: {q.role}</span>
                        <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Rank: {q.rank}</span>
                      </div>
                      <span className="font-exo" style={{ fontSize: 11, color: '#555570' }}>Submitted {q.submitted}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
                      <button
                        onClick={() => setSelectedReview(q)}
                        className="font-rajdhani"
                        style={{
                          padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                          background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                          fontSize: 12, fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                        }}
                      >
                        <PlayCircle size={14} /> Start Review
                      </button>
                      <button className="font-rajdhani" style={{
                        padding: '6px 16px', borderRadius: 6, border: '1px solid rgba(0,240,255,0.3)',
                        background: 'transparent', color: '#00f0ff', fontSize: 11, fontWeight: 700,
                        textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                      }}>
                        <Eye size={12} /> Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Anim>
        </>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <Anim delay={0.15}>
          <div className="ix-card" style={{ padding: 20 }}>
            <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Student Progress Tracking</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {studentProgress.map((s, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 8, background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>{s.sessions} sessions</span>
                        <span className="font-exo" style={{ fontSize: 12, color: '#555570' }}>Last: {s.lastSession}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, color: s.trend === 'up' ? '#22c55e' : '#8888a8' }}>{s.improvement}</div>
                        <div className="font-exo" style={{ fontSize: 10, color: '#555570', textTransform: 'uppercase' }}>MMR Change</div>
                      </div>
                      <TrendingUp size={20} color={s.trend === 'up' ? '#22c55e' : '#8888a8'} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Anim>
      )}

      {/* Earnings Tab */}
      {activeTab === 'earnings' && (
        <Anim delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            {earningsHistory.map((e, i) => (
              <div key={i} className="ix-card" style={{ padding: 20 }}>
                <div className="font-rajdhani" style={{ fontSize: 12, textTransform: 'uppercase', color: '#8888a8', marginBottom: 8 }}>{e.month}</div>
                <div className="font-orbitron" style={{ fontSize: 28, fontWeight: 800, color: '#22c55e', marginBottom: 12 }}>{e.amount}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div className="font-exo" style={{ fontSize: 11, color: '#555570', marginBottom: 2 }}>Reviews</div>
                    <div className="font-orbitron" style={{ fontSize: 16, fontWeight: 700, color: '#00f0ff' }}>{e.reviews}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="font-exo" style={{ fontSize: 11, color: '#555570', marginBottom: 2 }}>Avg Rating</div>
                    <div className="font-orbitron" style={{ fontSize: 16, fontWeight: 700, color: '#ffd700', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={12} fill="#ffd700" /> {e.avgRating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Anim>
      )}

      {/* Completed Tab */}
      {activeTab === 'completed' && (
        <Anim delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {completedReviews.map(r => (
              <div key={r.id} className="ix-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <CheckCircle size={16} color="#22c55e" />
                      <span className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700 }}>{r.player}</span>
                      <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>· {r.hero}</span>
                    </div>
                    <p className="font-exo" style={{ fontSize: 12, color: '#555570', fontStyle: 'italic' }}>"{r.feedback}"</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, color: '#ffd700', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={14} fill="#ffd700" color="#ffd700" />
                        ))}
                      </div>
                      <div className="font-exo" style={{ fontSize: 10, color: '#555570' }}>{r.completedAt}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Anim>
      )}

      {/* Review Modal */}
      {selectedReview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedReview(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="ix-card ix-border-gradient"
            style={{ maxWidth: 900, width: '100%', maxHeight: '90vh', overflow: 'auto', padding: 24 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 className="font-orbitron" style={{ fontSize: 20, fontWeight: 800 }}>Review Session</h2>
              <button onClick={() => setSelectedReview(null)} style={{ background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer', fontSize: 24 }}>×</button>
            </div>

            {/* Video Player */}
            <div style={{ marginBottom: 20, borderRadius: 12, overflow: 'hidden', background: '#000', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Video size={48} color="#00f0ff" opacity={0.3} />
            </div>

            {/* Player Info */}
            <div className="ix-card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                <div>
                  <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Player</div>
                  <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700 }}>{selectedReview.player}</div>
                </div>
                <div>
                  <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Hero</div>
                  <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, color: '#00f0ff' }}>{selectedReview.hero}</div>
                </div>
                <div>
                  <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Role</div>
                  <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700 }}>{selectedReview.role}</div>
                </div>
                <div>
                  <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Rank</div>
                  <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700 }}>{selectedReview.rank}</div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div>
              <label className="font-rajdhani" style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', color: '#8888a8', marginBottom: 8 }}>Review Feedback</label>
              <textarea
                placeholder="Write detailed feedback here..."
                className="font-exo"
                style={{
                  width: '100%', minHeight: 120, padding: 12, borderRadius: 8,
                  border: '1px solid rgba(0,240,255,0.15)', background: '#12121a',
                  color: '#e8e8f0', fontSize: 13, outline: 'none', resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="font-rajdhani" style={{
                flex: 1, padding: '12px', borderRadius: 8, border: 'none',
                background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer'
              }}>
                Submit Review
              </button>
              <button onClick={() => setSelectedReview(null)} className="font-rajdhani" style={{
                padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: '#8888a8',
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer'
              }}>
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
