import React, { useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../modules/firebase";
import { Card, Skeleton } from "@nextui-org/react";

const getSongs = async () => {
  const querySnapshot = await getDocs(collection(db, "Songs"));
  const songs = [];
  querySnapshot.forEach((doc) => {
    songs.push({ id: doc.id, ...doc.data() });
  });
  songs.sort((a, b) => a.year - b.year);

  return songs;
};

export const SongList = () => {
  const queryClient = useQueryClient();
  const [deleteMessage, setDeleteMessage] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  async function deleteSongs(documentId) {
    await deleteDoc(doc(db, "Songs", documentId));
    queryClient.refetchQueries(["songs"]);
    setDeleteMessage("Song successfully deleted!");
  }

  if (isLoading)
    return (
      <>
        <h1 className="text-3xl font-bold text-center">Loading</h1>
        <div className="flex justify-center items-center">
          <Card className="w-[400px] space-y-5 p-4 " radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        </div>
      </>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Song List</h1>
      <div className="h-full max-w-screen-md mx-auto">
        {deleteMessage && (
          <div className="text-green-600 text-center mb-4">{deleteMessage}</div>
        )}
        <ul className="border border-gray-200 rounded-md shadow-md">
          {data?.map((song) => (
            <div key={song.id} className="relative">
              <li className="p-4 border-b border-gray-200">
                <div className="text-lg font-semibold">{song.title}</div>
                <div className="text-gray-600">{song.artist}</div>
                <div className="text-gray-600">{song.genre}</div>
                <div className="text-gray-600">{song.year}</div>
                <button
                  className="absolute bottom-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteSongs(song.id)}
                >
                  Delete
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
