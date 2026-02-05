import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, Download, Home, Award } from 'lucide-react'

const tiers = {
  silver: { name: 'Silver', color: '#c0c0c0' },
  gold: { name: 'Gold', color: '#ffd700' },
  platinum: { name: 'Platinum', color: '#00f0ff' }
}

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tierParam = searchParams.get('tier') || 'gold'
  const tier = tiers[tierParam] || tiers.gold

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: 120, height: 120, borderRadius: '50%', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))',
            border: '3px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <CheckCircle size={64} color="#22c55e" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-orbitron" style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Payment Successful!</h1>
          <p className="font-exo" style={{ fontSize: 15, color: '#8888a8', marginBottom: 32 }}>
            Welcome to <span style={{ color: tier.color, fontWeight: 700 }}>{tier.name} Tier</span>! Your subscription is now active.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="ix-card"
          style={{ padding: 24, marginBottom: 24, textAlign: 'left' }}
        >
          <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>
            What's Next?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-orbitron" style={{ fontSize: 14, fontWeight: 700, color: '#00f0ff' }}>1</span>
              </div>
              <div>
                <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Akses semua fitur unlocked</div>
                <p className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Mulai explore courses dan submit gameplay untuk review</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-orbitron" style={{ fontSize: 14, fontWeight: 700, color: '#00f0ff' }}>2</span>
              </div>
              <div>
                <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Invoice dikirim ke email</div>
                <p className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Cek inbox untuk detail pembayaran dan receipt</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="font-orbitron" style={{ fontSize: 14, fontWeight: 700, color: '#00f0ff' }}>3</span>
              </div>
              <div>
                <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Join exclusive community</div>
                <p className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>Diskusi dengan member {tier.name} tier lainnya</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center' }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="font-rajdhani"
            style={{
              padding: '12px 32px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
              fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <Home size={16} /> Go to Dashboard
          </button>
          <button
            className="font-rajdhani"
            style={{
              padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
              background: 'transparent', color: '#00f0ff', fontSize: 13, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <Download size={16} /> Download Invoice
          </button>
        </motion.div>

        {/* Confetti effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ y: window.innerHeight + 100, opacity: 0 }}
              transition={{ duration: 3, delay: Math.random() * 0.5, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                background: ['#00f0ff', '#ffd700', '#ff2d55', '#22c55e', '#a855f7'][i % 5],
                borderRadius: Math.random() > 0.5 ? '50%' : 0
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
