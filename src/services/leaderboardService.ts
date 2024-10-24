import { database } from '../firebase';
import { ref, query, orderByChild, limitToLast, get } from 'firebase/database';

export const getLeaderboard = async (limit: number = 10) => {
  const leaderboardRef = ref(database, 'leaderboard');
  const leaderboardQuery = query(leaderboardRef, orderByChild('totalLikes'), limitToLast(limit));
  const snapshot = await get(leaderboardQuery);
  
  if (snapshot.exists()) {
    const leaderboard = [];
    snapshot.forEach((childSnapshot) => {
      leaderboard.unshift({ ...childSnapshot.val(), userId: childSnapshot.key });
    });
    return leaderboard;
  }
  
  return [];
};