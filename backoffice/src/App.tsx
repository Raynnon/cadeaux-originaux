import "./App.css";
import { useState } from "react";
import SideMenu from "./containers/side-menu/SideMenu";
import { Typography, Container, SvgIcon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

function App() {
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);
  interface MenuItems {
    name: string;
    icon: typeof SvgIcon;
  }

  const menuItems: MenuItems[] = [
    { name: "Products list", icon: FormatListBulletedRoundedIcon },
    { name: "Add product", icon: AddCircleRoundedIcon }
  ];

  const handleSelectedItem = (menuItem: number) => {
    setSelectedMenuItemIndex(menuItem);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu
        menuItems={menuItems}
        OnSelectedItemChange={(menuItem: number) =>
          handleSelectedItem(menuItem)
        }
      />
      <Container component={"main"} maxWidth={false}>
        <Typography variant="h1">
          {menuItems[selectedMenuItemIndex].name}
        </Typography>
      </Container>
    </Container>
  );
}

export default App;
