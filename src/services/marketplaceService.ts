import { database } from '../firebase';
import { ref, push, set, get, remove, update, query, orderByChild, limitToLast, startAfter } from 'firebase/database';

export interface MarketplaceItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  image: string;
  category: string;
}

const marketplaceRef = ref(database, 'marketplace');

export const addMarketplaceItem = async (item: Omit<MarketplaceItem, 'id'>) => {
  const newItemRef = push(marketplaceRef);
  await set(newItemRef, item);
  return newItemRef.key;
};

export const getMarketplaceItems = async (limit: number = 10, startAfterId: string | null = null): Promise<{ items: MarketplaceItem[], lastId: string | null }> => {
  let itemsQuery = query(marketplaceRef, orderByChild('downloads'), limitToLast(limit));

  if (startAfterId) {
    const startAfterItem = await getMarketplaceItemById(startAfterId);
    if (startAfterItem) {
      itemsQuery = query(itemsQuery, startAfter(startAfterItem.downloads));
    }
  }

  const snapshot = await get(itemsQuery);
  const items: MarketplaceItem[] = [];
  snapshot.forEach((childSnapshot) => {
    items.unshift({ id: childSnapshot.key, ...childSnapshot.val() });
  });

  const lastId = items.length > 0 ? items[items.length - 1].id : null;

  return { items, lastId };
};

export const getMarketplaceItemById = async (id: string): Promise<MarketplaceItem | null> => {
  const snapshot = await get(ref(database, `marketplace/${id}`));
  if (snapshot.exists()) {
    return { id: snapshot.key, ...snapshot.val() };
  }
  return null;
};

export const updateMarketplaceItem = async (id: string, updates: Partial<MarketplaceItem>) => {
  await update(ref(database, `marketplace/${id}`), updates);
};

export const deleteMarketplaceItem = async (id: string) => {
  await remove(ref(database, `marketplace/${id}`));
};

export const incrementDownloads = async (id: string) => {
  const itemRef = ref(database, `marketplace/${id}`);
  await update(itemRef, { downloads: (await get(itemRef)).val().downloads + 1 });
};