import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SingleInput } from "./SingleInput";
import { Button } from "@nextui-org/react";
import { setNewSong } from "../../config/firebase"; //Go up two levels in the directory structure.

export function SongForm() {
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

  const { mutate: mutateCreateSong } = useMutation({
    mutationKey: "songs",
    mutationFn: setNewSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });

  const onSubmit = (data) => {
    mutateCreateSong(data);
  };

  return (
    <main className="bg-black">
      <h1 className="text-center text-white m-4">My songs</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-10 gap-3"
      >
        {inputArray.map((input) => {
          return (
            <SingleInput
              control={control}
              name={input.name}
              type={input.type}
              key={input.id}
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
