import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, User, BarChart2, Zap, Menu, X } from 'lucide-react';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Cpu size={32} />
            <span>AI Creator Hub</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-indigo-200 transition-colors">Projects</Link>
            <Link to="/tools" className="hover:text-indigo-200 transition-colors">AI Tools</Link>
            <Link to="/marketplace" className="hover:text-indigo-200 transition-colors">Marketplace</Link>
            <Link to="/leaderboard" className="hover:text-indigo-200 transition-colors">Leaderboard</Link>
            <Link to="/pricing" className="hover:text-indigo-200 transition-colors">Pricing</Link>
            <Link to="/ai-vision-forge" className="flex items-center hover:text-indigo-200 transition-colors">
              <Zap size={20} className="mr-1" />
              AI Vision Forge
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors">
                  <User size={24} />
                  <span>Profile</span>
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors">
                    <BarChart2 size={24} />
                    <span>Admin</span>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-400 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-indigo-500">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
              <Link to="/projects" className="hover:text-indigo-200 transition-colors">Projects</Link>
              <Link to="/tools" className="hover:text-indigo-200 transition-colors">AI Tools</Link>
              <Link to="/marketplace" className="hover:text-indigo-200 transition-colors">Marketplace</Link>
              <Link to="/leaderboard" className="hover:text-indigo-200 transition-colors">Leaderboard</Link>
              <Link to="/pricing" className="hover:text-indigo-200 transition-colors">Pricing</Link>
              <Link to="/ai-vision-forge" className="flex items-center hover:text-indigo-200 transition-colors">
                <Zap size={20} className="mr-1" />
                AI Vision Forge
              </Link>

              {user ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors">
                    <User size={24} />
                    <span>Profile</span>
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors">
                      <BarChart2 size={24} />
                      <span>Admin</span>
                    </Link>
                  )}
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-400 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Header;