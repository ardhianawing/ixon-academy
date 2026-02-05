import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CreditCard, Download, Calendar, Crown, AlertCircle, CheckCircle,
  ChevronRight, Edit, Trash2, Plus
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

const currentSubscription = {
  tier: 'Gold',
  price: 79000,
  nextBilling: '15 Mar 2025',
  status: 'active',
  color: '#ffd700'
}

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/26', isDefault: false }
]

const billingHistory = [
  { id: 'INV-2025-002', date: '15 Feb 2025', amount: 79000, status: 'paid', method: 'Visa ****4242' },
  { id: 'INV-2025-001', date: '15 Jan 2025', amount: 79000, status: 'paid', method: 'Visa ****4242' },
  { id: 'INV-2024-012', date: '15 Dec 2024', amount: 79000, status: 'paid', method: 'Visa ****4242' },
  { id: 'INV-2024-011', date: '15 Nov 2024', amount: 79000, status: 'paid', method: 'Visa ****4242' }
]

export default function Billing() {
  const navigate = useNavigate()
  const [showCancelModal, setShowCancelModal] = useState(false)

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 1000, margin: '0 auto', padding: '80px 20px 40px' }}>
      <Anim>
        <h1 className="font-orbitron" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Billing & Subscription</h1>
        <p className="font-exo" style={{ fontSize: 14, color: '#8888a8', marginBottom: 32 }}>Manage your subscription and payment methods</p>
      </Anim>

      {/* Current Subscription */}
      <Anim delay={0.05}>
        <div className="ix-card ix-border-gradient" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Crown size={24} color={currentSubscription.color} />
                <h2 className="font-rajdhani" style={{ fontSize: 20, fontWeight: 700, color: currentSubscription.color }}>{currentSubscription.tier} Tier</h2>
                <span style={{
                  padding: '3px 10px', borderRadius: 4, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700,
                  background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)',
                  textTransform: 'uppercase'
                }}>
                  {currentSubscription.status}
                </span>
              </div>
              <p className="font-exo" style={{ fontSize: 13, color: '#8888a8', marginBottom: 4 }}>
                Rp {currentSubscription.price.toLocaleString()}/bulan
              </p>
              <p className="font-exo" style={{ fontSize: 12, color: '#555570' }}>
                Next billing: {currentSubscription.nextBilling}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigate('/pricing')}
                className="font-rajdhani"
                style={{
                  padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                  background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
                  textTransform: 'uppercase', cursor: 'pointer'
                }}
              >
                Change Plan
              </button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="font-rajdhani"
                style={{
                  padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(255,45,85,0.3)',
                  background: 'transparent', color: '#ff2d55', fontSize: 12, fontWeight: 700,
                  textTransform: 'uppercase', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Renewal Notice */}
          <div style={{ padding: 14, borderRadius: 8, background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertCircle size={18} color="#00f0ff" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-exo" style={{ fontSize: 13, color: '#e8e8f0', marginBottom: 2 }}>
                Your subscription will automatically renew on <strong>{currentSubscription.nextBilling}</strong>
              </p>
              <p className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>
                You'll be charged Rp {currentSubscription.price.toLocaleString()} to your default payment method
              </p>
            </div>
          </div>
        </div>
      </Anim>

      {/* Payment Methods */}
      <Anim delay={0.1}>
        <div className="ix-card" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>Payment Methods</h3>
            <button className="font-rajdhani" style={{
              padding: '8px 16px', borderRadius: 6, border: '1px solid rgba(0,240,255,0.3)',
              background: 'transparent', color: '#00f0ff', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Plus size={14} /> Add Card
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {paymentMethods.map(method => (
              <div key={method.id} className="ix-card" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 32, borderRadius: 6, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CreditCard size={20} color="#00f0ff" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>{method.type} •••• {method.last4}</span>
                      {method.isDefault && (
                        <span style={{
                          padding: '2px 8px', borderRadius: 4, fontSize: 9, fontFamily: 'Rajdhani', fontWeight: 700,
                          background: 'rgba(0,240,255,0.15)', color: '#00f0ff', border: '1px solid rgba(0,240,255,0.3)',
                          textTransform: 'uppercase'
                        }}>
                          Default
                        </span>
                      )}
                    </div>
                    <span className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>Expires {method.expiry}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ padding: 6, borderRadius: 4, border: 'none', background: 'rgba(0,240,255,0.1)', color: '#00f0ff', cursor: 'pointer' }}>
                    <Edit size={14} />
                  </button>
                  <button style={{ padding: 6, borderRadius: 4, border: 'none', background: 'rgba(255,45,85,0.1)', color: '#ff2d55', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Anim>

      {/* Billing History */}
      <Anim delay={0.15}>
        <div className="ix-card" style={{ padding: 24 }}>
          <h3 className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>Billing History</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th className="font-rajdhani" style={{ padding: 12, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Invoice</th>
                  <th className="font-rajdhani" style={{ padding: 12, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Date</th>
                  <th className="font-rajdhani" style={{ padding: 12, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Amount</th>
                  <th className="font-rajdhani" style={{ padding: 12, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Method</th>
                  <th className="font-rajdhani" style={{ padding: 12, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Status</th>
                  <th className="font-rajdhani" style={{ padding: 12, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map(invoice => (
                  <tr key={invoice.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td className="font-orbitron" style={{ padding: 12, fontSize: 12, fontWeight: 700, color: '#00f0ff' }}>{invoice.id}</td>
                    <td className="font-exo" style={{ padding: 12, fontSize: 13, color: '#8888a8' }}>{invoice.date}</td>
                    <td className="font-orbitron" style={{ padding: 12, fontSize: 13, fontWeight: 700 }}>Rp {invoice.amount.toLocaleString()}</td>
                    <td className="font-exo" style={{ padding: 12, fontSize: 12, color: '#8888a8' }}>{invoice.method}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 4, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700,
                        background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)',
                        textTransform: 'uppercase'
                      }}>
                        {invoice.status}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <button className="font-rajdhani" style={{
                        padding: '6px 12px', borderRadius: 4, border: '1px solid rgba(0,240,255,0.3)',
                        background: 'transparent', color: '#00f0ff', fontSize: 10, fontWeight: 700,
                        textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                      }}>
                        <Download size={12} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Anim>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowCancelModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="ix-card ix-border-gradient"
            style={{ maxWidth: 500, width: '100%', padding: 24 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,45,85,0.1)', border: '2px solid rgba(255,45,85,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <AlertCircle size={32} color="#ff2d55" />
              </div>
              <h2 className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Cancel Subscription?</h2>
              <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>
                You'll lose access to all {currentSubscription.tier} tier benefits at the end of your billing period ({currentSubscription.nextBilling})
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowCancelModal(false)}
                className="font-rajdhani"
                style={{
                  flex: 1, padding: '12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent', color: '#e8e8f0', fontSize: 13, fontWeight: 700,
                  textTransform: 'uppercase', cursor: 'pointer'
                }}
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false)
                  // Handle cancellation
                }}
                className="font-rajdhani"
                style={{
                  flex: 1, padding: '12px', borderRadius: 8, border: 'none',
                  background: '#ff2d55', color: '#fff', fontSize: 13, fontWeight: 700,
                  textTransform: 'uppercase', cursor: 'pointer'
                }}
              >
                Cancel Subscription
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
