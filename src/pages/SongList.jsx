import React from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getSongs = async () => {
  const querySnapshot = await getDocs(collection(db, "Songs"));
  const songs = [];
  querySnapshot.forEach((doc) => {
    songs.push({ id: doc.id, ...doc.data() });
  });
  return songs;
};

export const SongList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>SongList</div>
      <ul>
        {data.map((song) => (
          <div  key={song.id}>
          <li>{song.title}</li>
          <li>{song.artist}</li>
          <li>{song.genre}</li>
          <li>{song.year}</li>
          </div>
        ))}
      </ul>
    </>
  );
};
