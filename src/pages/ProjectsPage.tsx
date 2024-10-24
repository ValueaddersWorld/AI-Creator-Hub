import React, { useState, useEffect } from 'react';
import { ThumbsUp, Share2 } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { Project, getProjects, likeProject, shareProject } from '../services/projectService';
import SubmitProjectForm from '../components/SubmitProjectForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lastId, setLastId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const fetchProjects = async (reset: boolean = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    setError(null);
    try {
      const { projects: newProjects, lastId: newLastId } = await getProjects(10, reset ? null : lastId);
      setProjects(prev => reset ? newProjects : [...prev, ...newProjects]);
      setLastId(newLastId);
      setHasMore(newProjects.length === 10);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(true);
  }, []);

  const handleLike = async (projectId: string) => {
    if (user) {
      try {
        await likeProject(projectId, user.uid);
        const updatedProjects = projects.map(p => 
          p.id === projectId ? { ...p, likes: p.likes + 1 } : p
        );
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error liking project:', error);
        alert('Failed to like project. Please try again.');
      }
    } else {
      alert('Please log in to like projects');
    }
  };

  const handleShare = async (projectId: string) => {
    try {
      await shareProject(projectId);
      const updatedProjects = projects.map(p => 
        p.id === projectId ? { ...p, shares: p.shares + 1 } : p
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error sharing project:', error);
      alert('Failed to share project. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Successful AI Projects</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Discover how creators are using AI to bring their visions to life and add value to the world.</p>
      
      {loading && projects.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-sm text-indigo-600 mb-4">Created by: {project.creator}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => project.id && handleLike(project.id)} className="flex items-center text-gray-500 hover:text-indigo-600">
                      <ThumbsUp size={16} className="mr-1" />
                      {project.likes}
                    </button>
                    <button onClick={() => project.id && handleShare(project.id)} className="flex items-center text-gray-500 hover:text-indigo-600">
                      <Share2 size={16} className="mr-1" />
                      {project.shares}
                    </button>
                  </div>
                  <Link to={`/projects/${project.id}`} className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-200 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchProjects()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Share Your AI Project</h2>
        <p className="text-xl text-gray-600 mb-8">Inspire others with your AI creation and showcase how it adds value.</p>
        {showSubmitForm ? (
          <SubmitProjectForm onProjectSubmitted={() => {
            setShowSubmitForm(false);
            fetchProjects(true);
          }} />
        ) : (
          <button
            onClick={() => setShowSubmitForm(true)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Submit Your Project
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;