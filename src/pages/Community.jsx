import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MessageSquare, ThumbsUp, Eye, Star, TrendingUp,
  Filter, Search, Award, ChevronUp, Pin, Shield
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

const posts = [
  {
    id: 1, pinned: true,
    author: 'Coach Raven', role: 'Coach', tier: 'staff', avatar: '🦅',
    title: 'META Update Patch 1.8.44 — Apa yang Berubah?',
    preview: 'Patch terbaru membawa perubahan besar untuk jungle role. Berikut breakdown lengkap dan bagaimana kalian harus adaptasi...',
    tags: ['Meta', 'Patch Notes', 'Jungle'],
    upvotes: 128, comments: 47, views: 892, time: '6 jam lalu',
  },
  {
    id: 2,
    author: 'ShadowKing', role: 'Jungler', tier: 'Platinum', avatar: '👑', reputation: 94,
    title: 'Tips Push Rank Mythical Glory — Dari Pengalaman 3 Season',
    preview: 'Banyak yang nanya gimana caranya konsisten di MG. Kunci utamanya bukan di mechanical skill, tapi di decision making dan mental...',
    tags: ['Tips', 'Rank', 'Mindset'],
    upvotes: 96, comments: 34, views: 567, time: '12 jam lalu',
  },
  {
    id: 3,
    author: 'AceMLBB', role: 'Gold Laner', tier: 'Platinum', avatar: '🎯', reputation: 91,
    title: 'Claude vs Moskov: Kapan Pick yang Mana?',
    preview: 'Kedua hero ini sering di-contest. Mari kita breakdown kelebihan masing-masing berdasarkan draft composition...',
    tags: ['Hero Guide', 'Gold Lane', 'Draft'],
    upvotes: 73, comments: 28, views: 423, time: '1 hari lalu',
  },
  {
    id: 4,
    author: 'ProdigyX', role: 'Jungler', tier: 'Gold', avatar: '🔥', reputation: 72, isYou: true,
    title: 'Review hasil coaching — improvement plan minggu ini',
    preview: 'Baru selesai review dari Coach Raven. Ternyata jungle pathing gw masih kurang optimal di early game. Ini breakdown yang gw dapet...',
    tags: ['Review', 'Improvement', 'Jungle'],
    upvotes: 34, comments: 12, views: 198, time: '2 hari lalu',
  },
  {
    id: 5,
    author: 'NightFury', role: 'Roamer', tier: 'Platinum', avatar: '🌙', reputation: 89,
    title: 'Vision Control 101 — Guide Lengkap Roamer',
    preview: 'Roamer bukan cuma soal protect carry. Vision control yang baik bisa menentukan outcome teamfight bahkan sebelum dimulai...',
    tags: ['Roamer', 'Guide', 'Vision'],
    upvotes: 61, comments: 19, views: 345, time: '3 hari lalu',
  },
]

const tierBadgeColors = {
  Platinum: { bg: 'rgba(0,240,255,0.1)', color: '#00f0ff', border: 'rgba(0,240,255,0.3)' },
  Gold: { bg: 'rgba(255,215,0,0.1)', color: '#ffd700', border: 'rgba(255,215,0,0.3)' },
  Silver: { bg: 'rgba(192,192,192,0.1)', color: '#c0c0c0', border: 'rgba(192,192,192,0.3)' },
  staff: { bg: 'rgba(255,45,85,0.1)', color: '#ff2d55', border: 'rgba(255,45,85,0.3)' },
}

export default function Community() {
  const [tab, setTab] = useState('trending')

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 800, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Community</h1>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Diskusi berkualitas dari pemain serius</p>
          </div>
          <button className="font-rajdhani" style={{
            padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
            fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
          }}>
            + New Post
          </button>
        </div>
      </Anim>

      {/* Tabs */}
      <Anim delay={0.05}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflow: 'auto' }}>
          {['trending', 'newest', 'top', 'unanswered'].map(t => (
            <button key={t} onClick={() => setTab(t)} className="font-rajdhani"
              style={{
                padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                background: tab === t ? 'rgba(0,240,255,0.1)' : 'transparent',
                color: tab === t ? '#00f0ff' : '#8888a8',
              }}>
              {t === 'trending' && <TrendingUp size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
              {t}
            </button>
          ))}
        </div>
      </Anim>

      {/* Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {posts.map((p, i) => (
          <Anim key={p.id} delay={i * 0.05}>
            <motion.div whileHover={{ x: 3 }} className="ix-card" style={{
              padding: 18, cursor: 'pointer',
              borderLeft: p.isYou ? '3px solid #00f0ff' : p.pinned ? '3px solid #ff2d55' : '3px solid transparent',
            }}>
              {p.pinned && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                  <Pin size={12} color="#ff2d55" />
                  <span className="font-rajdhani" style={{ fontSize: 10, color: '#ff2d55', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pinned</span>
                </div>
              )}
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {p.avatar}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700 }}>{p.author}</span>
                    {(() => {
                      const b = tierBadgeColors[p.tier]
                      return b ? (
                        <span style={{
                          padding: '1px 6px', borderRadius: 3, fontSize: 9,
                          fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                          background: b.bg, color: b.color, border: `1px solid ${b.border}`,
                          textTransform: 'uppercase',
                        }}>{p.tier === 'staff' ? 'Coach' : p.tier}</span>
                      ) : null
                    })()}
                    {p.reputation && (
                      <span className="font-exo" style={{ fontSize: 10, color: '#8888a8' }}>
                        Rep: {p.reputation}
                      </span>
                    )}
                  </div>
                  <span className="font-exo" style={{ fontSize: 10, color: '#555570' }}>{p.role} · {p.time}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
              <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', lineHeight: 1.5, marginBottom: 10 }}>{p.preview}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                {p.tags.map((t, ti) => (
                  <span key={ti} style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 10,
                    fontFamily: 'Exo 2, sans-serif', background: 'rgba(0,240,255,0.06)',
                    color: '#00f0ff', border: '1px solid rgba(0,240,255,0.12)',
                  }}>{t}</span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 16 }}>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ChevronUp size={14} color="#22c55e" /> {p.upvotes}
                </span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MessageSquare size={12} /> {p.comments}
                </span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Eye size={12} /> {p.views}
                </span>
              </div>
            </motion.div>
          </Anim>
        ))}
      </div>
    </div>
  )
}
