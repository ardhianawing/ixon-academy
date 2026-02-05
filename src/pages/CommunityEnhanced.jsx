import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, ThumbsUp, Eye, TrendingUp, Filter, Search, Award,
  ChevronUp, ChevronDown, Pin, Shield, X, Send, Image, Link2,
  Bold, Italic, List, BookmarkPlus, Share2, MoreHorizontal
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
    content: 'Patch terbaru membawa perubahan besar untuk jungle role. Berikut breakdown lengkap dan bagaimana kalian harus adaptasi...\n\nPerubahan utama:\n1. Jungle camp respawn time dikurangi 5 detik\n2. Buff duration ditambah 10 detik\n3. Gold dari neutral creeps naik 10%\n\nImpact:\n- Farming lebih cepat = level advantage lebih mudah didapat\n- Perlu adjust rotation untuk maximize farm efficiency\n- Early game aggression menjadi lebih rewarding',
    tags: ['Meta', 'Patch Notes', 'Jungle'],
    upvotes: 128, upvoted: false, comments: [], views: 892, time: '6 jam lalu',
  },
  {
    id: 2,
    author: 'ShadowKing', role: 'Jungler', tier: 'Platinum', avatar: '👑', reputation: 94,
    title: 'Tips Push Rank Mythical Glory — Dari Pengalaman 3 Season',
    content: 'Banyak yang nanya gimana caranya konsisten di MG. Kunci utamanya bukan di mechanical skill, tapi di decision making dan mental.\n\nTips yang gw praktekin:\n1. Pick hero yang lo master (min 100 match)\n2. Jangan toxic - mental team lebih penting dari skill\n3. Review replay setiap loss\n4. Break 30 menit setelah 2x lose streak\n5. Main di jam-jam prime (7-10 malam)',
    tags: ['Tips', 'Rank', 'Mindset'],
    upvotes: 96, upvoted: true, comments: [], views: 567, time: '12 jam lalu',
  },
  {
    id: 3,
    author: 'AceMLBB', role: 'Gold Laner', tier: 'Platinum', avatar: '🎯', reputation: 91,
    title: 'Claude vs Moskov: Kapan Pick yang Mana?',
    content: 'Kedua hero ini sering di-contest. Mari kita breakdown kelebihan masing-masing berdasarkan draft composition.\n\nPick Claude when:\n- Enemy punya banyak CC (Claude punya dash immune)\n- Team butuh damage dealer yang safe\n- Late game oriented\n\nPick Moskov when:\n- Enemy team squishy\n- Butuh early pressure\n- Map control important',
    tags: ['Hero Guide', 'Gold Lane', 'Draft'],
    upvotes: 73, upvoted: false, comments: [], views: 423, time: '1 hari lalu',
  },
]

const tierBadgeColors = {
  Platinum: { bg: 'rgba(0,240,255,0.1)', color: '#00f0ff', border: 'rgba(0,240,255,0.3)' },
  Gold: { bg: 'rgba(255,215,0,0.1)', color: '#ffd700', border: 'rgba(255,215,0,0.3)' },
  Silver: { bg: 'rgba(192,192,192,0.1)', color: '#c0c0c0', border: 'rgba(192,192,192,0.3)' },
  staff: { bg: 'rgba(255,45,85,0.1)', color: '#ff2d55', border: 'rgba(255,45,85,0.3)' },
}

const mockComments = [
  { id: 1, author: 'ProdigyX', avatar: '🔥', content: 'Setuju banget! Point nomor 2 especially penting. Toxic player = auto lose.', time: '8 jam lalu', tier: 'Gold', upvotes: 12 },
  { id: 2, author: 'NightFury', avatar: '🌙', content: 'Gw praktekin semua tips ini dan dalam 1 bulan naik dari Legend ke MG. Works!', time: '10 jam lalu', tier: 'Platinum', upvotes: 8 },
  { id: 3, author: 'BlazeFire', avatar: '⚡', content: 'Untuk point 5, gw malah dapet lebih banyak quality match di pagi hari (8-10 am). Mungkin tergantung region?', time: '11 jam lalu', tier: 'Gold', upvotes: 5 },
]

export default function Community() {
  const [tab, setTab] = useState('trending')
  const [selectedPost, setSelectedPost] = useState(null)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [postData, setPostData] = useState({ title: '', content: '', tags: '' })
  const [commentText, setCommentText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [localPosts, setLocalPosts] = useState(posts)

  const handleUpvote = (postId) => {
    setLocalPosts(localPosts.map(p => {
      if (p.id === postId) {
        return { ...p, upvoted: !p.upvoted, upvotes: p.upvoted ? p.upvotes - 1 : p.upvotes + 1 }
      }
      return p
    }))
  }

  const handleComment = () => {
    if (!commentText.trim()) return
    // Mock add comment
    setCommentText('')
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 800, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Community</h1>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Diskusi berkualitas dari pemain serius</p>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="font-rajdhani"
            style={{
              padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
              fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
            }}
          >
            + New Post
          </button>
        </div>
      </Anim>

      {/* Search & Filter */}
      <Anim delay={0.05}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
            <Search size={16} color="#555570" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search discussions..."
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
          <button className="font-rajdhani" style={{
            padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
            background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
          }}>
            <Filter size={14} /> Filter
          </button>
        </div>
      </Anim>

      {/* Tabs */}
      <Anim delay={0.07}>
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
      {!selectedPost ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {localPosts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.content.toLowerCase().includes(searchTerm.toLowerCase())).map((p, i) => (
            <Anim key={p.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ x: 3 }}
                onClick={() => setSelectedPost(p)}
                className="ix-card"
                style={{
                  padding: 18, cursor: 'pointer',
                  borderLeft: p.pinned ? '3px solid #ff2d55' : '3px solid transparent',
                }}
              >
                {p.pinned && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                    <Pin size={12} color="#ff2d55" />
                    <span className="font-rajdhani" style={{ fontSize: 10, color: '#ff2d55', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pinned</span>
                  </div>
                )}
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

                <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
                <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', lineHeight: 1.5, marginBottom: 10 }}>
                  {p.content.substring(0, 150)}...
                </p>

                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  {p.tags.map((t, ti) => (
                    <span key={ti} style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 10,
                      fontFamily: 'Exo 2, sans-serif', background: 'rgba(0,240,255,0.06)',
                      color: '#00f0ff', border: '1px solid rgba(0,240,255,0.12)',
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleUpvote(p.id); }}
                    className="font-exo"
                    style={{
                      fontSize: 12, background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 4,
                      color: p.upvoted ? '#22c55e' : '#8888a8'
                    }}
                  >
                    <ChevronUp size={14} /> {p.upvotes}
                  </button>
                  <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MessageSquare size={12} /> {mockComments.length}
                  </span>
                  <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Eye size={12} /> {p.views}
                  </span>
                </div>
              </motion.div>
            </Anim>
          ))}
        </div>
      ) : (
        /* Post Detail */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={() => setSelectedPost(null)}
            className="font-rajdhani"
            style={{ background: 'none', border: 'none', color: '#00f0ff', fontSize: 13, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}
          >
            ← Back to community
          </button>

          <div className="ix-card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {selectedPost.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700 }}>{selectedPost.author}</span>
                  {(() => {
                    const b = tierBadgeColors[selectedPost.tier]
                    return b && (
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 10,
                        fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                        background: b.bg, color: b.color, border: `1px solid ${b.border}`,
                        textTransform: 'uppercase',
                      }}>{selectedPost.tier === 'staff' ? 'Coach' : selectedPost.tier}</span>
                    )
                  })()}
                </div>
                <span className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{selectedPost.role} · {selectedPost.time}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer' }}>
                  <BookmarkPlus size={20} />
                </button>
                <button style={{ background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer' }}>
                  <Share2 size={20} />
                </button>
                <button style={{ background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer' }}>
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{selectedPost.title}</h1>

            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
              {selectedPost.tags.map((t, ti) => (
                <span key={ti} style={{
                  padding: '3px 10px', borderRadius: 4, fontSize: 11,
                  fontFamily: 'Exo 2, sans-serif', background: 'rgba(0,240,255,0.06)',
                  color: '#00f0ff', border: '1px solid rgba(0,240,255,0.12)',
                }}>{t}</span>
              ))}
            </div>

            <div className="font-exo" style={{ fontSize: 14, color: '#e8e8f0', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: 20 }}>
              {selectedPost.content}
            </div>

            <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => handleUpvote(selectedPost.id)}
                className="font-exo"
                style={{
                  fontSize: 13, background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: selectedPost.upvoted ? '#22c55e' : '#8888a8'
                }}
              >
                <ChevronUp size={16} /> {selectedPost.upvotes} Upvotes
              </button>
              <span className="font-exo" style={{ fontSize: 13, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MessageSquare size={14} /> {mockComments.length} Comments
              </span>
              <span className="font-exo" style={{ fontSize: 13, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={14} /> {selectedPost.views} Views
              </span>
            </div>
          </div>

          {/* Comments */}
          <div className="ix-card" style={{ padding: 20, marginBottom: 16 }}>
            <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Comments ({mockComments.length})</h3>

            {mockComments.map((c, i) => (
              <div key={c.id} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < mockComments.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                    {c.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700 }}>{c.author}</span>
                      {(() => {
                        const b = tierBadgeColors[c.tier]
                        return b && (
                          <span style={{
                            padding: '1px 6px', borderRadius: 3, fontSize: 9,
                            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                            background: b.bg, color: b.color, border: `1px solid ${b.border}`,
                            textTransform: 'uppercase',
                          }}>{c.tier}</span>
                        )
                      })()}
                      <span className="font-exo" style={{ fontSize: 10, color: '#555570' }}>· {c.time}</span>
                    </div>
                    <p className="font-exo" style={{ fontSize: 13, color: '#e8e8f0', lineHeight: 1.6, marginBottom: 6 }}>{c.content}</p>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button className="font-exo" style={{ fontSize: 11, background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <ChevronUp size={12} /> {c.upvotes}
                      </button>
                      <button className="font-exo" style={{ fontSize: 11, background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer' }}>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="font-exo"
                style={{
                  width: '100%', minHeight: 80, padding: 12, borderRadius: 8,
                  border: '1px solid rgba(0,240,255,0.15)', background: '#12121a',
                  color: '#e8e8f0', fontSize: 13, outline: 'none', resize: 'vertical', marginBottom: 10
                }}
              />
              <button
                onClick={handleComment}
                className="font-rajdhani"
                style={{
                  padding: '8px 20px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                  fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <Send size={14} /> Post Comment
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreatePost(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="ix-card ix-border-gradient"
              style={{ maxWidth: 700, width: '100%', maxHeight: '90vh', overflow: 'auto', padding: 24 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 className="font-orbitron" style={{ fontSize: 20, fontWeight: 800 }}>Create New Post</h2>
                <button onClick={() => setShowCreatePost(false)} style={{ background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer', fontSize: 24 }}>×</button>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Title</label>
                <input
                  type="text"
                  value={postData.title}
                  onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                  placeholder="e.g. Tips Push Rank ke Mythical Glory"
                  className="font-exo"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                    background: '#12121a', color: '#e8e8f0', fontSize: 14, outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Content</label>
                <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
                  <button style={{ padding: 6, borderRadius: 4, border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#8888a8', cursor: 'pointer' }}>
                    <Bold size={14} />
                  </button>
                  <button style={{ padding: 6, borderRadius: 4, border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#8888a8', cursor: 'pointer' }}>
                    <Italic size={14} />
                  </button>
                  <button style={{ padding: 6, borderRadius: 4, border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#8888a8', cursor: 'pointer' }}>
                    <List size={14} />
                  </button>
                  <button style={{ padding: 6, borderRadius: 4, border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#8888a8', cursor: 'pointer' }}>
                    <Image size={14} />
                  </button>
                  <button style={{ padding: 6, borderRadius: 4, border: '1px solid rgba(0,240,255,0.2)', background: 'rgba(0,240,255,0.05)', color: '#8888a8', cursor: 'pointer' }}>
                    <Link2 size={14} />
                  </button>
                </div>
                <textarea
                  value={postData.content}
                  onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                  placeholder="Share your knowledge, tips, or questions..."
                  className="font-exo"
                  style={{
                    width: '100%', minHeight: 200, padding: 12, borderRadius: 8,
                    border: '1px solid rgba(0,240,255,0.15)', background: '#12121a',
                    color: '#e8e8f0', fontSize: 13, outline: 'none', resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Tags (comma separated)</label>
                <input
                  type="text"
                  value={postData.tags}
                  onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
                  placeholder="e.g. Tips, Rank, Jungle"
                  className="font-exo"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                    background: '#12121a', color: '#e8e8f0', fontSize: 13, outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => {
                    // Mock post creation
                    setShowCreatePost(false)
                    setPostData({ title: '', content: '', tags: '' })
                  }}
                  className="font-rajdhani"
                  style={{
                    flex: 1, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                    fontSize: 13, fontWeight: 700, textTransform: 'uppercase'
                  }}
                >
                  Publish Post
                </button>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="font-rajdhani"
                  style={{
                    padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent', color: '#8888a8', fontSize: 13, fontWeight: 700,
                    textTransform: 'uppercase', cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
