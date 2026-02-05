import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CreditCard, Smartphone, Building, Shield, CheckCircle, AlertCircle,
  Tag, ArrowLeft, Lock, Crown
} from 'lucide-react'

const tiers = {
  silver: { name: 'Silver', price: 29000, color: '#c0c0c0' },
  gold: { name: 'Gold', price: 79000, color: '#ffd700' },
  platinum: { name: 'Platinum', price: 149000, color: '#00f0ff' }
}

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, supported: ['Visa', 'Mastercard', 'JCB'] },
  { id: 'ewallet', name: 'E-Wallet', icon: Smartphone, supported: ['GoPay', 'OVO', 'DANA', 'ShopeePay'] },
  { id: 'transfer', name: 'Bank Transfer', icon: Building, supported: ['BCA', 'Mandiri', 'BNI', 'BRI'] }
]

export default function Checkout() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tierParam = searchParams.get('tier') || 'gold'
  const tier = tiers[tierParam] || tiers.gold

  const [selectedMethod, setSelectedMethod] = useState('card')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(null)
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  const discount = promoApplied ? tier.price * 0.1 : 0
  const tax = (tier.price - discount) * 0.11
  const total = tier.price - discount + tax

  const handleApplyPromo = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'ixon10') {
      setPromoApplied({ code: promoCode, discount: 10 })
    } else {
      setPromoApplied(null)
    }
  }

  const handlePayment = () => {
    // Mock payment processing
    navigate(`/payment-success?tier=${tierParam}`)
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, background: 'linear-gradient(180deg, rgba(0,240,255,0.03) 0%, transparent 100%)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        <button
          onClick={() => navigate('/pricing')}
          className="font-rajdhani"
          style={{ background: 'none', border: 'none', color: '#00f0ff', fontSize: 13, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft size={16} /> Back to pricing
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 32, alignItems: 'start' }}>
          {/* Main Form */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-orbitron" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Complete Your Purchase</h1>
              <p className="font-exo" style={{ fontSize: 14, color: '#8888a8', marginBottom: 32 }}>Secure checkout powered by industry-standard encryption</p>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="ix-card" style={{ padding: 24, marginBottom: 24 }}>
                <h2 className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Payment Method</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className="ix-card"
                      style={{
                        padding: 16, textAlign: 'left', cursor: 'pointer', border: 'none',
                        background: selectedMethod === method.id ? 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(0,240,255,0.05))' : undefined,
                        borderColor: selectedMethod === method.id ? 'rgba(0,240,255,0.4)' : undefined,
                        transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 14
                      }}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <method.icon size={24} color="#00f0ff" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{method.name}</div>
                        <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>{method.supported.join(', ')}</div>
                      </div>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: selectedMethod === method.id ? '6px solid #00f0ff' : '2px solid rgba(255,255,255,0.2)' }} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Payment Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="ix-card" style={{ padding: 24 }}>
                <h2 className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Payment Details</h2>

                {selectedMethod === 'card' && (
                  <>
                    <div style={{ marginBottom: 14 }}>
                      <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="font-exo"
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                          background: '#12121a', color: '#e8e8f0', fontSize: 14, outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Cardholder Name</label>
                      <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        placeholder="JOHN DOE"
                        className="font-exo"
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                          background: '#12121a', color: '#e8e8f0', fontSize: 14, outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Expiry Date</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="font-exo"
                          style={{
                            width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                            background: '#12121a', color: '#e8e8f0', fontSize: 14, outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>CVV</label>
                        <input
                          type="text"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          placeholder="123"
                          maxLength="3"
                          className="font-exo"
                          style={{
                            width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                            background: '#12121a', color: '#e8e8f0', fontSize: 14, outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedMethod === 'ewallet' && (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Smartphone size={48} color="#00f0ff" style={{ margin: '0 auto 16px' }} />
                    <p className="font-exo" style={{ fontSize: 14, color: '#8888a8', marginBottom: 8 }}>Pilih e-wallet Anda</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20 }}>
                      {['GoPay', 'OVO', 'DANA', 'ShopeePay'].map(wallet => (
                        <button key={wallet} className="ix-card" style={{ padding: 16, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                          <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>{wallet}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMethod === 'transfer' && (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Building size={48} color="#00f0ff" style={{ margin: '0 auto 16px' }} />
                    <p className="font-exo" style={{ fontSize: 14, color: '#8888a8', marginBottom: 8 }}>Pilih bank untuk transfer</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20 }}>
                      {['BCA', 'Mandiri', 'BNI', 'BRI'].map(bank => (
                        <button key={bank} className="ix-card" style={{ padding: 16, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                          <span className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700 }}>{bank}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} style={{ position: 'sticky', top: 90 }}>
              <div className="ix-card ix-border-gradient" style={{ padding: 24, marginBottom: 16 }}>
                <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Order Summary</h3>

                <div style={{ padding: 16, borderRadius: 8, background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Crown size={24} color={tier.color} />
                    <div>
                      <div className="font-rajdhani" style={{ fontSize: 18, fontWeight: 700, color: tier.color }}>{tier.name} Tier</div>
                      <div className="font-exo" style={{ fontSize: 11, color: '#8888a8' }}>Monthly subscription</div>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div style={{ marginBottom: 16 }}>
                  <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Promo Code</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="font-exo"
                      style={{
                        flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid rgba(0,240,255,0.15)',
                        background: '#12121a', color: '#e8e8f0', fontSize: 13, outline: 'none'
                      }}
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="font-rajdhani"
                      style={{
                        padding: '10px 16px', borderRadius: 6, border: '1px solid rgba(0,240,255,0.3)',
                        background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
                        textTransform: 'uppercase', cursor: 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div style={{ marginTop: 8, padding: 8, borderRadius: 6, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={14} color="#22c55e" />
                      <span className="font-exo" style={{ fontSize: 11, color: '#22c55e' }}>Promo applied: {promoApplied.discount}% off</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Subtotal</span>
                    <span className="font-orbitron" style={{ fontSize: 13, fontWeight: 700 }}>Rp {tier.price.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="font-exo" style={{ fontSize: 13, color: '#22c55e' }}>Discount</span>
                      <span className="font-orbitron" style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>-Rp {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Tax (11%)</span>
                    <span className="font-orbitron" style={{ fontSize: 13, fontWeight: 700 }}>Rp {Math.round(tax).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="font-rajdhani" style={{ fontSize: 15, fontWeight: 700, textTransform: 'uppercase' }}>Total</span>
                    <span className="font-orbitron" style={{ fontSize: 20, fontWeight: 800, color: '#00f0ff' }}>Rp {Math.round(total).toLocaleString()}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  className="font-rajdhani"
                  style={{
                    width: '100%', padding: '14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                    fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}
                >
                  <Lock size={16} /> Complete Payment
                </button>

                {/* Security Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, borderRadius: 8, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <Shield size={16} color="#22c55e" />
                  <span className="font-exo" style={{ fontSize: 11, color: '#22c55e' }}>Secured by SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
