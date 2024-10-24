import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/leaderboardService';
import LoadingSpinner from '../components/LoadingSpinner';

interface LeaderboardEntry {
  userId: string;
  username: string;
  projectCount: number;
  totalLikes: number;
  totalShares: number;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Creator Leaderboard</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Top creators with the most successful AI projects</p>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Creator</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Projects</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Likes</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Shares</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.map((entry, index) => (
              <tr key={entry.userId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.projectCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.totalLikes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.totalShares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;