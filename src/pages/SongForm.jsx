import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { SingleInput } from "./SingleInput";
import { Button } from "@nextui-org/react";
import { setNewSong } from "../../config/firebase"; //Go up two levels in the directory structure.
import { CircularIndeterminate } from "./CircularIndeterminate";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";

export function SongForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inputArray = [
    { id: "1", name: "title", type: "string", error: errors.title },
    { id: "2", name: "artist", type: "string", error: errors.artist },
    { id: "3", name: "year", type: "number", error: errors.year },
    { id: "4", name: "genre", type: "string", error: errors.genre },
  ];

  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateSong,
    isPending: isPendingCreation,
    isSuccess: isSuccessCreated,
  } = useMutation({
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
    <main className="bg-black h-screen flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
      >
        <h1 className="text-white">Add your song to the list</h1>
        {inputArray.map((input) => {
          return (
            <SingleInput
              control={control}
              reset={reset}
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

      {isPendingCreation && (
        <Box className="flex flex-col justify-center items-center mt-10 gap-3">
          <CircularIndeterminate />
        </Box>
      )}

      {isSuccessCreated && (
        <Box className="flex flex-col justify-center items-center mt-10 gap-3">
          <Alert severity="success">Your song was succesfully created. </Alert>
        </Box>
      )}
    </main>
  );
}
