import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/SignupPage';
import Navbar from './pages/components/Navbar';
import VerificationPage from './pages/components/VerificationEmail/VerificationEmail';
import ResendVerificationPage from './pages/components/VerificationEmail/ResendVerificationEmail';
import React from 'react';
import AuthProvider from './pages/auth/AuthProvider';

export default function App() {

  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          <Route path="/user/:username" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/resend" element={<ResendVerificationPage />} />

          <Route path="/login" element={< LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}