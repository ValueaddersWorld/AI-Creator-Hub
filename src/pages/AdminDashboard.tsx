import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { getAdminStats } from '../services/adminService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AdminStats {
  totalUsers: number;
  totalProjects: number;
  totalTools: number;
  totalMarketplaceItems: number;
  userGrowth: { date: string; count: number }[];
  projectGrowth: { date: string; count: number }[];
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminStats = await getAdminStats();
        setStats(adminStats);
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to load admin statistics');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.isAdmin) {
      fetchStats();
    } else {
      setError('You do not have permission to view this page');
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return null;

  const userGrowthData = {
    labels: stats.userGrowth.map(item => item.date),
    datasets: [
      {
        label: 'New Users',
        data: stats.userGrowth.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const projectGrowthData = {
    labels: stats.projectGrowth.map(item => item.date),
    datasets: [
      {
        label: 'New Projects',
        data: stats.projectGrowth.map(item => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalProjects}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Tools</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalTools}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Marketplace Items</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalMarketplaceItems}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User Growth</h2>
          <Bar data={userGrowthData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Project Growth</h2>
          <Bar data={projectGrowthData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;