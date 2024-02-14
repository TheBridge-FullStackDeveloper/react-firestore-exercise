import { Outlet } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

const navbarItems = [
  { id: "1", url: "/", name: "Song List" },
  { id: "2", url: "/create-song", name: "Add Song" },
];

export function NavBar() {
  return (
    <>
      <Navbar position="static" className="bg-black text-white">
        <NavbarBrand>
          <p className="font-bold text-inherit">MUSIC API</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {navbarItems.map((item) => (
            <NavbarItem key={item.id}>
              <Link href={item.url} className="text-white">
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
      <Outlet />
    </>
  );
}
