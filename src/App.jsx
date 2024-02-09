import { Routes, Route } from "react-router-dom";
import { NavBar } from "./NavBar";
import { SongList } from "./SongList";
import { SongForm } from "./SongForm";

export function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/songs" element={<SongList />} />
        <Route path="/create-song" element={<SongForm />} />
      </Route>
    </Routes>
  );
}
