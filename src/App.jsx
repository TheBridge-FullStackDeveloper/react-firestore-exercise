import { Routes, Route } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Index } from "./Index";

export function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/" element={<Index />} />
      </Route>
    </Routes>
  );
}
