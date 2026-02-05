import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Play, Clock, Users, Star, Award, CheckCircle, Lock, BookOpen,
  Video, FileText, Target, TrendingUp, ChevronRight, ChevronDown,
  MessageSquare, Download, Share2
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

// Mock Course Data
const mockCourses = {
  1: {
    id: 1,
    title: 'Mastering Jungle Rotations',
    instructor: 'Coach Raven',
    instructorAvatar: '🦅',
    rating: 4.8,
    students: 234,
    duration: '4.5 hours',
    level: 'Intermediate',
    price: 'Free with Gold+',
    description: 'Master the art of jungle rotations and macro plays. Learn optimal farming routes, gank timing, and objective control.',
    objectives: [
      'Understand jungle mechanics and camp timings',
      'Master optimal rotation patterns',
      'Learn when to gank vs farm',
      'Coordinate with team for objectives',
      'Adapt rotation based on enemy jungle'
    ],
    curriculum: [
      {
        module: 'Fundamentals',
        lessons: [
          { id: 1, title: 'Introduction to Jungle Role', duration: '8:24', type: 'video', completed: true, locked: false },
          { id: 2, title: 'Understanding Camp Timings', duration: '12:35', type: 'video', completed: true, locked: false },
          { id: 3, title: 'Quiz: Basic Concepts', duration: '5 questions', type: 'quiz', completed: false, locked: false }
        ]
      },
      {
        module: 'Early Game Rotations',
        lessons: [
          { id: 4, title: 'Level 1-4 Farming Routes', duration: '15:42', type: 'video', completed: false, locked: false },
          { id: 5, title: 'First Buff Strategy', duration: '10:18', type: 'video', completed: false, locked: false },
          { id: 6, title: 'Early Gank Opportunities', duration: '14:20', type: 'video', completed: false, locked: true },
          { id: 7, title: 'Quiz: Early Game', duration: '8 questions', type: 'quiz', completed: false, locked: true }
        ]
      },
      {
        module: 'Mid Game Macro',
        lessons: [
          { id: 8, title: 'Objective Control', duration: '18:15', type: 'video', completed: false, locked: true },
          { id: 9, title: 'Turtle Fight Positioning', duration: '12:40', type: 'video', completed: false, locked: true },
          { id: 10, title: 'Counter-Jungling', duration: '16:55', type: 'video', completed: false, locked: true }
        ]
      }
    ],
    reviews: [
      { name: 'ProdigyX', rating: 5, comment: 'Best jungle course ever! Naik 300 MMR setelah apply tips ini.', date: '2 hari lalu' },
      { name: 'ShadowKing', rating: 5, comment: 'Coach Raven explains everything clearly. Worth it!', date: '1 minggu lalu' },
      { name: 'BlazeFire', rating: 4, comment: 'Good content, mungkin bisa ditambah lebih banyak hero-specific examples.', date: '2 minggu lalu' }
    ]
  }
}

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [expandedModule, setExpandedModule] = useState(0)
  const course = mockCourses[courseId || 1] || mockCourses[1]

  const totalLessons = course.curriculum.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.curriculum.reduce((acc, module) =>
    acc + module.lessons.filter(l => l.completed).length, 0
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  const getLessonIcon = (type) => {
    switch(type) {
      case 'video': return Video
      case 'quiz': return FileText
      default: return BookOpen
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40 }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(180deg, rgba(0,240,255,0.05) 0%, transparent 100%)', padding: '40px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Anim>
            <button
              onClick={() => navigate('/courses')}
              className="font-rajdhani"
              style={{ background: 'none', border: 'none', color: '#8888a8', fontSize: 13, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              ← Back to courses
            </button>
          </Anim>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32, alignItems: 'start' }}>
            <Anim delay={0.1}>
              <div>
                <h1 className="font-orbitron" style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{course.title}</h1>
                <p className="font-exo" style={{ fontSize: 15, color: '#8888a8', marginBottom: 20, lineHeight: 1.6 }}>{course.description}</p>

                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Star size={16} fill="#ffd700" color="#ffd700" />
                    <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>{course.rating}</span>
                    <span className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>({course.students} students)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={16} color="#00f0ff" />
                    <span className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>{course.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={16} color="#a855f7" />
                    <span className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>{course.level}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(168,85,247,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    {course.instructorAvatar}
                  </div>
                  <div>
                    <div className="font-exo" style={{ fontSize: 11, color: '#555570', textTransform: 'uppercase' }}>Instructor</div>
                    <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700 }}>{course.instructor}</div>
                  </div>
                </div>
              </div>
            </Anim>

            <Anim delay={0.15}>
              <div className="ix-card ix-border-gradient" style={{ padding: 24, position: 'sticky', top: 90 }}>
                <div style={{ marginBottom: 20 }}>
                  <div className="font-exo" style={{ fontSize: 11, color: '#555570', marginBottom: 6 }}>YOUR PROGRESS</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #00f0ff, #0088cc)', borderRadius: 4, transition: 'width 0.3s' }} />
                    </div>
                    <span className="font-orbitron" style={{ fontSize: 16, fontWeight: 800, color: '#00f0ff' }}>{progress}%</span>
                  </div>
                  <div className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>{completedLessons}/{totalLessons} lessons completed</div>
                </div>

                <button
                  onClick={() => navigate(`/learn/${courseId || 1}/1`)}
                  className="font-rajdhani"
                  style={{
                    width: '100%', padding: '14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                    fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}
                >
                  <Play size={16} fill="#000" /> {progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="font-rajdhani" style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                    background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}>
                    <Share2 size={14} /> Share
                  </button>
                  <button className="font-rajdhani" style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                    background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}>
                    <Download size={14} /> Resources
                  </button>
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32 }}>
          <div>
            {/* Learning Objectives */}
            <Anim delay={0.2}>
              <div className="ix-card" style={{ padding: 24, marginBottom: 24 }}>
                <h2 className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>What You'll Learn</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {course.objectives.map((obj, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10 }}>
                      <CheckCircle size={18} color="#22c55e" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span className="font-exo" style={{ fontSize: 14, color: '#e8e8f0' }}>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Anim>

            {/* Curriculum */}
            <Anim delay={0.25}>
              <div className="ix-card" style={{ padding: 24 }}>
                <h2 className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Course Curriculum</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {course.curriculum.map((module, moduleIndex) => (
                    <div key={moduleIndex}>
                      <button
                        onClick={() => setExpandedModule(expandedModule === moduleIndex ? -1 : moduleIndex)}
                        style={{
                          width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.1)',
                          background: expandedModule === moduleIndex ? 'rgba(0,240,255,0.05)' : 'rgba(0,0,0,0.2)',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ textAlign: 'left' }}>
                          <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{module.module}</div>
                          <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{module.lessons.length} lessons</div>
                        </div>
                        {expandedModule === moduleIndex ? <ChevronDown size={18} color="#00f0ff" /> : <ChevronRight size={18} color="#8888a8" />}
                      </button>

                      {expandedModule === moduleIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          style={{ paddingLeft: 16, marginTop: 4 }}
                        >
                          {module.lessons.map((lesson) => {
                            const Icon = getLessonIcon(lesson.type)
                            return (
                              <div
                                key={lesson.id}
                                style={{
                                  padding: '12px 16px', borderLeft: '2px solid rgba(0,240,255,0.2)',
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                  opacity: lesson.locked ? 0.5 : 1, cursor: lesson.locked ? 'not-allowed' : 'pointer'
                                }}
                                onClick={() => !lesson.locked && navigate(`/learn/${courseId || 1}/${lesson.id}`)}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  {lesson.completed ? (
                                    <CheckCircle size={16} color="#22c55e" />
                                  ) : lesson.locked ? (
                                    <Lock size={16} color="#555570" />
                                  ) : (
                                    <Icon size={16} color="#00f0ff" />
                                  )}
                                  <span className="font-exo" style={{ fontSize: 13 }}>{lesson.title}</span>
                                </div>
                                <span className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{lesson.duration}</span>
                              </div>
                            )
                          })}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Anim>
          </div>

          {/* Reviews Sidebar */}
          <div>
            <Anim delay={0.3}>
              <div className="ix-card" style={{ padding: 20 }}>
                <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Student Reviews</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {course.reviews.map((review, i) => (
                    <div key={i} style={{ paddingBottom: 14, borderBottom: i < course.reviews.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700 }}>{review.name}</span>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={12} fill="#ffd700" color="#ffd700" />
                          ))}
                        </div>
                      </div>
                      <p className="font-exo" style={{ fontSize: 12, color: '#8888a8', lineHeight: 1.5, marginBottom: 4 }}>{review.comment}</p>
                      <span className="font-exo" style={{ fontSize: 10, color: '#555570' }}>{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Anim>
          </div>
        </div>
      </div>
    </div>
  )
}
