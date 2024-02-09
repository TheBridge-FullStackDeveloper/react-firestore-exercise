import { useQuery } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { SongCard } from "./SongCard";
import {
  getDocs,
  getFirestore,
  deleteDoc,
  collection,
  doc
} from "firebase/firestore";

const getSongs = async () => {
  const querySnapshot = await getDocs(songRef);
  return querySnapshot.docs.map((doc) => doc.data());
};

const deleteSong = async (documentId) => {
  console.log("This is the document id", documentId);
  await deleteDoc(doc(db, "songs", documentId));
};

const firebaseConfig = {
  apiKey: "AIzaSyDowcY9Vc5CvJhJzhDhnB5-sRA4dBcjOS8",
  authDomain: "songs-736c0.firebaseapp.com",
  projectId: "songs-736c0",
  storageBucket: "songs-736c0.appspot.com",
  messagingSenderId: "1060622724434",
  appId: "1:1060622724434:web:cce60b99de860748855e8b",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const songRef = collection(db, "songs");

export function SongList() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  console.log(songs);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col justify-content items-center gap-4 m-4">
      {songs?.map((singleSong, index) => {
        return (
          <SongCard
            singleSong={singleSong}
            deleteSong={deleteSong}
            key={index}
          />
        );
      })}
    </div>
  );
}
