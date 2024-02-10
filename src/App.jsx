import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Homepage } from "./pages/Homepage";
import { SongList } from "./pages/SongList";
import { AddSong } from "./pages/AddSong";

function App() {
  return (
   
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/songs" element={<SongList />} />
          <Route path="/newsong" element={<AddSong />} />
        </Route>
      </Routes>
  );
}

export default App;
