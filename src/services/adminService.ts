import { database } from '../firebase';
import { ref, get } from 'firebase/database';

export const getAdminStats = async () => {
  const statsRef = ref(database, 'adminStats');
  const snapshot = await get(statsRef);
  if (snapshot.exists()) {
    return snapshot.val();
  }
  throw new Error('Admin stats not found');
};