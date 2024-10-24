import React from 'react';
import { ArrowRight, Zap, Lightbulb, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-indigo-800">Welcome to AI Creator Hub</h1>
        <p className="text-xl text-gray-600 mb-8">Empowering innovators to create, build, and profit with AI</p>
        <Link to="/projects" className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Explore Projects
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Zap className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">Showcase Your AI Projects</h3>
          <p className="text-gray-600">Share your most successful AI creations and how they add value to the world.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Lightbulb className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">Discover Powerful AI Tools</h3>
          <p className="text-gray-600">Access a curated list of AI tools to bring your vision to life.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DollarSign className="text-indigo-600 mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2">AI Project Marketplace</h3>
          <p className="text-gray-600">Find ready-made AI project templates to kickstart your next big idea.</p>
        </div>
      </section>

      <section className="bg-indigo-100 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">What have you built with AI?</h2>
        <p className="text-xl text-center text-gray-700 mb-8">Share your AI creation journey and inspire others!</p>
        <div className="text-center">
          <Link to="/projects" className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">Share Your Project</Link>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Featured AI Creations</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img src="https://source.unsplash.com/random/800x400?music" alt="AI-generated music" className="w-full h-64 object-cover rounded-lg mb-6" />
            <h3 className="text-2xl font-semibold mb-2">Digital Afrobeats AI Artist</h3>
            <p className="text-gray-600 mb-4">Discover how AI is revolutionizing the music industry with the release of "We Rise: Wealth Beyond Money" - an album created entirely by an AI artist.</p>
            <Link to="/projects/digital-afrobeats-ai" className="text-indigo-600 font-semibold hover:underline">Learn More</Link>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <img src="https://source.unsplash.com/random/800x400?finance" alt="AI-powered gold trading" className="w-full h-64 object-cover rounded-lg mb-6" />
            <h3 className="text-2xl font-semibold mb-2">Gold Lord AI</h3>
            <p className="text-gray-600 mb-4">Experience the power of AI in finance with Gold Lord AI, providing users with 88-94% accurate gold trading signals daily through advanced market analysis.</p>
            <Link to="/projects/gold-lord-ai" className="text-indigo-600 font-semibold hover:underline">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;