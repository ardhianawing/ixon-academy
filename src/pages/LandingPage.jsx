import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen, Target, Users, Trophy, Zap, Shield,
  ChevronRight, Star, Play, ArrowRight, Crown, Eye
} from 'lucide-react'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    icon: BookOpen,
    title: 'Kurikulum Terstruktur',
    desc: 'Modul belajar role-based: Tank, Fighter, Assassin, Mage, Marksman, Support/Roamer. Bukan video random.',
    color: '#00f0ff',
  },
  {
    icon: Target,
    title: 'Evaluasi Coach Pro',
    desc: 'Submit gameplay-mu, dapatkan review terstruktur dengan rubrik standar dari coach berpengalaman.',
    color: '#ff2d55',
  },
  {
    icon: Users,
    title: 'Komunitas Berkualitas',
    desc: 'Forum termoderasi dengan reputation system. Bukan grup WA toxic — ini lingkungan profesional.',
    color: '#a855f7',
  },
  {
    icon: Trophy,
    title: 'Pipeline ke Tim Pro',
    desc: 'Talent Score-mu dipantau sistem Scouting. Performa bagus = undangan trial ke IXON Esport (MDL).',
    color: '#ffd700',
  },
  {
    icon: Zap,
    title: 'Daily Mission & XP',
    desc: 'Tantangan harian yang push improvement-mu. Konsistensi = progress = terdeteksi scout.',
    color: '#22c55e',
  },
  {
    icon: Shield,
    title: 'Achievement & Badge',
    desc: 'Koleksi badge rarity: Common → Rare → Epic → Legendary. Tunjukkan dedication-mu.',
    color: '#f97316',
  },
]

const tiers = [
  {
    name: 'Free',
    price: 'Gratis',
    color: '#888888',
    features: ['Lihat komunitas (read-only)', 'React & vote', 'Weekly digest', '1 quiz gratis/minggu'],
  },
  {
    name: 'Silver',
    price: 'Rp 29K',
    period: '/bulan',
    color: '#c0c0c0',
    features: ['Akses LMS lengkap', 'Post di komunitas', 'Progress tracking', 'Daily missions'],
  },
  {
    name: 'Gold',
    price: 'Rp 79K',
    period: '/bulan',
    color: '#ffd700',
    popular: true,
    features: ['Semua Silver +', 'Submit gameplay review', 'Coach feedback personal', 'Improvement plan'],
  },
  {
    name: 'Platinum',
    price: 'Rp 149K',
    period: '/bulan',
    color: '#00f0ff',
    features: ['Semua Gold +', 'Scrim simulation', 'Priority review', 'Scouting visibility'],
  },
]

const stats = [
  { value: '10K+', label: 'Players' },
  { value: '50+', label: 'Pro Coaches' },
  { value: '200+', label: 'Modules' },
  { value: '15', label: 'Trial Invites' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '40px 24px',
      }}>
        {/* BG Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 0,
        }} />

        {/* Radial gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,240,255,0.08) 0%, transparent 60%)',
          zIndex: 0,
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'rgba(255, 45, 85, 0.1)',
              border: '1px solid rgba(255, 45, 85, 0.3)',
              fontSize: '12px',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              color: '#ff2d55',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff2d55', animation: 'pulse-glow 2s infinite' }} />
            Powered by IXON Esport — MDL Team
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-orbitron"
            style={{
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 50%, #ff2d55 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Path
            <br />
            To Pro
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-exo"
            style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              color: '#8888a8',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Platform pembinaan esports profesional pertama di Indonesia.
            Belajar terstruktur, dievaluasi coach pro, terdeteksi scouting,
            dan diundang trial ke tim MDL.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link to="/courses" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #0088cc 100%)',
              color: '#000', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'all 0.3s',
              boxShadow: '0 0 20px rgba(0,240,255,0.3)',
            }}>
              Mulai Sekarang <ArrowRight size={18} />
            </Link>
            <Link to="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 36px', borderRadius: '10px',
              background: 'transparent',
              color: '#00f0ff', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em',
              textDecoration: 'none', transition: 'all 0.3s',
              border: '1px solid rgba(0,240,255,0.4)',
            }}>
              Lihat Paket <Eye size={18} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="font-orbitron" style={{ fontSize: '28px', fontWeight: 800, color: '#00f0ff' }}>
                  {s.value}
                </div>
                <div className="font-rajdhani" style={{ fontSize: '13px', color: '#555570', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p className="font-rajdhani" style={{ fontSize: '14px', color: '#ff2d55', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
              Ekosistem Lengkap
            </p>
            <h2 className="font-orbitron" style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800 }}>
              Bukan Sekadar Kursus Gaming
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="ix-card" style={{ padding: '28px', height: '100%' }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}30`,
                  marginBottom: '16px',
                }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 className="font-rajdhani" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                  {f.title}
                </h3>
                <p className="font-exo" style={{ fontSize: '14px', color: '#8888a8', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* PLAYER LIFECYCLE */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, rgba(0,240,255,0.02) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p className="font-rajdhani" style={{ fontSize: '14px', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
                Player Journey
              </p>
              <h2 className="font-orbitron" style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800 }}>
                Dari Noob ke Pro
              </h2>
            </div>
          </AnimatedSection>

          {[
            { step: '01', title: 'Register & Explore', desc: 'Daftar gratis, jelajahi komunitas, lihat apa yang ditawarkan.', color: '#888' },
            { step: '02', title: 'Belajar Terstruktur', desc: 'Upgrade Silver, akses kurikulum lengkap sesuai role-mu.', color: '#c0c0c0' },
            { step: '03', title: 'Dievaluasi Coach', desc: 'Submit gameplay, dapat feedback personal dari coach pro.', color: '#ffd700' },
            { step: '04', title: 'Berkompetisi & Terpantau', desc: 'Talent Score-mu naik, masuk Scouting Board, undangan trial.', color: '#00f0ff' },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                marginBottom: '32px',
                padding: '24px',
                borderRadius: '12px',
                background: i === 3 ? 'rgba(0,240,255,0.05)' : 'transparent',
                border: i === 3 ? '1px solid rgba(0,240,255,0.15)' : '1px solid transparent',
              }}>
                <div className="font-orbitron" style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: item.color,
                  opacity: 0.6,
                  minWidth: '60px',
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-rajdhani" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                  <p className="font-exo" style={{ fontSize: '14px', color: '#8888a8', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p className="font-rajdhani" style={{ fontSize: '14px', color: '#ffd700', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>
              Membership Tiers
            </p>
            <h2 className="font-orbitron" style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800 }}>
              Pilih Jalurmu
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {tiers.map((tier, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="ix-card" style={{
                padding: '28px',
                position: 'relative',
                border: tier.popular ? `1px solid ${tier.color}50` : undefined,
                boxShadow: tier.popular ? `0 0 30px ${tier.color}15` : undefined,
              }}>
                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 16px',
                    borderRadius: '100px',
                    background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                    fontSize: '10px',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 700,
                    color: '#000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>
                    Most Popular
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <Crown size={18} color={tier.color} />
                  <span className="font-rajdhani" style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: tier.color,
                    textTransform: 'uppercase',
                  }}>
                    {tier.name}
                  </span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <span className="font-orbitron" style={{ fontSize: '28px', fontWeight: 800 }}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="font-exo" style={{ fontSize: '14px', color: '#555570' }}>
                      {tier.period}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tier.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ChevronRight size={14} color={tier.color} style={{ opacity: 0.6 }} />
                      <span className="font-exo" style={{ fontSize: '13px', color: '#8888a8' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/pricing" style={{
                  display: 'block',
                  marginTop: '24px',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: tier.popular ? '#000' : tier.color,
                  background: tier.popular
                    ? `linear-gradient(135deg, ${tier.color}, #ff8c00)`
                    : 'transparent',
                  border: tier.popular ? 'none' : `1px solid ${tier.color}40`,
                }}>
                  {tier.name === 'Free' ? 'Daftar Gratis' : 'Upgrade Now'}
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.03) 100%)',
      }}>
        <AnimatedSection>
          <h2 className="font-orbitron" style={{
            fontSize: 'clamp(22px, 4vw, 36px)',
            fontWeight: 800,
            marginBottom: '16px',
          }}>
            Ready to Level Up?
          </h2>
          <p className="font-exo" style={{
            fontSize: '16px',
            color: '#8888a8',
            marginBottom: '32px',
          }}>
            Gabung ribuan pemain yang sudah dalam jalur menuju pro.
          </p>
          <Link to="/courses" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '16px 48px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #0088cc 100%)',
            color: '#000', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
            fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.05em',
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(0,240,255,0.3)',
          }}>
            Join IXON Academy <Zap size={20} />
          </Link>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 24px',
        borderTop: '1px solid rgba(0,240,255,0.08)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <img src={`${import.meta.env.BASE_URL}ixon-logo.png`} alt="IXON" style={{ width: 24, height: 24 }} />
          <span className="font-orbitron" style={{ fontSize: '14px', fontWeight: 700 }}>IXON ACADEMY</span>
        </div>
        <p className="font-exo" style={{ fontSize: '12px', color: '#555570' }}>
          © 2025 IXON Esport. All rights reserved. Your Path to Pro.
        </p>
      </footer>
    </div>
  )
}
