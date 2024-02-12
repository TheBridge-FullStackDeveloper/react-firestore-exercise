import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
    <Navbar shouldHideOnScroll>
      <NavbarBrand as={Link} href="/" >
        <p className="font-bold text-inherit">HOME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/songs">
            Song list
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Placeholder
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Another Placeholder
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/newsong" variant="flat">
            Post New Song
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <Outlet />
    </>
  );
};
