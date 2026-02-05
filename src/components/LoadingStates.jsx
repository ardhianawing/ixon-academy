import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Page Loading Spinner
export function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 size={48} color="#00f0ff" />
      </motion.div>
    </div>
  )
}

// Card Skeleton
export function CardSkeleton({ count = 3 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="ix-card"
          style={{ padding: 20 }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ width: '60%', height: 16, borderRadius: 4, background: 'rgba(255,255,255,0.05)', marginBottom: 8 }} />
              <div style={{ width: '40%', height: 12, borderRadius: 4, background: 'rgba(255,255,255,0.03)' }} />
            </div>
          </div>
          <div style={{ width: '100%', height: 12, borderRadius: 4, background: 'rgba(255,255,255,0.05)', marginBottom: 6 }} />
          <div style={{ width: '80%', height: 12, borderRadius: 4, background: 'rgba(255,255,255,0.05)' }} />
        </motion.div>
      ))}
    </>
  )
}

// Empty State
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', padding: '60px 20px' }}
    >
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <Icon size={40} color="#00f0ff" opacity={0.5} />
      </div>
      <h3 className="font-orbitron" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
      <p className="font-exo" style={{ fontSize: 14, color: '#8888a8', marginBottom: 24 }}>{description}</p>
      {action && action}
    </motion.div>
  )
}

// Toast Notification
export function Toast({ message, type = 'success', onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        padding: '14px 20px',
        borderRadius: 8,
        background: type === 'success' ? 'rgba(34,197,94,0.15)' : type === 'error' ? 'rgba(255,45,85,0.15)' : 'rgba(0,240,255,0.15)',
        border: type === 'success' ? '1px solid rgba(34,197,94,0.3)' : type === 'error' ? '1px solid rgba(255,45,85,0.3)' : '1px solid rgba(0,240,255,0.3)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}
    >
      <span className="font-exo" style={{ fontSize: 13, color: type === 'success' ? '#22c55e' : type === 'error' ? '#ff2d55' : '#00f0ff' }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer', fontSize: 18 }}
      >
        ×
      </button>
    </motion.div>
  )
}
