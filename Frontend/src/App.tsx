import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterPage } from './pages/RegisterPage';
import Navbar from './components/Navbar';
import VerificationPage from './components/VerificationEmail/VerificationEmail';
import ResendVerificationPage from './components/VerificationEmail/ResendVerificationEmail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from './context/GlobalContext';
import { LoginPage } from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/user/:username" element={<HomePage />} />

            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/resend" element={<ResendVerificationPage />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </QueryClientProvider>

  )
}