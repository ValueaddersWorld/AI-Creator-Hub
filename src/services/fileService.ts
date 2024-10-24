import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];

export const uploadFile = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit of 10MB');
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('File type not allowed. Allowed types: JPEG, PNG, PDF, TXT');
  }

  const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
};