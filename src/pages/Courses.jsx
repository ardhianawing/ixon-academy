import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen, Play, Clock, Star, Lock, CheckCircle2,
  ChevronRight, ChevronLeft, BarChart3, Award, Users
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

const roles = [
  { id: 'jungler', name: 'Jungler', icon: '🌿', color: '#22c55e', courses: 8, enrolled: 342 },
  { id: 'goldlane', name: 'Gold Laner', icon: '💰', color: '#ffd700', courses: 7, enrolled: 287 },
  { id: 'midlane', name: 'Mid Laner', icon: '🔮', color: '#a855f7', courses: 6, enrolled: 256 },
  { id: 'roamer', name: 'Roamer', icon: '🛡️', color: '#00f0ff', courses: 7, enrolled: 198 },
  { id: 'explane', name: 'EXP Laner', icon: '⚔️', color: '#ff2d55', courses: 6, enrolled: 221 },
  { id: 'general', name: 'General', icon: '📋', color: '#f97316', courses: 5, enrolled: 512 },
]

const courses = {
  jungler: [
    { id: 1, title: 'Jungle Pathing Fundamentals', level: 'Beginner', duration: '2h 30m', lessons: 8, progress: 100, rating: 4.8, students: 234 },
    { id: 2, title: 'Ganking Timing & Execution', level: 'Beginner', duration: '3h 15m', lessons: 10, progress: 100, rating: 4.9, students: 198 },
    { id: 3, title: 'Counter-Jungling Strategy', level: 'Intermediate', duration: '2h 45m', lessons: 7, progress: 65, rating: 4.7, students: 156 },
    { id: 4, title: 'Lord & Turtle Control', level: 'Intermediate', duration: '2h', lessons: 6, progress: 30, rating: 4.6, students: 142 },
    { id: 5, title: 'Advanced Jungle Rotations', level: 'Advanced', duration: '3h 30m', lessons: 12, progress: 0, rating: 4.9, students: 89, locked: false },
    { id: 6, title: 'Pro Jungle Mindset', level: 'Advanced', duration: '2h', lessons: 8, progress: 0, rating: 5.0, students: 67, locked: true },
  ],
}

const lessons = [
  { id: 1, title: 'Intro: Apa Itu Jungle Pathing?', duration: '8:30', done: true },
  { id: 2, title: 'Red vs Blue Start — Kapan & Kenapa', duration: '12:15', done: true },
  { id: 3, title: 'Timing Clear Speed Optimal', duration: '15:00', done: true },
  { id: 4, title: 'Reading Lane State from Jungle', duration: '10:45', done: false, current: true },
  { id: 5, title: 'Invade vs Safe Farm Decision', duration: '11:30', done: false },
  { id: 6, title: 'Pathing Adjustment Based on Draft', duration: '14:00', done: false },
  { id: 7, title: 'Mini Quiz: Pathing Scenarios', duration: '5:00', done: false, quiz: true },
  { id: 8, title: 'Final Assessment', duration: '10:00', done: false, quiz: true },
]

const levelColors = { Beginner: '#22c55e', Intermediate: '#ffd700', Advanced: '#ff2d55' }

export default function Courses() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Course Detail View
  if (selectedCourse) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
        <button onClick={() => setSelectedCourse(null)} className="font-rajdhani"
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          <ChevronLeft size={16} /> Back to Courses
        </button>

        {/* Video Player Placeholder */}
        <Anim>
          <div style={{
            width: '100%', aspectRatio: '16/9', borderRadius: 12, marginBottom: 20,
            background: 'linear-gradient(135deg, #1a1a2e, #12121a)',
            border: '1px solid rgba(0,240,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(0,240,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.02) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
            <motion.div whileHover={{ scale: 1.1 }} style={{
              width: 70, height: 70, borderRadius: '50%', cursor: 'pointer',
              background: 'rgba(0,240,255,0.15)', border: '2px solid rgba(0,240,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0,240,255,0.2)',
            }}>
              <Play size={30} color="#00f0ff" fill="#00f0ff" />
            </motion.div>
            <div style={{ position: 'absolute', bottom: 12, left: 16 }}>
              <span className="font-rajdhani" style={{ fontSize: 12, color: '#8888a8', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 4 }}>
                Lesson 4 of 8
              </span>
            </div>
          </div>
        </Anim>

        <Anim delay={0.05}>
          <h1 className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{selectedCourse.title}</h1>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={12} /> {selectedCourse.duration}
            </span>
            <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <BookOpen size={12} /> {selectedCourse.lessons} Lessons
            </span>
            <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Star size={12} color="#ffd700" /> {selectedCourse.rating}
            </span>
            <span className="font-exo" style={{ fontSize: 12, color: levelColors[selectedCourse.level] }}>
              {selectedCourse.level}
            </span>
          </div>
        </Anim>

        {/* Progress */}
        <Anim delay={0.1}>
          <div className="ix-card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span className="font-rajdhani" style={{ fontSize: 13, fontWeight: 600 }}>Progress</span>
              <span className="font-exo" style={{ fontSize: 12, color: '#00f0ff' }}>{selectedCourse.progress}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: '#1a1a2e', overflow: 'hidden' }}>
              <div style={{ width: `${selectedCourse.progress}%`, height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #00f0ff, #0088cc)' }} />
            </div>
          </div>
        </Anim>

        {/* Lesson List */}
        <Anim delay={0.15}>
          <div className="ix-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(0,240,255,0.08)' }}>
              <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase' }}>Lessons</span>
            </div>
            {lessons.map((l, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                background: l.current ? 'rgba(0,240,255,0.05)' : 'transparent',
                borderLeft: l.current ? '3px solid #00f0ff' : '3px solid transparent',
                cursor: 'pointer',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: l.done ? 'rgba(34,197,94,0.15)' : l.current ? 'rgba(0,240,255,0.15)' : 'rgba(85,85,112,0.15)',
                  border: `1px solid ${l.done ? '#22c55e40' : l.current ? '#00f0ff40' : '#55557040'}`,
                }}>
                  {l.done ? <CheckCircle2 size={14} color="#22c55e" /> :
                    l.quiz ? <BarChart3 size={14} color={l.current ? '#00f0ff' : '#555570'} /> :
                    <Play size={12} color={l.current ? '#00f0ff' : '#555570'} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="font-exo" style={{ fontSize: 13, color: l.done ? '#8888a8' : '#e8e8f0' }}>{l.title}</div>
                </div>
                <span className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{l.duration}</span>
              </div>
            ))}
          </div>
        </Anim>
      </div>
    )
  }

  // Course List View
  if (selectedRole) {
    const roleData = roles.find(r => r.id === selectedRole)
    const courselist = courses[selectedRole] || courses.jungler
    return (
      <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
        <button onClick={() => setSelectedRole(null)} className="font-rajdhani"
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          <ChevronLeft size={16} /> All Roles
        </button>
        <Anim>
          <div style={{ marginBottom: 24 }}>
            <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800 }}>
              <span style={{ marginRight: 8 }}>{roleData.icon}</span>{roleData.name}
            </h1>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>{roleData.courses} courses · {roleData.enrolled} students enrolled</p>
          </div>
        </Anim>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {courselist.map((c, i) => (
            <Anim key={i} delay={i * 0.05}>
              <motion.div whileHover={{ x: 4 }}
                onClick={() => !c.locked && setSelectedCourse(c)}
                className="ix-card" style={{
                  padding: 16, display: 'flex', gap: 14, alignItems: 'center', cursor: c.locked ? 'default' : 'pointer',
                  opacity: c.locked ? 0.5 : 1,
                }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                  background: `${levelColors[c.level]}12`, border: `1px solid ${levelColors[c.level]}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {c.locked ? <Lock size={20} color="#555570" /> : <BookOpen size={20} color={levelColors[c.level]} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{c.title}</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <span className="font-exo" style={{ fontSize: 11, color: levelColors[c.level] }}>{c.level}</span>
                    <span className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{c.duration}</span>
                    <span className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{c.lessons} lessons</span>
                    <span className="font-exo" style={{ fontSize: 11, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Star size={10} color="#ffd700" /> {c.rating}
                    </span>
                  </div>
                  {c.progress > 0 && (
                    <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: '#1a1a2e', overflow: 'hidden', maxWidth: 200 }}>
                      <div style={{ width: `${c.progress}%`, height: '100%', borderRadius: 2, background: c.progress === 100 ? '#22c55e' : '#00f0ff' }} />
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {c.progress === 100 ? <CheckCircle2 size={20} color="#22c55e" /> :
                    c.progress > 0 ? <span className="font-orbitron" style={{ fontSize: 14, color: '#00f0ff' }}>{c.progress}%</span> :
                    <ChevronRight size={18} color="#555570" />}
                </div>
              </motion.div>
            </Anim>
          ))}
        </div>
      </div>
    )
  }

  // Role Selection View
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 900, margin: '0 auto', padding: '80px 16px 40px' }}>
      <Anim>
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Courses</h1>
          <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Kurikulum terstruktur per role — pilih jalurmu</p>
        </div>
      </Anim>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {roles.map((r, i) => (
          <Anim key={i} delay={i * 0.06}>
            <motion.div whileHover={{ y: -4 }} onClick={() => setSelectedRole(r.id)}
              className="ix-card" style={{ padding: 20, cursor: 'pointer' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{r.icon}</div>
              <h3 className="font-rajdhani" style={{ fontSize: 20, fontWeight: 700, color: r.color, marginBottom: 4 }}>{r.name}</h3>
              <div style={{ display: 'flex', gap: 16 }}>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <BookOpen size={12} /> {r.courses} courses
                </span>
                <span className="font-exo" style={{ fontSize: 12, color: '#8888a8', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={12} /> {r.enrolled}
                </span>
              </div>
            </motion.div>
          </Anim>
        ))}
      </div>
    </div>
  )
}
