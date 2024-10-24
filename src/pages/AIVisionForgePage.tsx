import React from 'react';
import AIVisionForge from '../components/AIVisionForge';

const AIVisionForgePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">AI Vision Forge</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">
        Collaborate with our AI Co-Pilot to refine your ideas and bring your AI projects to life.
      </p>
      <AIVisionForge />
      <div className="mt-12 bg-indigo-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">How to use AI Vision Forge</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Describe your AI project idea or concept</li>
          <li>Ask for suggestions on technologies, tools, or approaches</li>
          <li>Seek guidance on potential challenges and solutions</li>
          <li>Explore use cases and applications for your AI project</li>
          <li>Request help with breaking down your project into manageable steps</li>
        </ul>
      </div>
    </div>
  );
};

export default AIVisionForgePage;