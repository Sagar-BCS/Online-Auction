import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storageApp, firestoreApp } from '../config/firebase';

export const useStorage = (data) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const startUpload = (file) => {
    const storageRef = ref(storageApp, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = serverTimestamp();
        
        await addDoc(collection(firestoreApp, 'auctions'), {
          ...data,
          createdAt,
          imgUrl: url,
        });
        
        setIsCompleted(true);
      }
    );
  };

  return { progress, error, isCompleted, startUpload };
};
