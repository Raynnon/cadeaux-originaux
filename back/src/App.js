import { useSelector } from "react-redux";
import menuItemsComponents from "./components/MenuComponents";

import SideMenu from "./containers/SideMenu";
import { Typography, Container } from "@mui/material";

function App() {
  const selectedMenuItemId = useSelector(
    (state) => state.menu.selectedMenuItemId
  );

  const menuItems = useSelector((state) => state.menu.menuItems);

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu />
      <Container component={"main"} maxWidth={false}>
        <Typography variant="h1">
          {menuItems[selectedMenuItemId].name}
        </Typography>
        {menuItemsComponents[selectedMenuItemId].compo}
      </Container>
    </Container>
  );
}

export default App;
