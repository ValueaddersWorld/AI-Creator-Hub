import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ToolsPage from './pages/ToolsPage';
import MarketplacePage from './pages/MarketplacePage';
import PricingPage from './pages/PricingPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AIVisionForgePage from './pages/AIVisionForgePage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/ai-vision-forge" element={<AIVisionForgePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;