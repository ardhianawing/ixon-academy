import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, Target, Trophy, Users, BookOpen, Star, CheckCircle,
  Gamepad2, TrendingUp, Award, Zap
} from 'lucide-react'

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to IXON Academy',
    subtitle: 'Transform dari casual player jadi pro player',
    icon: Trophy
  },
  {
    id: 'profile',
    title: 'Setup Your Profile',
    subtitle: 'Biar coach bisa kasih feedback yang tepat',
    icon: Users
  },
  {
    id: 'assessment',
    title: 'Skill Assessment',
    subtitle: 'Kami tentukan level kamu',
    icon: Target
  },
  {
    id: 'recommendation',
    title: 'Your Learning Path',
    subtitle: 'Rekomendasi course berdasarkan skill kamu',
    icon: TrendingUp
  }
]

const roles = [
  { id: 'jungler', name: 'Jungler', icon: '🦁', color: '#ff2d55' },
  { id: 'exp', name: 'EXP Lane', icon: '🛡️', color: '#a855f7' },
  { id: 'mid', name: 'Mid Lane', icon: '⚡', color: '#00f0ff' },
  { id: 'gold', name: 'Gold Lane', icon: '🎯', color: '#ffd700' },
  { id: 'roamer', name: 'Roamer', icon: '🌟', color: '#22c55e' }
]

const ranks = [
  { id: 'warrior', name: 'Warrior - Master', level: 'Beginner' },
  { id: 'gm', name: 'Grandmaster - Epic', level: 'Intermediate' },
  { id: 'legend', name: 'Legend', level: 'Advanced' },
  { id: 'mythic', name: 'Mythic+', level: 'Expert' }
]

const goals = [
  { id: 'rank', label: 'Push rank ke tier lebih tinggi', icon: Trophy },
  { id: 'mechanics', label: 'Improve mechanical skill', icon: Gamepad2 },
  { id: 'macro', label: 'Better game sense & macro', icon: Target },
  { id: 'competitive', label: 'Join competitive team', icon: Users },
  { id: 'content', label: 'Jadi content creator', icon: Star }
]

const assessmentQuestions = [
  {
    q: 'Seberapa sering kamu cek minimap?',
    options: ['Jarang', 'Kadang-kadang', 'Sering', 'Setiap beberapa detik']
  },
  {
    q: 'Kapan kamu biasa farm jungle/lane?',
    options: ['Asal kosong', 'Lihat timing wave', 'Sesuai rotation plan', 'Optimize dengan objective']
  },
  {
    q: 'Gimana cara kamu handle losing game?',
    options: ['Nyerah', 'Blame team', 'Fokus defense', 'Cari comeback opportunity']
  }
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    ign: '',
    role: null,
    rank: null,
    goals: [],
    assessmentAnswers: []
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save onboarding data to localStorage
      localStorage.setItem('ixon_onboarding_complete', 'true')
      localStorage.setItem('ixon_user_profile', JSON.stringify(formData))
      navigate('/dashboard')
    }
  }

  const handleSkip = () => {
    localStorage.setItem('ixon_onboarding_complete', 'true')
    navigate('/dashboard')
  }

  const canProceed = () => {
    switch(currentStep) {
      case 0: return true
      case 1: return formData.ign && formData.role && formData.rank
      case 2: return formData.assessmentAnswers.length === assessmentQuestions.length
      case 3: return formData.goals.length > 0
      default: return false
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #00f0ff, transparent)', top: '-10%', left: '-10%', animation: 'float 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #ff2d55, transparent)', bottom: '-10%', right: '-10%', animation: 'float 12s ease-in-out infinite' }} />
      </div>

      <div style={{ maxWidth: 600, width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {steps.map((step, i) => (
              <div
                key={step.id}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: i <= currentStep ? 'linear-gradient(90deg, #00f0ff, #0088cc)' : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="font-rajdhani"
              style={{
                background: 'none', border: 'none', color: '#8888a8', fontSize: 12,
                cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600
              }}
            >
              Skip →
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="ix-card ix-border-gradient"
            style={{ padding: 40 }}
          >
            {/* Step Icon & Title */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
                background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,45,85,0.1))',
                border: '2px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <currentStepData.icon size={40} color="#00f0ff" />
              </div>
              <h2 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
                {currentStepData.title}
              </h2>
              <p className="font-exo" style={{ fontSize: 14, color: '#8888a8' }}>
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Step Content */}
            {currentStep === 0 && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  {[
                    { icon: BookOpen, text: 'Akses 20+ courses dari coach profesional' },
                    { icon: Target, text: 'Submit gameplay & dapetin feedback personal' },
                    { icon: Trophy, text: 'Track progress & compete di leaderboard' },
                    { icon: Users, text: 'Join komunitas 1000+ pemain serius' }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <feature.icon size={18} color="#00f0ff" />
                      </div>
                      <span className="font-exo" style={{ fontSize: 14, color: '#e8e8f0' }}>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                {/* IGN Input */}
                <div style={{ marginBottom: 20 }}>
                  <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    In-Game Name (IGN)
                  </label>
                  <input
                    type="text"
                    value={formData.ign}
                    onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
                    placeholder="e.g. ProdigyX"
                    className="font-exo"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                      background: '#12121a', color: '#e8e8f0', fontSize: 14, outline: 'none'
                    }}
                  />
                </div>

                {/* Role Selection */}
                <div style={{ marginBottom: 20 }}>
                  <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Main Role
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {roles.map(role => (
                      <button
                        key={role.id}
                        onClick={() => setFormData({ ...formData, role: role.id })}
                        className="ix-card"
                        style={{
                          padding: 14, border: 'none', cursor: 'pointer', textAlign: 'center',
                          background: formData.role === role.id ? `linear-gradient(135deg, ${role.color}15, ${role.color}05)` : undefined,
                          borderColor: formData.role === role.id ? `${role.color}40` : undefined,
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{role.icon}</div>
                        <div className="font-rajdhani" style={{ fontSize: 11, fontWeight: 700, color: formData.role === role.id ? role.color : '#8888a8' }}>
                          {role.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rank Selection */}
                <div>
                  <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Current Rank
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {ranks.map(rank => (
                      <button
                        key={rank.id}
                        onClick={() => setFormData({ ...formData, rank: rank.id })}
                        className="ix-card"
                        style={{
                          padding: 14, border: 'none', cursor: 'pointer', textAlign: 'left',
                          background: formData.rank === rank.id ? 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,240,255,0.05))' : undefined,
                          borderColor: formData.rank === rank.id ? 'rgba(0,240,255,0.4)' : undefined,
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div>
                          <div className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{rank.name}</div>
                          <div className="font-exo" style={{ fontSize: 10, color: '#8888a8' }}>{rank.level}</div>
                        </div>
                        {formData.rank === rank.id && <CheckCircle size={18} color="#00f0ff" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                {assessmentQuestions.map((question, qIndex) => (
                  <div key={qIndex} style={{ marginBottom: 24 }}>
                    <p className="font-rajdhani" style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                      {qIndex + 1}. {question.q}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {question.options.map((option, oIndex) => {
                        const isSelected = formData.assessmentAnswers[qIndex] === oIndex
                        return (
                          <button
                            key={oIndex}
                            onClick={() => {
                              const answers = [...formData.assessmentAnswers]
                              answers[qIndex] = oIndex
                              setFormData({ ...formData, assessmentAnswers: answers })
                            }}
                            className="ix-card"
                            style={{
                              padding: 12, border: 'none', cursor: 'pointer', textAlign: 'left',
                              background: isSelected ? 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,240,255,0.05))' : undefined,
                              borderColor: isSelected ? 'rgba(0,240,255,0.4)' : undefined,
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              transition: 'all 0.2s'
                            }}
                          >
                            <span className="font-exo" style={{ fontSize: 13 }}>{option}</span>
                            {isSelected && <CheckCircle size={16} color="#00f0ff" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 16 }}>
                  Pilih minimal 1 goal (bisa lebih dari 1)
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {goals.map(goal => {
                    const isSelected = formData.goals.includes(goal.id)
                    return (
                      <button
                        key={goal.id}
                        onClick={() => {
                          const newGoals = isSelected
                            ? formData.goals.filter(g => g !== goal.id)
                            : [...formData.goals, goal.id]
                          setFormData({ ...formData, goals: newGoals })
                        }}
                        className="ix-card"
                        style={{
                          padding: 16, border: 'none', cursor: 'pointer', textAlign: 'left',
                          background: isSelected ? 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,240,255,0.05))' : undefined,
                          borderColor: isSelected ? 'rgba(0,240,255,0.4)' : undefined,
                          display: 'flex', gap: 12, alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 6, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <goal.icon size={18} color="#00f0ff" />
                        </div>
                        <span className="font-exo" style={{ fontSize: 14, flex: 1 }}>{goal.label}</span>
                        {isSelected && (
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#00f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle size={14} color="#000" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                {formData.goals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 20, padding: 16, borderRadius: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}
                  >
                    <p className="font-exo" style={{ fontSize: 12, color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Zap size={14} /> Great! We'll recommend courses that match your goals.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="font-rajdhani"
              style={{
                width: '100%', marginTop: 32, padding: '14px', borderRadius: 8, border: 'none',
                background: canProceed() ? 'linear-gradient(135deg, #00f0ff, #0088cc)' : 'rgba(255,255,255,0.05)',
                color: canProceed() ? '#000' : '#555570',
                fontSize: 14, fontWeight: 700, textTransform: 'uppercase',
                cursor: canProceed() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'} <ChevronRight size={18} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
