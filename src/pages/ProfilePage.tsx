import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile, getUserProfile, updateUserProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userProfile = await getUserProfile(user.uid);
          setProfile(userProfile);
          setEditedProfile(userProfile || {});
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError('Failed to load user profile. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateUserProfile(user.uid, editedProfile);
        setProfile({ ...profile, ...editedProfile } as UserProfile);
        setIsEditing(false);
      } catch (err) {
        console.error('Error updating user profile:', err);
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                Display Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayName"
                type="text"
                name="displayName"
                value={editedProfile.displayName || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bio"
                name="bio"
                value={editedProfile.bio || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                Website
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="website"
                type="url"
                name="website"
                value={editedProfile.website || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitterHandle">
                Twitter Handle
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="twitterHandle"
                type="text"
                name="twitterHandle"
                value={editedProfile.twitterHandle || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="githubUsername">
                GitHub Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="githubUsername"
                type="text"
                name="githubUsername"
                value={editedProfile.githubUsername || ''}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p className="mb-4"><strong>Email:</strong> {user.email}</p>
            <p className="mb-4"><strong>Display Name:</strong> {profile?.displayName}</p>
            <p className="mb-4"><strong>Bio:</strong> {profile?.bio}</p>
            <p className="mb-4"><strong>Website:</strong> {profile?.website}</p>
            <p className="mb-4"><strong>Twitter:</strong> {profile?.twitterHandle}</p>
            <p className="mb-4"><strong>GitHub:</strong> {profile?.githubUsername}</p>
            <button
              onClick={handleEdit}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors mr-2"
            >
              Edit Profile
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;