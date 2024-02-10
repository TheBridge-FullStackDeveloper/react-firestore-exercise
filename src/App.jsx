import { Routes, Route } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import { SongList } from "./pages/SongList";
import { SongForm } from "./pages/SongForm";
import { Index } from "./pages/Index";

export function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/" element={<Index />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/create-song" element={<SongForm />} />
      </Route>
    </Routes>
  );
}
