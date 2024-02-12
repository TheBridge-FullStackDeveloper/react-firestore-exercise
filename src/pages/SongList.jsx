import React from "react";
import { collection, getDocs, } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "../modules/firebase";




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
        {data?.map((song) => (
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
