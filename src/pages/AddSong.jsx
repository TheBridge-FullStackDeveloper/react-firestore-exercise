import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../modules/firebase";
import { collection, doc, setDoc } from "firebase/firestore";


const songRef = collection(db, "Songs");
export const AddSong = () => {

  const setSong = async (data) => {
    await setDoc(doc(songRef), data)
  }
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setSong(data)
      
    }    
  

  console.log(watch("example"))

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Add a Song</h1>
        <form
          className="flex flex-col flex-wrap justify-between h-full max-w-screen-md mx-auto"
          method="post"
          action="/addSong"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 px-2 md:grid-cols-2 gap-4">
            <Input
              key="title"
              type="text"
              label="Title"
              labelPlacement="outside"
              {...register("title", { required: true })}
            />

            <Input
              key="artist"
              type="text"
              label="Artist"
              labelPlacement="outside"
              {...register("artist", { required: true })}
            />

            <Input
              key="genre"
              type="text"
              label="Genre"
              labelPlacement="outside"
              {...register("genre", { required: true })}
            />

            <Input
              key="year"
              type="number"
              label="Year"
              labelPlacement="outside"
              {...register("year", { required: true })}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="ghost"
            className="self-center my-4"
          >
            Submit
          </Button>
        </form>
    </>
  );
};
