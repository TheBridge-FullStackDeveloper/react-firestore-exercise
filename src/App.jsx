import { Routes, Route } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import { SongList } from "./pages/SongList";
import { SongForm } from "./pages/SongForm";
import { SongCardById } from "./pages/SongCardById";

export function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/" element={<SongList />} />
        <Route path="/:id" element={<SongCardById />} />
        <Route path="/create-song" element={<SongForm />} />
      </Route>
    </Routes>
  );
}
