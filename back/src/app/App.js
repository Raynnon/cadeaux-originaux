import "./App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../app/state/slices/categoriesSlice";

import SideMenu from "../components/sideMenu/SideMenu";
import { Container } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu />
      <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
        <Outlet />
      </Container>
    </Container>
  );
}

export default App;
