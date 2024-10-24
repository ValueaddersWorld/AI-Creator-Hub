import { database } from '../firebase';
import { ref, push, set, get, remove, update, query, orderByChild, limitToLast, startAfter } from 'firebase/database';

export interface Tool {
  id?: string;
  name: string;
  description: string;
  icon: string;
  link: string;
  category: string;
}

const toolsRef = ref(database, 'tools');

export const addTool = async (tool: Omit<Tool, 'id'>) => {
  const newToolRef = push(toolsRef);
  await set(newToolRef, tool);
  return newToolRef.key;
};

export const getTools = async (limit: number = 10, startAfterId: string | null = null): Promise<{ tools: Tool[], lastId: string | null }> => {
  let toolsQuery = query(toolsRef, orderByChild('name'), limitToLast(limit));

  if (startAfterId) {
    const startAfterTool = await getToolById(startAfterId);
    if (startAfterTool) {
      toolsQuery = query(toolsQuery, startAfter(startAfterTool.name));
    }
  }

  const snapshot = await get(toolsQuery);
  const tools: Tool[] = [];
  snapshot.forEach((childSnapshot) => {
    tools.unshift({ id: childSnapshot.key, ...childSnapshot.val() });
  });

  const lastId = tools.length > 0 ? tools[tools.length - 1].id : null;

  return { tools, lastId };
};

export const getToolById = async (id: string): Promise<Tool | null> => {
  const snapshot = await get(ref(database, `tools/${id}`));
  if (snapshot.exists()) {
    return { id: snapshot.key, ...snapshot.val() };
  }
  return null;
};

export const updateTool = async (id: string, updates: Partial<Tool>) => {
  await update(ref(database, `tools/${id}`), updates);
};

export const deleteTool = async (id: string) => {
  await remove(ref(database, `tools/${id}`));
};