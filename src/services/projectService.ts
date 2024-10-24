import { database } from '../firebase';
import { ref, push, set, get, remove, update, query, orderByChild, limitToLast, startAfter } from 'firebase/database';

export interface Project {
  id?: string;
  title: string;
  description: string;
  creator: string;
  creatorId: string;
  image: string;
  likes: number;
  shares: number;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

const projectsRef = ref(database, 'projects');

export const addProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newProjectRef = push(projectsRef);
  const now = new Date().toISOString();
  const newProject = {
    ...project,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    shares: 0
  };
  await set(newProjectRef, newProject);
  return newProjectRef.key;
};

export const getProjects = async (limit: number = 10, startAfterId: string | null = null): Promise<{ projects: Project[], lastId: string | null }> => {
  let projectsQuery = query(projectsRef, orderByChild('createdAt'), limitToLast(limit));

  if (startAfterId) {
    const startAfterProject = await getProjectById(startAfterId);
    if (startAfterProject) {
      projectsQuery = query(projectsQuery, startAfter(startAfterProject.createdAt));
    }
  }

  const snapshot = await get(projectsQuery);
  const projects: Project[] = [];
  snapshot.forEach((childSnapshot) => {
    projects.unshift({ id: childSnapshot.key, ...childSnapshot.val() });
  });

  const lastId = projects.length > 0 ? projects[projects.length - 1].id : null;

  return { projects, lastId };
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const snapshot = await get(ref(database, `projects/${id}`));
  if (snapshot.exists()) {
    return { id: snapshot.key, ...snapshot.val() };
  }
  return null;
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  const updatedProject = {
    ...updates,
    updatedAt: new Date().toISOString()
  };
  await update(ref(database, `projects/${id}`), updatedProject);
};

export const deleteProject = async (id: string) => {
  await remove(ref(database, `projects/${id}`));
};

export const likeProject = async (projectId: string, userId: string) => {
  const projectRef = ref(database, `projects/${projectId}`);
  const userLikesRef = ref(database, `userLikes/${userId}/${projectId}`);

  const [projectSnapshot, userLikeSnapshot] = await Promise.all([
    get(projectRef),
    get(userLikesRef)
  ]);

  if (userLikeSnapshot.exists()) {
    throw new Error('User has already liked this project');
  }

  const currentLikes = projectSnapshot.val().likes || 0;

  await Promise.all([
    update(projectRef, { likes: currentLikes + 1, updatedAt: new Date().toISOString() }),
    set(userLikesRef, true)
  ]);
};

export const shareProject = async (projectId: string) => {
  const projectRef = ref(database, `projects/${projectId}`);
  const snapshot = await get(projectRef);
  const currentShares = snapshot.val().shares || 0;
  await update(projectRef, { shares: currentShares + 1, updatedAt: new Date().toISOString() });
};