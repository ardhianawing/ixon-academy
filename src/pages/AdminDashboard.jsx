import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users, TrendingUp, DollarSign, BookOpen, Target, Crown, Shield,
  Search, Filter, MoreVertical, ChevronDown, CheckCircle, XCircle,
  AlertCircle, Eye, Ban, Award, Settings, BarChart3, Activity,
  Calendar, MessageSquare, Star, Clock, UserCheck, UserX, Edit,
  Trash2, Download, Upload, RefreshCw, Bell, Mail, Phone
} from 'lucide-react'

function Anim({ children, delay = 0 }) {
  const ref = useRef(null)
  const v = useInView(ref, { once: true, margin: '-30px' })
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>{children}</motion.div>)
}

// Mock Data
const mockUsers = [
  { id: 1, name: 'ProdigyX', email: 'prodigy@mail.com', tier: 'Platinum', status: 'active', joined: '2024-12-15', lastActive: '2 jam lalu', reviews: 12, xp: 8420 },
  { id: 2, name: 'ShadowKing', email: 'shadow@mail.com', tier: 'Gold', status: 'active', joined: '2025-01-03', lastActive: '5 jam lalu', reviews: 8, xp: 6230 },
  { id: 3, name: 'BlazeFire', email: 'blaze@mail.com', tier: 'Gold', status: 'active', joined: '2025-01-10', lastActive: '1 hari lalu', reviews: 5, xp: 4890 },
  { id: 4, name: 'NightFury', email: 'night@mail.com', tier: 'Silver', status: 'active', joined: '2025-01-15', lastActive: '3 hari lalu', reviews: 3, xp: 2340 },
  { id: 5, name: 'ToxicPlayer99', email: 'toxic@mail.com', tier: 'Free', status: 'banned', joined: '2025-01-20', lastActive: '5 hari lalu', reviews: 0, xp: 120 },
  { id: 6, name: 'StormRider', email: 'storm@mail.com', tier: 'Silver', status: 'active', joined: '2025-01-22', lastActive: '12 jam lalu', reviews: 2, xp: 1560 },
  { id: 7, name: 'AceMLBB', email: 'ace@mail.com', tier: 'Platinum', status: 'active', joined: '2024-11-28', lastActive: '30 menit lalu', reviews: 18, xp: 12400 },
  { id: 8, name: 'DragonSlayer', email: 'dragon@mail.com', tier: 'Gold', status: 'suspended', joined: '2025-01-05', lastActive: '7 hari lalu', reviews: 6, xp: 3200 },
]

const mockCoaches = [
  { id: 1, name: 'Coach Raven', specialty: 'Jungle & Macro', rating: 4.8, reviews: 142, earnings: 'Rp 8.2jt', students: 45, status: 'active' },
  { id: 2, name: 'Coach Luna', specialty: 'Mid Lane & Mage', rating: 4.9, reviews: 98, earnings: 'Rp 5.6jt', students: 32, status: 'active' },
  { id: 3, name: 'Coach Phoenix', specialty: 'Marksman & Positioning', rating: 4.7, reviews: 76, earnings: 'Rp 4.1jt', students: 28, status: 'active' },
  { id: 4, name: 'Coach Tiger', specialty: 'EXP Lane & Tank', rating: 4.6, reviews: 54, earnings: 'Rp 2.8jt', students: 19, status: 'inactive' },
]

const mockCourses = [
  { id: 1, title: 'Mastering Jungle Rotations', author: 'Coach Raven', students: 234, status: 'published', rating: 4.8, revenue: 'Rp 18.7jt' },
  { id: 2, title: 'Advanced Mage Mechanics', author: 'Coach Luna', students: 189, status: 'published', rating: 4.9, revenue: 'Rp 15.1jt' },
  { id: 3, title: 'Marksman Positioning Guide', author: 'Coach Phoenix', students: 156, status: 'published', rating: 4.7, revenue: 'Rp 12.5jt' },
  { id: 4, title: 'Tank Meta 2025', author: 'Coach Tiger', students: 87, status: 'draft', rating: 0, revenue: 'Rp 0' },
]

const recentActivities = [
  { type: 'user', text: 'ProdigyX upgraded to Platinum', time: '5 menit lalu', icon: Crown, color: '#00f0ff' },
  { type: 'payment', text: 'Payment received: Rp 149K (ShadowKing)', time: '12 menit lalu', icon: DollarSign, color: '#22c55e' },
  { type: 'review', text: 'New review submitted by BlazeFire', time: '28 menit lalu', icon: Target, color: '#a855f7' },
  { type: 'course', text: 'Course published: Tank Meta 2025', time: '1 jam lalu', icon: BookOpen, color: '#ffd700' },
  { type: 'alert', text: 'User reported: ToxicPlayer99', time: '2 jam lalu', icon: AlertCircle, color: '#ff2d55' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [userFilter, setUserFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Stats
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12.5%', icon: Users, color: '#00f0ff' },
    { label: 'Active Subs', value: '486', change: '+8.3%', icon: Crown, color: '#ffd700' },
    { label: 'Revenue (MTD)', value: 'Rp 42.8jt', change: '+15.7%', icon: DollarSign, color: '#22c55e' },
    { label: 'Courses', value: '24', change: '+2', icon: BookOpen, color: '#a855f7' },
  ]

  // Filter users
  const filteredUsers = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFilter = userFilter === 'all' || u.tier.toLowerCase() === userFilter || u.status === userFilter
    return matchSearch && matchFilter
  })

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Platinum': return '#00f0ff'
      case 'Gold': return '#ffd700'
      case 'Silver': return '#c0c0c0'
      default: return '#888'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#22c55e'
      case 'suspended': return '#ff8c00'
      case 'banned': return '#ff2d55'
      default: return '#888'
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, paddingBottom: 40, maxWidth: 1400, margin: '0 auto', padding: '80px 20px 40px' }}>
      {/* Header */}
      <Anim>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Shield size={24} color="#00f0ff" />
              <h1 className="font-orbitron" style={{ fontSize: 28, fontWeight: 800 }}>Admin Dashboard</h1>
            </div>
            <p className="font-exo" style={{ fontSize: 13, color: '#8888a8' }}>Platform management & analytics</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="font-rajdhani" style={{
              padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.3)',
              background: 'transparent', color: '#00f0ff', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Download size={14} /> Export
            </button>
            <button className="font-rajdhani" style={{
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #00f0ff, #0088cc)', color: '#000', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <RefreshCw size={14} /> Sync
            </button>
          </div>
        </div>
      </Anim>

      {/* Tabs */}
      <Anim delay={0.05}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
          {['overview', 'users', 'coaches', 'courses', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-rajdhani"
              style={{
                padding: '10px 20px', background: 'none', border: 'none',
                borderBottom: activeTab === tab ? '2px solid #00f0ff' : '2px solid transparent',
                color: activeTab === tab ? '#00f0ff' : '#8888a8',
                fontSize: 13, fontWeight: 700, textTransform: 'uppercase', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </Anim>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <Anim delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14, marginBottom: 24 }}>
              {stats.map((s, i) => (
                <div key={i} className="ix-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.icon size={20} color={s.color} />
                    </div>
                    <span className="font-exo" style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>{s.change}</span>
                  </div>
                  <div className="font-orbitron" style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{s.value}</div>
                  <div className="font-rajdhani" style={{ fontSize: 11, color: '#8888a8', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Anim>

          {/* Recent Activity */}
          <Anim delay={0.15}>
            <div className="ix-card" style={{ padding: 20, marginBottom: 24 }}>
              <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={18} color="#00f0ff" /> Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {recentActivities.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: i < recentActivities.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: `${a.color}12`, border: `1px solid ${a.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <a.icon size={14} color={a.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="font-exo" style={{ fontSize: 13, marginBottom: 2 }}>{a.text}</p>
                      <p className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Anim>
        </>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          {/* Filters */}
          <Anim delay={0.1}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
                <Search size={16} color="#555570" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="font-exo"
                  style={{
                    width: '100%', padding: '10px 12px 10px 40px', borderRadius: 8,
                    border: '1px solid rgba(0,240,255,0.15)', background: '#12121a',
                    color: '#e8e8f0', fontSize: 13, outline: 'none'
                  }}
                />
              </div>
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="font-rajdhani"
                style={{
                  padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,240,255,0.15)',
                  background: '#12121a', color: '#e8e8f0', fontSize: 13, fontWeight: 600,
                  textTransform: 'uppercase', cursor: 'pointer'
                }}
              >
                <option value="all">All Users</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="free">Free</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </Anim>

          {/* Users Table */}
          <Anim delay={0.15}>
            <div className="ix-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>User</th>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Tier</th>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Status</th>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Reviews</th>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>XP</th>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Last Active</th>
                      <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: 16 }}>
                          <div>
                            <div className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{u.name}</div>
                            <div className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{u.email}</div>
                          </div>
                        </td>
                        <td style={{ padding: 16 }}>
                          <span style={{
                            padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 700,
                            background: `${getTierColor(u.tier)}15`, color: getTierColor(u.tier),
                            border: `1px solid ${getTierColor(u.tier)}30`, textTransform: 'uppercase'
                          }}>
                            {u.tier}
                          </span>
                        </td>
                        <td style={{ padding: 16 }}>
                          <span style={{
                            padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 700,
                            background: `${getStatusColor(u.status)}15`, color: getStatusColor(u.status),
                            border: `1px solid ${getStatusColor(u.status)}30`, textTransform: 'uppercase'
                          }}>
                            {u.status}
                          </span>
                        </td>
                        <td className="font-exo" style={{ padding: 16, fontSize: 13, color: '#8888a8' }}>{u.reviews}</td>
                        <td className="font-orbitron" style={{ padding: 16, fontSize: 13, fontWeight: 700, color: '#00f0ff' }}>{u.xp.toLocaleString()}</td>
                        <td className="font-exo" style={{ padding: 16, fontSize: 12, color: '#555570' }}>{u.lastActive}</td>
                        <td style={{ padding: 16 }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button style={{ padding: 6, borderRadius: 6, border: 'none', background: 'rgba(0,240,255,0.1)', color: '#00f0ff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <Eye size={14} />
                            </button>
                            <button style={{ padding: 6, borderRadius: 6, border: 'none', background: 'rgba(255,215,0,0.1)', color: '#ffd700', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <Edit size={14} />
                            </button>
                            <button style={{ padding: 6, borderRadius: 6, border: 'none', background: 'rgba(255,45,85,0.1)', color: '#ff2d55', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <Ban size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Anim>
        </>
      )}

      {/* Coaches Tab */}
      {activeTab === 'coaches' && (
        <Anim delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {mockCoaches.map((c, i) => (
              <div key={i} className="ix-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{c.name}</h3>
                    <p className="font-exo" style={{ fontSize: 12, color: '#8888a8' }}>{c.specialty}</p>
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700,
                    background: c.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(136,136,168,0.15)',
                    color: c.status === 'active' ? '#22c55e' : '#8888a8',
                    border: c.status === 'active' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(136,136,168,0.3)',
                    textTransform: 'uppercase'
                  }}>
                    {c.status}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Rating</div>
                    <div className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, color: '#ffd700', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={14} fill="#ffd700" /> {c.rating}
                    </div>
                  </div>
                  <div>
                    <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Reviews</div>
                    <div className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, color: '#00f0ff' }}>{c.reviews}</div>
                  </div>
                  <div>
                    <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Students</div>
                    <div className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, color: '#a855f7' }}>{c.students}</div>
                  </div>
                  <div>
                    <div className="font-exo" style={{ fontSize: 10, color: '#555570', marginBottom: 2, textTransform: 'uppercase' }}>Earnings</div>
                    <div className="font-orbitron" style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>{c.earnings}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="font-rajdhani" style={{
                    flex: 1, padding: '8px', borderRadius: 6, border: '1px solid rgba(0,240,255,0.3)',
                    background: 'transparent', color: '#00f0ff', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', cursor: 'pointer'
                  }}>
                    View Profile
                  </button>
                  <button style={{ padding: 8, borderRadius: 6, border: 'none', background: 'rgba(255,215,0,0.1)', color: '#ffd700', cursor: 'pointer' }}>
                    <Settings size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Anim>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <Anim delay={0.1}>
          <div className="ix-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Course</th>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Author</th>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Students</th>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Rating</th>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Revenue</th>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Status</th>
                    <th className="font-rajdhani" style={{ padding: 16, textAlign: 'left', fontSize: 11, textTransform: 'uppercase', color: '#8888a8', fontWeight: 700 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td className="font-rajdhani" style={{ padding: 16, fontSize: 14, fontWeight: 700 }}>{c.title}</td>
                      <td className="font-exo" style={{ padding: 16, fontSize: 13, color: '#8888a8' }}>{c.author}</td>
                      <td className="font-orbitron" style={{ padding: 16, fontSize: 13, fontWeight: 700, color: '#a855f7' }}>{c.students}</td>
                      <td className="font-orbitron" style={{ padding: 16, fontSize: 13, fontWeight: 700, color: '#ffd700', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {c.rating > 0 ? <><Star size={12} fill="#ffd700" /> {c.rating}</> : '-'}
                      </td>
                      <td className="font-orbitron" style={{ padding: 16, fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{c.revenue}</td>
                      <td style={{ padding: 16 }}>
                        <span style={{
                          padding: '4px 10px', borderRadius: 6, fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 700,
                          background: c.status === 'published' ? 'rgba(34,197,94,0.15)' : 'rgba(255,140,0,0.15)',
                          color: c.status === 'published' ? '#22c55e' : '#ff8c00',
                          border: c.status === 'published' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,140,0,0.3)',
                          textTransform: 'uppercase'
                        }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button style={{ padding: 6, borderRadius: 6, border: 'none', background: 'rgba(0,240,255,0.1)', color: '#00f0ff', cursor: 'pointer' }}>
                            <Eye size={14} />
                          </button>
                          <button style={{ padding: 6, borderRadius: 6, border: 'none', background: 'rgba(255,215,0,0.1)', color: '#ffd700', cursor: 'pointer' }}>
                            <Edit size={14} />
                          </button>
                          <button style={{ padding: 6, borderRadius: 6, border: 'none', background: 'rgba(255,45,85,0.1)', color: '#ff2d55', cursor: 'pointer' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Anim>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <>
          <Anim delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginBottom: 24 }}>
              <div className="ix-card" style={{ padding: 20 }}>
                <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12, color: '#8888a8' }}>Revenue Growth</h3>
                <div className="font-orbitron" style={{ fontSize: 32, fontWeight: 800, color: '#22c55e', marginBottom: 8 }}>Rp 42.8jt</div>
                <div className="font-exo" style={{ fontSize: 12, color: '#22c55e', marginBottom: 16 }}>↑ 15.7% from last month</div>
                <div style={{ height: 100, background: 'linear-gradient(to top, rgba(34,197,94,0.2), transparent)', borderRadius: 8, position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'rgba(34,197,94,0.3)', borderRadius: '0 0 8px 8px' }} />
                </div>
              </div>

              <div className="ix-card" style={{ padding: 20 }}>
                <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12, color: '#8888a8' }}>User Retention</h3>
                <div className="font-orbitron" style={{ fontSize: 32, fontWeight: 800, color: '#00f0ff', marginBottom: 8 }}>84.2%</div>
                <div className="font-exo" style={{ fontSize: 12, color: '#00f0ff', marginBottom: 16 }}>↑ 3.1% from last month</div>
                <div style={{ height: 100, background: 'linear-gradient(to top, rgba(0,240,255,0.2), transparent)', borderRadius: 8, position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '84%', background: 'rgba(0,240,255,0.3)', borderRadius: '0 0 8px 8px' }} />
                </div>
              </div>

              <div className="ix-card" style={{ padding: 20 }}>
                <h3 className="font-rajdhani" style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12, color: '#8888a8' }}>Avg Session Time</h3>
                <div className="font-orbitron" style={{ fontSize: 32, fontWeight: 800, color: '#a855f7', marginBottom: 8 }}>24.5m</div>
                <div className="font-exo" style={{ fontSize: 12, color: '#a855f7', marginBottom: 16 }}>↑ 12.3% from last month</div>
                <div style={{ height: 100, background: 'linear-gradient(to top, rgba(168,85,247,0.2), transparent)', borderRadius: 8, position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'rgba(168,85,247,0.3)', borderRadius: '0 0 8px 8px' }} />
                </div>
              </div>
            </div>
          </Anim>

          <Anim delay={0.15}>
            <div className="ix-card" style={{ padding: 20 }}>
              <h3 className="font-rajdhani" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>Tier Distribution</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                {[
                  { tier: 'Platinum', count: 124, percent: 25.5, color: '#00f0ff' },
                  { tier: 'Gold', count: 186, percent: 38.3, color: '#ffd700' },
                  { tier: 'Silver', count: 142, percent: 29.2, color: '#c0c0c0' },
                  { tier: 'Free', count: 34, percent: 7.0, color: '#888' },
                ].map((t, i) => (
                  <div key={i} style={{ padding: 16, borderRadius: 8, background: `${t.color}08`, border: `1px solid ${t.color}20` }}>
                    <div className="font-rajdhani" style={{ fontSize: 12, textTransform: 'uppercase', color: '#8888a8', marginBottom: 6 }}>{t.tier}</div>
                    <div className="font-orbitron" style={{ fontSize: 24, fontWeight: 800, color: t.color, marginBottom: 4 }}>{t.count}</div>
                    <div className="font-exo" style={{ fontSize: 11, color: '#555570' }}>{t.percent}% of active subs</div>
                  </div>
                ))}
              </div>
            </div>
          </Anim>
        </>
      )}
    </div>
  )
}
