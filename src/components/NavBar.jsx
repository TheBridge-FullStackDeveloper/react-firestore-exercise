import React from "react";
import { Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <div>NavBar</div>
      <Outlet />
    </>
  );
};
