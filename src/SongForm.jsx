import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SingleInput } from "./SingleInput";
import { Button } from "@nextui-org/react";

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

const deleteSong = async (documentId) => {
  console.log("This is the document id", documentId);
  await deleteDoc(doc(db, "songs", documentId));
};

export function SongForm() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inputArray = [
    { id: "1", name: "title", type: "string", error: errors.title },
    { id: "2", name: "artist", type: "string", error: errors.artist },
    { id: "3", name: "year", type: "number", error: errors.year },
    { id: "4", name: "genre", type: "string", error: errors.genre },
  ];

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: "songs",
    mutationFn: setNewSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });

  const onSubmit = (data) => {
    const newData = { ...data };
    console.log(newData);
    mutate(newData);
  };

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
        {inputArray.map((input, id) => {
          return (
            <SingleInput
              control={control}
              name={input.name}
              type={input.type}
              key={id}
              error={input.error}
            />
          );
        })}

        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
}
