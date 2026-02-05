import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initAudio, playBumperSFX } from '../utils/sound'

// Particle system component
function Particles({ active }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#ff2d55' : '#00f0ff',
    }))

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Draw connections
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = '#00f0ff'
            ctx.globalAlpha = (1 - dist / 120) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      animRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    />
  )
}

// Glitch text component
function GlitchText({ text, className, delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [glitching, setGlitching] = useState(false)
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlitching(true)
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return char
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        iteration += 0.5
        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplayText(text)
          setGlitching(false)
        }
      }, 40)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <span className={`${className} ${glitching ? 'animate-[glitch-1_0.3s_ease-in-out_infinite]' : ''}`}>
      {displayText || '\u00A0'}
    </span>
  )
}

// Horizontal scan line
function ScanLine({ active }) {
  if (!active) return null
  return (
    <motion.div
      initial={{ top: '-2px' }}
      animate={{ top: '100%' }}
      transition={{ duration: 1.5, repeat: 2, ease: 'linear' }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)',
        zIndex: 10,
        filter: 'blur(1px)',
      }}
    />
  )
}

export default function Bumper({ onComplete }) {
  const [stage, setStage] = useState('idle') // idle -> activated -> logo -> text -> exit
  const [particlesActive, setParticlesActive] = useState(false)

  const handleActivate = useCallback(async () => {
    if (stage !== 'idle') return
    
    await initAudio()
    playBumperSFX()
    
    setStage('activated')
    setParticlesActive(true)

    // Logo reveal at 0.4s
    setTimeout(() => setStage('logo'), 400)
    // Text reveal at 1.2s
    setTimeout(() => setStage('text'), 1200)
    // Hold & exit at 3.2s
    setTimeout(() => setStage('exit'), 3200)
    // Complete at 4s
    setTimeout(() => onComplete?.(), 4000)
  }, [stage, onComplete])

  return (
    <AnimatePresence>
      {stage !== 'exit' ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onClick={handleActivate}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#06060a',
            cursor: stage === 'idle' ? 'pointer' : 'default',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Background gradient pulse */}
          <motion.div
            animate={stage !== 'idle' ? {
              opacity: [0, 0.15, 0.05, 0.15],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-50%',
              background: 'radial-gradient(circle at center, rgba(0,240,255,0.15) 0%, transparent 60%)',
              zIndex: 0,
            }}
          />

          {/* Particles */}
          <Particles active={particlesActive} />

          {/* Scan line */}
          <ScanLine active={stage === 'activated' || stage === 'logo'} />

          {/* "TAP TO ENTER" prompt */}
          {stage === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '15%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                zIndex: 20,
              }}
            >
              {/* Small logo preview */}
              <motion.img
                src={`${import.meta.env.BASE_URL}ixon-logo.png`}
                alt="IXON"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 60, height: 60, filter: 'grayscale(0.5)' }}
              />
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#00f0ff',
                }}
              >
                Tap to Enter
              </motion.p>
            </motion.div>
          )}

          {/* LOGO — Stage: logo, text */}
          {(stage === 'logo' || stage === 'text') && (
            <motion.div
              style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Glow ring behind logo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.3] }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: '2px solid rgba(0,240,255,0.4)',
                  boxShadow: '0 0 40px rgba(0,240,255,0.3), inset 0 0 40px rgba(0,240,255,0.1)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Logo */}
              <motion.img
                src={`${import.meta.env.BASE_URL}ixon-logo.png`}
                alt="IXON Academy"
                initial={{ scale: 0.3, opacity: 0, filter: 'brightness(3) blur(10px)' }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter: 'brightness(1) blur(0px)',
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: 140, height: 140, position: 'relative', zIndex: 2 }}
              />

              {/* Text: IXON ACADEMY */}
              {stage === 'text' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px' }}>
                    <GlitchText
                      text="IXON"
                      className="font-orbitron"
                      delay={0}
                    />
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    style={{
                      height: '1px',
                      width: '200px',
                      background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                    }}
                  />
                  <GlitchText
                    text="ACADEMY"
                    className="font-rajdhani"
                    delay={200}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.8 }}
                    style={{
                      fontFamily: 'Exo 2, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.25em',
                      color: '#8888a8',
                      marginTop: '8px',
                    }}
                  >
                    YOUR PATH TO PRO
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Corner decorations */}
          {stage !== 'idle' && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  position: 'absolute', top: 30, left: 30,
                  width: 40, height: 40,
                  borderTop: '2px solid #00f0ff',
                  borderLeft: '2px solid #00f0ff',
                  zIndex: 20,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  position: 'absolute', top: 30, right: 30,
                  width: 40, height: 40,
                  borderTop: '2px solid #00f0ff',
                  borderRight: '2px solid #00f0ff',
                  zIndex: 20,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  position: 'absolute', bottom: 30, left: 30,
                  width: 40, height: 40,
                  borderBottom: '2px solid #ff2d55',
                  borderLeft: '2px solid #ff2d55',
                  zIndex: 20,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  position: 'absolute', bottom: 30, right: 30,
                  width: 40, height: 40,
                  borderBottom: '2px solid #ff2d55',
                  borderRight: '2px solid #ff2d55',
                  zIndex: 20,
                }}
              />
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
