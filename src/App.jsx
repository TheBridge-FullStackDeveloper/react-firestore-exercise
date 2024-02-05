import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
