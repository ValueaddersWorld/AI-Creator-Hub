import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">AI Creator Hub</h3>
            <p className="text-gray-400">Empowering creators to build the future with AI.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/valueaddersworld" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com/valueaddersworld" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/company/valueaddersworld" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@valueaddersworld.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">AI Tools</Link></li>
              <li><Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/ai-vision-forge" className="text-gray-400 hover:text-white transition-colors">AI Vision Forge</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay updated with the latest AI innovations.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} AI Creator Hub. All rights reserved.
            </p>
            <p className="text-gray-400 mt-2 md:mt-0 text-center md:text-right">
              Powered by <a href="https://valueaddersworld.com" className="text-indigo-400 hover:text-indigo-300">Value Adders World</a>
            </p>
          </div>
          <div className="mt-4 flex justify-center md:justify-start space-x-4 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;