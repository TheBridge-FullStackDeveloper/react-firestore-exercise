import { useQuery } from "@tanstack/react-query";
import { SongCard } from "./SongCard";
import { getSongsByDate } from "../../config/firebase";

export function SongList() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["songs"], //This defines a unique identifier for the query. Any subsequent re-fetches based on the same queryKey will reuse cached data if available.
    queryFn: getSongsByDate, //The function that the query will use to request data.
  });

  //It stores the fetched data in the songs variable.

  console.log(songs);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col justify-content items-center gap-4 m-4">
      {songs?.map((singleSong) => {
        return <SongCard singleSong={singleSong} key={singleSong.id} />;
      })}
    </div>
  );
}
