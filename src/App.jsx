import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Bumper from './components/Bumper'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Courses from './pages/Courses'
import Community from './pages/Community'
import Evaluation from './pages/Evaluation'
import { Events, Scouting, Pricing, CoachDashboard, Notifications, Login } from './pages/OtherPages'

export default function App() {
  const [showBumper, setShowBumper] = useState(true)

  return (
    <>
      {showBumper && <Bumper onComplete={() => setShowBumper(false)} />}

      {!showBumper && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/community" element={<Community />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/events" element={<Events />} />
                <Route path="/scouting" element={<Scouting />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/coach" element={<CoachDashboard />} />
                <Route path="/notifications" element={<Notifications />} />
              </Routes>
            </>
          } />
        </Routes>
      )}
    </>
  )
}
