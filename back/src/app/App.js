import "./App.css";
import { Outlet } from "react-router-dom";

import SideMenu from "../components/sideMenu/SideMenu";
import { Container } from "@mui/material";

function App() {
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu />
      <Outlet />
    </Container>
  );
}

export default App;
