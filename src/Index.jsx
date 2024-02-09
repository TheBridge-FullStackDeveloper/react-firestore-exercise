import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SingleInput } from "./SingleInput";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { SongCard } from "./SongCard";

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

const getSongs = async () => {
  const querySnapshot = await getDocs(songRef);
  return querySnapshot.docs.map((doc) => doc.data());
};

const setNewSong = async (data) => {
  await setDoc(doc(songRef), data);
};

export function Index() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationKey: "songs",
    mutationFn: setNewSong,
  });

  const onSubmit = (data) => {
    mutate(data);
    console.log(data);
  };

  const [liked, setLiked] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <main className="bg-black">
      <h1 className="text-center text-white m-4">My songs</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-10 gap-3"
      >
        <SingleInput
          control={control}
          name="title"
          type="string"
          error={errors.title}
        />
        <SingleInput
          control={control}
          name="artist"
          type="string"
          error={errors.artist}
        />
        <SingleInput
          control={control}
          name="year"
          type="number"
          error={errors.year}
        />
        <SingleInput
          control={control}
          name="genre"
          type="string"
          error={errors.genre}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>

      <div className="flex flex-col justify-content items-center gap-4 m-4">
        {songs.map((singleSong, index) => {
          return <SongCard singleSong={singleSong} key={index} liked={liked} setLiked={setLiked} />;
        })}
      </div>
    </main>
  );
}
