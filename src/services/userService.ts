import { database, auth } from '../firebase';
import { ref, set, get, update } from 'firebase/database';
import { updateProfile } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  bio: string;
  website: string;
  twitterHandle: string;
  githubUsername: string;
  createdAt: string;
  updatedAt: string;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snapshot = await get(ref(database, `users/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  const updatedProfile = {
    ...updates,
    updatedAt: new Date().toISOString()
  };
  await update(ref(database, `users/${uid}`), updatedProfile);
  if (updates.displayName && auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: updates.displayName });
  }
};

export const createUserProfile = async (user: UserProfile) => {
  const newUser = {
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  await set(ref(database, `users/${user.uid}`), newUser);
};