import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Assessment from './pages/Assessment'
import Resources from './pages/Resources'
import Community from './pages/Community'
import Counseling from './pages/Counseling'
import Emergency from './pages/Emergency'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import CounselorDashboard from './pages/CounselorDashboard'
import MeditationPage from './pages/MeditationPage'
import ExercisePage from './pages/ExercisePage'
import StrategyPage from './pages/StrategyPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/resources" element={
                    <ProtectedRoute>
                        <Resources />
                    </ProtectedRoute>
                } />
                <Route path="/resources/meditation/:type" element={
                    <ProtectedRoute>
                        <MeditationPage />
                    </ProtectedRoute>
                } />
                <Route path="/resources/exercises/:type" element={
                    <ProtectedRoute>
                        <ExercisePage />
                    </ProtectedRoute>
                } />
                <Route path="/resources/strategies/:slug" element={
                    <ProtectedRoute>
                        <StrategyPage />
                    </ProtectedRoute>
                } />
                <Route path="/community" element={<Community />} />
                <Route path="/counseling" element={<Counseling />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
            </Routes>
        </AuthProvider>
    )
}

export default App
