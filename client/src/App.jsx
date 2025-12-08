import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Assessment from './pages/Assessment'
import Resources from './pages/Resources'
import Community from './pages/Community'
import Counseling from './pages/Counseling'
import Emergency from './pages/Emergency'
import Admin from './pages/Admin'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/community" element={<Community />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}

export default App
