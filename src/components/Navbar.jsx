import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, BookOpen, Users, Target, Trophy, UserCircle,
  Bell, Crown, Menu, X, ChevronRight, Gamepad2, BarChart3
} from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/evaluation', label: 'Evaluation', icon: Target },
  { path: '/events', label: 'Events', icon: Trophy },
  { path: '/leaderboard', label: 'Leaderboard', icon: BarChart3 },
  { path: '/scouting', label: 'Scouting', icon: Gamepad2 },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Top navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: 'rgba(10, 10, 15, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 1000,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src={`${import.meta.env.BASE_URL}ixon-logo.png`}
            alt="IXON"
            style={{ width: 36, height: 36 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="font-orbitron" style={{ fontSize: '16px', fontWeight: 700, color: '#e8e8f0', lineHeight: 1.1 }}>
              IXON
            </span>
            <span className="font-rajdhani" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#00f0ff', lineHeight: 1 }}>
              ACADEMY
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '4px',
        }}
          className="desktop-nav"
        >
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'Rajdhani, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: active ? '#00f0ff' : '#8888a8',
                  background: active ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                  border: active ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Notification */}
          <Link to="/notifications" style={{
            position: 'relative',
            color: '#8888a8',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#ff2d55',
            }} />
          </Link>

          {/* Tier badge */}
          <Link to="/pricing" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '6px',
            background: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            textDecoration: 'none',
            fontSize: '11px',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            color: '#ffd700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            <Crown size={12} />
            Gold
          </Link>

          {/* Profile */}
          <Link to="/profile" style={{ textDecoration: 'none', color: '#8888a8' }}>
            <UserCircle size={28} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-toggle"
            style={{
              background: 'none',
              border: 'none',
              color: '#e8e8f0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 64,
              right: 0,
              bottom: 0,
              width: '280px',
              background: 'rgba(12, 12, 20, 0.98)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(0, 240, 255, 0.1)',
              zIndex: 999,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navItems.map(item => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: 'Rajdhani, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: active ? '#00f0ff' : '#e8e8f0',
                    background: active ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <item.icon size={20} />
                    {item.label}
                  </div>
                  <ChevronRight size={16} style={{ opacity: 0.3 }} />
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              top: 64,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 998,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
