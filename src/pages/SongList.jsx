import { useQuery } from "@tanstack/react-query";
import { SongCard } from "./SongCard";
import { getSongsByDate } from "../../config/firebase";
import { CircularIndeterminate } from "./CircularIndeterminate";
import { Link } from "react-router-dom";

export function SongList() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongsByDate,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-content items-center gap-4 m-4">
        <CircularIndeterminate className="text-center" />
      </div>
    );
  }

  return (
    <main className="bg-black flex justify-center">
      <div className="flex flex-col gap-4 m-8">
        {songs?.map((singleSong) => {
          return (
            <Link key={singleSong.id} to={singleSong.id}>
              <SongCard singleSong={singleSong} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
