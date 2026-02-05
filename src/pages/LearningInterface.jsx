import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward,
  CheckCircle, XCircle, ChevronLeft, ChevronRight, Award, Download
} from 'lucide-react'

// Mock lesson data
const mockLessons = {
  1: {
    id: 1,
    title: 'Introduction to Jungle Role',
    type: 'video',
    duration: '8:24',
    videoUrl: 'mock-video.mp4',
    transcript: 'Welcome to the jungle role mastery course...',
    notes: [
      'Jungle role requires map awareness',
      'Farm efficiency is crucial',
      'Gank timing depends on lane states'
    ]
  },
  2: {
    id: 2,
    title: 'Understanding Camp Timings',
    type: 'video',
    duration: '12:35'
  },
  3: {
    id: 3,
    title: 'Quiz: Basic Concepts',
    type: 'quiz',
    questions: [
      {
        question: 'What is the respawn time for jungle camps?',
        options: ['30 seconds', '45 seconds', '60 seconds', '90 seconds'],
        correct: 1
      },
      {
        question: 'When should you prioritize ganking over farming?',
        options: [
          'When enemy lane is overextended',
          'When your buff is up',
          'When you reach level 4',
          'All of the above'
        ],
        correct: 0
      },
      {
        question: 'Which buff should jungler start with?',
        options: [
          'Always blue buff',
          'Always red buff',
          'Depends on hero and strategy',
          'Doesn\'t matter'
        ],
        correct: 2
      },
      {
        question: 'What is the primary objective of a jungler?',
        options: [
          'Get most kills',
          'Farm all jungle camps',
          'Help team win objectives and lanes',
          'Invade enemy jungle'
        ],
        correct: 2
      },
      {
        question: 'When is the best time to take turtle?',
        options: [
          'After killing 2+ enemies',
          'When your team has lane priority',
          'When enemy jungler is far away',
          'All of the above'
        ],
        correct: 3
      }
    ]
  }
}

export default function LearningInterface() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const lesson = mockLessons[lessonId] || mockLessons[1]

  // Video player state
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const handleQuizSubmit = () => {
    let score = 0
    lesson.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++
      }
    })
    setQuizScore(score)
    setShowResults(true)
  }

  const handleNextLesson = () => {
    const nextLessonId = parseInt(lessonId) + 1
    if (mockLessons[nextLessonId]) {
      navigate(`/learn/${courseId}/${nextLessonId}`)
      setCurrentQuestion(0)
      setSelectedAnswers({})
      setShowResults(false)
    } else {
      navigate(`/courses/${courseId}`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64, background: '#0a0a0f' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', height: 'calc(100vh - 64px)' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Video Player or Quiz */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {lesson.type === 'video' ? (
              <>
                {/* Video Player */}
                <div style={{ flex: 1, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,240,255,0.1)', border: '2px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      {playing ? <Pause size={32} color="#00f0ff" /> : <Play size={32} color="#00f0ff" />}
                    </div>
                    <p className="font-exo" style={{ fontSize: 14, color: '#555570' }}>Video Player Mockup</p>
                  </div>

                  {/* Progress bar */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginBottom: 12, cursor: 'pointer' }}>
                      <div style={{ height: '100%', width: `${progress}%`, background: '#00f0ff', borderRadius: 2 }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button
                          onClick={() => setPlaying(!playing)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}
                        >
                          {playing ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        <button
                          onClick={() => setMuted(!muted)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}
                        >
                          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                        <span className="font-exo" style={{ fontSize: 13, color: '#fff' }}>0:00 / {lesson.duration}</span>
                      </div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                        <Maximize size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lesson Info */}
                <div style={{ padding: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{lesson.title}</h1>

                  {lesson.notes && (
                    <div>
                      <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: '#8888a8', marginBottom: 12 }}>Key Takeaways</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {lesson.notes.map((note, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <CheckCircle size={16} color="#00f0ff" style={{ marginTop: 2, flexShrink: 0 }} />
                            <span className="font-exo" style={{ fontSize: 13, color: '#e8e8f0' }}>{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Quiz Interface */
              <div style={{ flex: 1, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 800, margin: '0 auto', width: '100%' }}>
                {!showResults ? (
                  <>
                    <div style={{ marginBottom: 32 }}>
                      <div className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 12 }}>
                        Question {currentQuestion + 1} of {lesson.questions.length}
                      </div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, marginBottom: 24 }}>
                        <div style={{ height: '100%', width: `${((currentQuestion + 1) / lesson.questions.length) * 100}%`, background: 'linear-gradient(90deg, #00f0ff, #0088cc)', borderRadius: 3, transition: 'width 0.3s' }} />
                      </div>
                      <h2 className="font-rajdhani" style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                        {lesson.questions[currentQuestion].question}
                      </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                      {lesson.questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: index })}
                          className="ix-card"
                          style={{
                            padding: 18, textAlign: 'left', cursor: 'pointer', border: 'none',
                            background: selectedAnswers[currentQuestion] === index
                              ? 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,240,255,0.05))'
                              : undefined,
                            borderColor: selectedAnswers[currentQuestion] === index ? 'rgba(0,240,255,0.4)' : undefined,
                            transition: 'all 0.2s'
                          }}
                        >
                          <span className="font-exo" style={{ fontSize: 15 }}>{option}</span>
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className="font-rajdhani"
                        style={{
                          padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                          background: 'transparent', color: '#00f0ff', fontSize: 13, fontWeight: 700,
                          textTransform: 'uppercase', cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                          opacity: currentQuestion === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: 6
                        }}
                      >
                        <ChevronLeft size={16} /> Previous
                      </button>

                      {currentQuestion < lesson.questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestion(currentQuestion + 1)}
                          disabled={selectedAnswers[currentQuestion] === undefined}
                          className="font-rajdhani"
                          style={{
                            flex: 1, padding: '12px 24px', borderRadius: 8, border: 'none',
                            background: selectedAnswers[currentQuestion] !== undefined
                              ? 'linear-gradient(135deg, #00f0ff, #0088cc)'
                              : 'rgba(255,255,255,0.05)',
                            color: selectedAnswers[currentQuestion] !== undefined ? '#000' : '#555570',
                            fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                            cursor: selectedAnswers[currentQuestion] !== undefined ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                          }}
                        >
                          Next <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length !== lesson.questions.length}
                          className="font-rajdhani"
                          style={{
                            flex: 1, padding: '12px 24px', borderRadius: 8, border: 'none',
                            background: Object.keys(selectedAnswers).length === lesson.questions.length
                              ? 'linear-gradient(135deg, #00f0ff, #0088cc)'
                              : 'rgba(255,255,255,0.05)',
                            color: Object.keys(selectedAnswers).length === lesson.questions.length ? '#000' : '#555570',
                            fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
                            cursor: Object.keys(selectedAnswers).length === lesson.questions.length ? 'pointer' : 'not-allowed',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                          }}
                        >
                          Submit Quiz <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* Quiz Results */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center' }}
                  >
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: quizScore >= lesson.questions.length * 0.7 ? 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))' : 'linear-gradient(135deg, rgba(255,45,85,0.2), rgba(255,45,85,0.1))', border: quizScore >= lesson.questions.length * 0.7 ? '3px solid #22c55e' : '3px solid #ff2d55', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      {quizScore >= lesson.questions.length * 0.7 ? (
                        <CheckCircle size={48} color="#22c55e" />
                      ) : (
                        <XCircle size={48} color="#ff2d55" />
                      )}
                    </div>

                    <h2 className="font-orbitron" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                      {quizScore >= lesson.questions.length * 0.7 ? 'Great Job!' : 'Keep Learning!'}
                    </h2>
                    <p className="font-exo" style={{ fontSize: 15, color: '#8888a8', marginBottom: 24 }}>
                      You scored {quizScore} out of {lesson.questions.length}
                    </p>

                    <div className="ix-card" style={{ padding: 24, marginBottom: 24 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {lesson.questions.map((q, index) => {
                          const userAnswer = selectedAnswers[index]
                          const isCorrect = userAnswer === q.correct
                          return (
                            <div key={index} style={{ textAlign: 'left', paddingBottom: 16, borderBottom: index < lesson.questions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                {isCorrect ? <CheckCircle size={18} color="#22c55e" /> : <XCircle size={18} color="#ff2d55" />}
                                <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>Question {index + 1}</span>
                              </div>
                              <p className="font-exo" style={{ fontSize: 13, color: '#e8e8f0', marginBottom: 8 }}>{q.question}</p>
                              <div className="font-exo" style={{ fontSize: 12, color: isCorrect ? '#22c55e' : '#ff2d55' }}>
                                Your answer: {q.options[userAnswer]}
                              </div>
                              {!isCorrect && (
                                <div className="font-exo" style={{ fontSize: 12, color: '#22c55e', marginTop: 4 }}>
                                  Correct answer: {q.options[q.correct]}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                      <button
                        onClick={() => {
                          setShowResults(false)
                          setCurrentQuestion(0)
                          setSelectedAnswers({})
                        }}
                        className="font-rajdhani"
                        style={{
                          padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                          background: 'transparent', color: '#00f0ff', fontSize: 13, fontWeight: 700,
                          textTransform: 'uppercase', cursor: 'pointer'
                        }}
                      >
                        Retry Quiz
                      </button>
                      {quizScore >= lesson.questions.length * 0.7 && (
                        <button
                          onClick={handleNextLesson}
                          className="font-rajdhani"
                          style={{
                            padding: '12px 24px', borderRadius: 8, border: 'none',
                            background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                            fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer'
                          }}
                        >
                          Next Lesson
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="font-rajdhani"
              style={{
                padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <ChevronLeft size={14} /> Back to Course
            </button>

            {lesson.type === 'video' && (
              <button
                onClick={handleNextLesson}
                className="font-rajdhani"
                style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none',
                  background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                  fontSize: 12, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                Mark as Complete & Continue <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ background: '#12121a', padding: 24, overflowY: 'auto' }}>
          <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Course Content</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.values(mockLessons).slice(0, 5).map((l) => (
              <button
                key={l.id}
                onClick={() => navigate(`/learn/${courseId}/${l.id}`)}
                className="ix-card"
                style={{
                  padding: 14, textAlign: 'left', cursor: 'pointer', border: 'none',
                  background: l.id === lesson.id ? 'rgba(0,240,255,0.1)' : undefined,
                  borderColor: l.id === lesson.id ? 'rgba(0,240,255,0.3)' : undefined
                }}
              >
                <div className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: l.id === lesson.id ? '#00f0ff' : '#e8e8f0' }}>
                  {l.title}
                </div>
                <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>
                  {l.type === 'video' ? `📹 ${l.duration}` : '📝 Quiz'}
                </div>
              </button>
            ))}
          </div>

          <div className="ix-card" style={{ padding: 16, marginTop: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <Award size={32} color="#ffd700" style={{ marginBottom: 8 }} />
              <h4 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Complete Course</h4>
              <p className="font-exo" style={{ fontSize: 11, color: '#8888a8', marginBottom: 12 }}>Finish all lessons to earn certificate</p>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                <div style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, #ffd700, #ff8c00)', borderRadius: 3 }} />
              </div>
              <div className="font-exo" style={{ fontSize: 11, color: '#8888a8', marginTop: 6 }}>40% Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
