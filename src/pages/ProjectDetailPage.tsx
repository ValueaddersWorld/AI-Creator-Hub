import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, Share2, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { Project, getProjectById, likeProject, shareProject } from '../services/projectService';
import LoadingSpinner from '../components/LoadingSpinner';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const fetchedProject = await getProjectById(id);
          setProject(fetchedProject);
        }
      } catch (err) {
        setError('Failed to load project details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleLike = async () => {
    if (user && project?.id) {
      try {
        await likeProject(project.id, user.uid);
        setProject(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
      } catch (error) {
        console.error('Error liking project:', error);
        alert('Failed to like project. Please try again.');
      }
    } else {
      alert('Please log in to like projects');
    }
  };

  const handleShare = async () => {
    if (project?.id) {
      try {
        await shareProject(project.id);
        setProject(prev => prev ? { ...prev, shares: prev.shares + 1 } : null);
      } catch (error) {
        console.error('Error sharing project:', error);
        alert('Failed to share project. Please try again.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!project) return <div className="text-center py-12">Project not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/projects" className="flex items-center text-indigo-600 mb-6 hover:underline">
        <ArrowLeft size={20} className="mr-2" />
        Back to Projects
      </Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-gray-600 mb-6">{project.description}</p>
          <div className="flex items-center mb-6">
            <User size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700">{project.creator}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button onClick={handleLike} className="flex items-center text-gray-500 hover:text-indigo-600">
                <ThumbsUp size={20} className="mr-1" />
                <span>{project.likes}</span>
              </button>
              <button onClick={handleShare} className="flex items-center text-gray-500 hover:text-indigo-600">
                <Share2 size={20} className="mr-1" />
                <span>{project.shares}</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Project Details</h2>
            <p className="mb-2"><strong>Created on:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Last updated:</strong> {new Date(project.updatedAt).toLocaleDateString()}</p>
            <p><strong>Technologies used:</strong> {project.technologies.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;