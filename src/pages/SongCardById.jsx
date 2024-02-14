import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteSong, getSongById } from "../../config/firebase";
import { CircularIndeterminate } from "./CircularIndeterminate";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Alert, Box } from "@mui/material";

export function SongCardById() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: songData, isLoading } = useQuery({
    queryKey: ["songs", id],
    queryFn: () => getSongById(id),
  });

  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteSong,
    isPending: isPendingDelete,
    isSuccess: isSuccessDeleted,
  } = useMutation({
    mutationKey: "songs",
    mutationFn: deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      navigate("/");
    },
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <main className="bg-black h-screen flex items-center justify-center">
      <Card className="py-4 flex flex-col gap-3">
        <CardHeader className="pb-0 pt-2 px-4 flex flex-col">
          <p className="text-tiny uppercase font-bold">{songData?.artist}</p>
          <small className="text-default-500">{songData?.genre}</small>
          <h4 className="font-bold text-large">{songData?.title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={270}
          />
        </CardBody>
        {!isSuccessDeleted && (
          <Box className="flex flex-col justify-center items-center">
            <Button
              color="warning"
              className="p-4"
              onClick={() => {
                mutateDeleteSong(songData?.id);
              }}
            >
              Delete Song
            </Button>
          </Box>
        )}
        {isPendingDelete && <CircularIndeterminate />}
        {isSuccessDeleted && (
          <Box className="flex flex-col justify-center items-center">
            <Alert severity="error">Song Deleted</Alert>
          </Box>
        )}
      </Card>
    </main>
  );
}
