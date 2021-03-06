import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./sideMenu/SideMenu";

export default function Admin() {
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu />
      <Container component={"main"} maxWidth={false} sx={{ margin: "10px 0" }}>
        <Outlet />
      </Container>
    </Container>
  );
}
