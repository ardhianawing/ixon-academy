import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // login, register, otp, forgot
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  })
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus()
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    // Mock login
    const mockUser = {
      email: formData.email,
      role: formData.role,
      name: formData.email.split('@')[0],
      tier: 'Gold',
      loggedIn: true
    }

    localStorage.setItem('ixon_user', JSON.stringify(mockUser))
    setSuccess('Login successful!')

    setTimeout(() => {
      // Redirect based on role
      if (formData.role === 'admin') {
        navigate('/admin')
      } else if (formData.role === 'coach') {
        navigate('/coach')
      } else {
        navigate('/dashboard')
      }
    }, 1000)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Show OTP verification
    setMode('otp')
    setSuccess('OTP sent to ' + formData.phone)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const otpCode = otp.join('')

    if (otpCode.length !== 6) {
      setError('Please enter complete OTP')
      return
    }

    // Mock OTP verification (accept any 6 digits)
    const mockUser = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      role: 'user',
      tier: 'Free',
      loggedIn: true
    }

    localStorage.setItem('ixon_user', JSON.stringify(mockUser))
    setSuccess('Account created successfully!')

    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!formData.email) {
      setError('Please enter your email')
      return
    }

    setSuccess('Password reset link sent to ' + formData.email)
    setTimeout(() => {
      setMode('login')
      setSuccess('')
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #00f0ff, transparent)', top: '10%', left: '10%', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, #a855f7, transparent)', bottom: '10%', right: '10%', animation: 'float 10s ease-in-out infinite' }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="ix-card ix-border-gradient"
          style={{ padding: 32, width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 14px', background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,45,85,0.1))', border: '2px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={32} color="#00f0ff" />
            </div>
            <h1 className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>IXON ACADEMY</h1>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>
              {mode === 'login' && 'Welcome back, player'}
              {mode === 'register' && 'Mulai perjalananmu'}
              {mode === 'otp' && 'Verify your account'}
              {mode === 'forgot' && 'Reset your password'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: 12, borderRadius: 8, background: 'rgba(255,45,85,0.1)', border: '1px solid rgba(255,45,85,0.3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} color="#ff2d55" />
              <span className="font-exo" style={{ fontSize: 12, color: '#ff2d55' }}>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: 12, borderRadius: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={16} color="#22c55e" />
              <span className="font-exo" style={{ fontSize: 12, color: '#22c55e' }}>{success}</span>
            </motion.div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin}>
              {/* Role Selection */}
              <div style={{ marginBottom: 16 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Login As</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['user', 'coach', 'admin'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role })}
                      className="font-rajdhani"
                      style={{
                        padding: '10px', borderRadius: 8, border: formData.role === role ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.1)',
                        background: formData.role === role ? 'rgba(0,240,255,0.1)' : '#12121a',
                        color: formData.role === role ? '#00f0ff' : '#8888a8',
                        fontSize: 12, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <Mail size={16} color="#555570" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <Lock size={16} color="#555570" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                    {showPassword ? <EyeOff size={16} color="#555570" /> : <Eye size={16} color="#555570" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="font-exo"
                style={{ background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontSize: 12, marginBottom: 16, padding: 0 }}
              >
                Forgot password?
              </button>

              <button type="submit" className="font-rajdhani" style={{
                width: '100%', padding: '13px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16,
              }}>
                Login
              </button>

              <p className="font-exo" style={{ textAlign: 'center', fontSize: 12, color: '#8888a8' }}>
                Belum punya akun?{' '}
                <button type="button" onClick={() => setMode('register')}
                  style={{ background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontFamily: 'Exo 2', fontSize: 12, fontWeight: 600 }}>
                  Register
                </button>
              </p>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: 12 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Nama Lengkap</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <User size={16} color="#555570" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama sesuai KTP/Kartu Pelajar"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <Mail size={16} color="#555570" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>No. HP (untuk OTP)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <Phone size={16} color="#555570" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <Lock size={16} color="#555570" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min. 6 characters"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                    {showPassword ? <EyeOff size={16} color="#555570" /> : <Eye size={16} color="#555570" />}
                  </button>
                </div>
              </div>

              <button type="submit" className="font-rajdhani" style={{
                width: '100%', padding: '13px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16,
              }}>
                Register
              </button>

              <p className="font-exo" style={{ textAlign: 'center', fontSize: 12, color: '#8888a8' }}>
                Sudah punya akun?{' '}
                <button type="button" onClick={() => setMode('login')}
                  style={{ background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontFamily: 'Exo 2', fontSize: 12, fontWeight: 600 }}>
                  Login
                </button>
              </p>
            </form>
          )}

          {/* OTP Verification */}
          {mode === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <p className="font-exo" style={{ textAlign: 'center', fontSize: 13, color: '#8888a8', marginBottom: 24 }}>
                Enter the 6-digit code sent to<br />
                <strong style={{ color: '#00f0ff' }}>{formData.phone}</strong>
              </p>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="font-orbitron"
                    style={{
                      width: 48, height: 56, textAlign: 'center', fontSize: 20, fontWeight: 700,
                      borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
                      background: '#12121a', color: '#00f0ff', outline: 'none'
                    }}
                  />
                ))}
              </div>

              <button type="submit" className="font-rajdhani" style={{
                width: '100%', padding: '13px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12,
              }}>
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setSuccess('OTP resent!')}
                className="font-exo"
                style={{ width: '100%', background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', fontSize: 12 }}
              >
                Resend OTP
              </button>
            </form>
          )}

          {/* Forgot Password */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword}>
              <p className="font-exo" style={{ textAlign: 'center', fontSize: 13, color: '#8888a8', marginBottom: 20 }}>
                Enter your email and we'll send you a link to reset your password
              </p>

              <div style={{ marginBottom: 20 }}>
                <label className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)', background: '#12121a' }}>
                  <Mail size={16} color="#555570" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    style={{ flex: 1, background: 'none', border: 'none', color: '#e8e8f0', fontFamily: 'Exo 2', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <button type="submit" className="font-rajdhani" style={{
                width: '100%', padding: '13px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000',
                fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16,
              }}>
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-exo"
                style={{ width: '100%', background: 'none', border: 'none', color: '#8888a8', cursor: 'pointer', fontSize: 12 }}
              >
                ← Back to login
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
