import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Bumper from './components/Bumper'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import LearningInterface from './pages/LearningInterface'
import Community from './pages/CommunityEnhanced'
import Evaluation from './pages/Evaluation'
import AdminDashboard from './pages/AdminDashboard'
import CoachDashboard from './pages/CoachDashboard'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import Billing from './pages/Billing'
import { Events, Scouting, Pricing, Notifications } from './pages/OtherPages'

export default function App() {
  const [showBumper, setShowBumper] = useState(true)

  return (
    <>
      {showBumper && <Bumper onComplete={() => setShowBumper(false)} />}

      {!showBumper && (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/learn/:courseId/:lessonId" element={<LearningInterface />} />
                <Route path="/community" element={<Community />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/events" element={<Events />} />
                <Route path="/scouting" element={<Scouting />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/coach" element={<CoachDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </>
          } />
        </Routes>
      )}
    </>
  )
}
