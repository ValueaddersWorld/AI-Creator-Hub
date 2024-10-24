import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { addProject } from '../services/projectService';

interface SubmitProjectFormProps {
  onProjectSubmitted: () => void;
}

const SubmitProjectForm: React.FC<SubmitProjectFormProps> = ({ onProjectSubmitted }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to submit a project');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await addProject({
        title,
        description,
        creator: user.displayName || user.email || 'Anonymous',
        creatorId: user.uid,
        image,
        technologies: technologies.split(',').map(tech => tech.trim()),
        likes: 0,
        shares: 0,
      });
      setTitle('');
      setDescription('');
      setImage('');
      setTechnologies('');
      onProjectSubmitted();
    } catch (err) {
      setError('Failed to submit project. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Project Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Project Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Describe your project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Project Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="url"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technologies">
          Technologies Used
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="technologies"
          type="text"
          placeholder="Enter technologies (comma-separated)"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <div className="flex items-center justify-between">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
      </div>
    </form>
  );
};

export default SubmitProjectForm;