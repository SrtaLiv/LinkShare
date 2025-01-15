import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/SignupPage';
import Navbar from './pages/components/Navbar';
import VerificationPage from './pages/components/VerificationEmail/VerificationEmail';
import ResendVerificationPage from './pages/components/VerificationEmail/ResendVerificationEmail';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/resend" element={<ResendVerificationPage />} />

        <Route path="/login" element={< LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}