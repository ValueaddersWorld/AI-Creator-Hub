import React, { useState, useEffect } from 'react';
import { Image, Music, Video, Bot, Code, Brain } from 'lucide-react';
import { Tool, getTools } from '../services/toolService';
import LoadingSpinner from '../components/LoadingSpinner';

const ToolsPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTools = async (reset: boolean = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    setError(null);
    try {
      const { tools: newTools, lastId: newLastId } = await getTools(10, reset ? null : lastId);
      setTools(prev => reset ? newTools : [...prev, ...newTools]);
      setLastId(newLastId);
      setHasMore(newTools.length === 10);
    } catch (error) {
      console.error('Error fetching tools:', error);
      setError('Failed to load tools. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools(true);
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Image': return <Image className="text-indigo-600" size={48} />;
      case 'Music': return <Music className="text-indigo-600" size={48} />;
      case 'Video': return <Video className="text-indigo-600" size={48} />;
      case 'Bot': return <Bot className="text-indigo-600" size={48} />;
      case 'Code': return <Code className="text-indigo-600" size={48} />;
      case 'Brain': return <Brain className="text-indigo-600" size={48} />;
      default: return <Image className="text-indigo-600" size={48} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Powerful AI Tools</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Discover cutting-edge AI tools to bring your creative vision to life.</p>
      
      {loading && tools.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              {getIconComponent(tool.icon)}
              <h3 className="text-xl font-semibold mt-4 mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <a
                href={tool.link}
                className="mt-auto bg-indigo-100 text-indigo-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-indigo-200 transition-colors"
              >
                Explore Tool
              </a>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchTools()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-16 bg-indigo-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">Can't find what you're looking for?</h2>
        <p className="text-xl text-gray-700 mb-8">We're constantly adding new AI tools to our collection. Let us know what you need!</p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Request a Tool
        </button>
      </div>
    </div>
  );
};

export default ToolsPage;