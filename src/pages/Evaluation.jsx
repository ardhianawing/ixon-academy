import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Target, Upload, Clock, CheckCircle2, Star, MessageSquare,
  ChevronRight, AlertCircle, TrendingUp, FileVideo, BarChart3
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

const pastReviews = [
  {
    id: 1, status: 'completed', date: '2 hari lalu', coach: 'Coach Raven',
    title: 'Ranked Game — Ling Jungle', overallScore: 3.8,
    scores: { macro: 4, micro: 3, farming: 4, teamfight: 3, mapAwareness: 5 },
    feedback: 'Jungle pathing sudah bagus di early game, tapi rotasi mid-game masih perlu improvement. Map awareness excellent — kamu selalu cek minimap. Focus on: timing gank setelah turtle spawn.',
    actions: ['Latihan timing gank post-turtle 3x sehari', 'Review replay menit 5-8 di setiap game'],
    playerRating: null,
  },
  {
    id: 2, status: 'completed', date: '1 minggu lalu', coach: 'Coach Phantom',
    title: 'Ranked Game — Fanny Jungle', overallScore: 3.2,
    scores: { macro: 3, micro: 4, farming: 3, teamfight: 3, mapAwareness: 3 },
    feedback: 'Mechanical skill Fanny sudah di atas rata-rata, tapi cable usage terlalu agresif tanpa vision. Perlu balance antara aggression dan safety.',
    actions: ['Pasang ward sebelum engage', 'Hitung cooldown CC musuh sebelum masuk'],
    playerRating: 4,
  },
]

const queueInfo = { position: 3, estimated: '~6 jam', coachAssigned: 'Coach Raven' }

export default function Evaluation() {
  const [tab, setTab] = useState('submit')
  const [selectedReview, setSelectedReview] = useState(null)

  // Review Detail
  if (selectedReview) {
    const r = selectedReview
    return (
      <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 800, margin: '0 auto', padding: '80px 16px 40px' }}>
        <button onClick={() => setSelectedReview(null)} className="font-rajdhani"
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          ← Back
        </button>

        <Anim>
          <div className="ix-card" style={{ padding: 20, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <h2 className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{r.title}</h2>
                <p className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Reviewed by {r.coach} · {r.date}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="font-orbitron" style={{ fontSize: 32, fontWeight: 900, color: r.overallScore >= 4 ? '#22c55e' : r.overallScore >= 3 ? '#ffd700' : '#ff2d55' }}>
                  {r.overallScore}
                </div>
                <div className="font-rajdhani" style={{ fontSize: 10, color: '#8888a8', textTransform: 'uppercase' }}>Overall</div>
              </div>
            </div>
          </div>
        </Anim>

        {/* Rubric Scores */}
        <Anim delay={0.05}>
          <div className="ix-card" style={{ padding: 20, marginBottom: 16 }}>
            <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarChart3 size={16} color="#00f0ff" /> Rubrik Evaluasi
            </h3>
            {Object.entries(r.scores).map(([key, val], i) => {
              const labels = { macro: 'Macro Game', micro: 'Micro/Mechanical', farming: 'Farming Efficiency', teamfight: 'Teamfight Positioning', mapAwareness: 'Map Awareness' }
              const color = val >= 4 ? '#22c55e' : val >= 3 ? '#ffd700' : '#ff2d55'
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span className="font-rajdhani" style={{ fontSize: 12, fontWeight: 600, width: 130, color: '#8888a8' }}>{labels[key]}</span>
                  <div style={{ flex: 1, display: 'flex', gap: 4 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <div key={s} style={{
                        flex: 1, height: 8, borderRadius: 4,
                        background: s <= val ? color : '#1a1a2e',
                        transition: 'all 0.3s',
                      }} />
                    ))}
                  </div>
                  <span className="font-orbitron" style={{ fontSize: 13, color, width: 20, textAlign: 'right' }}>{val}</span>
                </div>
              )
            })}
          </div>
        </Anim>

        {/* Feedback */}
        <Anim delay={0.1}>
          <div className="ix-card" style={{ padding: 20, marginBottom: 16 }}>
            <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <MessageSquare size={16} color="#a855f7" /> Coach Feedback
            </h3>
            <p className="font-exo" style={{ fontSize: 13, color: '#e8e8f0', lineHeight: 1.7, background: 'rgba(168,85,247,0.05)', padding: 14, borderRadius: 8, borderLeft: '3px solid #a855f7' }}>
              {r.feedback}
            </p>
          </div>
        </Anim>

        {/* Action Items */}
        <Anim delay={0.15}>
          <div className="ix-card" style={{ padding: 20 }}>
            <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingUp size={16} color="#22c55e" /> Improvement Plan
            </h3>
            {r.actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < r.actions.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span className="font-orbitron" style={{ fontSize: 10, color: '#22c55e' }}>{i + 1}</span>
                </div>
                <span className="font-exo" style={{ fontSize: 13 }}>{a}</span>
              </div>
            ))}
          </div>
        </Anim>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 800, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <div style={{ marginBottom: 20 }}>
          <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Evaluation</h1>
          <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Submit gameplay-mu, dapatkan review profesional</p>
        </div>
      </Anim>

      {/* Tabs */}
      <Anim delay={0.05}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {['submit', 'history'].map(t => (
            <button key={t} onClick={() => setTab(t)} className="font-rajdhani"
              style={{
                padding: '8px 18px', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, textTransform: 'uppercase',
                background: tab === t ? 'rgba(0,240,255,0.1)' : 'transparent',
                color: tab === t ? '#00f0ff' : '#8888a8',
              }}>
              {t === 'submit' ? '📤 Submit' : '📋 History'}
            </button>
          ))}
        </div>
      </Anim>

      {tab === 'submit' ? (
        <>
          {/* Queue Status */}
          <Anim delay={0.1}>
            <div className="ix-card" style={{ padding: 16, marginBottom: 16, borderLeft: '3px solid #ffd700' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Clock size={16} color="#ffd700" />
                <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase' }}>Queue Status</span>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Position: <strong style={{ color: '#ffd700' }}>#{queueInfo.position}</strong></span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Estimated: <strong style={{ color: '#e8e8f0' }}>{queueInfo.estimated}</strong></span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Coach: <strong style={{ color: '#00f0ff' }}>{queueInfo.coachAssigned}</strong></span>
              </div>
            </div>
          </Anim>

          {/* Submit Form */}
          <Anim delay={0.15}>
            <div className="ix-card" style={{ padding: 20 }}>
              <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Submit Gameplay</h3>

              <div style={{ marginBottom: 14 }}>
                <label className="font-rajdhani" style={{ fontSize: 12, fontWeight: 600, color: '#8888a8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                  Link Gameplay (YouTube/Google Drive)
                </label>
                <input type="text" placeholder="https://youtube.com/watch?v=..." style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                  background: '#12121a', color: '#e8e8f0', fontFamily: 'Exo 2, sans-serif', fontSize: 13,
                  outline: 'none',
                }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="font-rajdhani" style={{ fontSize: 12, fontWeight: 600, color: '#8888a8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                  Hero yang Dipakai
                </label>
                <input type="text" placeholder="e.g. Ling" style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                  background: '#12121a', color: '#e8e8f0', fontFamily: 'Exo 2, sans-serif', fontSize: 13,
                  outline: 'none',
                }} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="font-rajdhani" style={{ fontSize: 12, fontWeight: 600, color: '#8888a8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                  Catatan untuk Coach (optional)
                </label>
                <textarea rows={3} placeholder="Fokus review yang kamu mau..." style={{
                  width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                  background: '#12121a', color: '#e8e8f0', fontFamily: 'Exo 2, sans-serif', fontSize: 13,
                  outline: 'none', resize: 'vertical',
                }} />
              </div>

              <button className="font-rajdhani" style={{
                width: '100%', padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                fontSize: 14, fontWeight: 700, textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <Upload size={16} /> Submit for Review
              </button>

              <p className="font-exo" style={{ fontSize: 11, color: '#555570', textAlign: 'center', marginTop: 8 }}>
                Gold tier: 3 review/bulan · Sisa: 2 review
              </p>
            </div>
          </Anim>
        </>
      ) : (
        /* History */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pastReviews.map((r, i) => (
            <Anim key={r.id} delay={i * 0.05}>
              <motion.div whileHover={{ x: 3 }} onClick={() => setSelectedReview(r)}
                className="ix-card" style={{ padding: 16, cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Target size={22} color="#00f0ff" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{r.title}</div>
                  <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{r.coach} · {r.date}</div>
                </div>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, color: r.overallScore >= 4 ? '#22c55e' : '#ffd700' }}>
                    {r.overallScore}
                  </div>
                  <div className="font-rajdhani" style={{ fontSize: 9, color: '#555570', textTransform: 'uppercase' }}>Score</div>
                </div>
                <ChevronRight size={16} color="#555570" />
              </motion.div>
            </Anim>
          ))}
        </div>
      )}
    </div>
  )
}
