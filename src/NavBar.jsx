import { Link, Outlet } from "react-router-dom";

export function NavBar() {
  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-center m-5">
        <Link to="/songs">Songs</Link>
        <Link to="/create-song">Add New Song</Link>
      </div>
      <Outlet />
    </>
  );
}
