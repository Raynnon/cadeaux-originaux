import "./App.css";
import { useState } from "react";
import SideMenu from "./containers/side-menu/SideMenu";
import { Typography, Container, SvgIcon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import AddProduct from "./component/main/AddProduct";

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState({
    name: "Products list",
    icon: FormatListBulletedRoundedIcon,
    compo: <AddProduct />
  });

  interface MenuItems {
    name: string;
    icon: typeof SvgIcon;
    compo: JSX.Element;
  }

  const menuItems: MenuItems[] = [
    {
      name: "Products list",
      icon: FormatListBulletedRoundedIcon,
      compo: <AddProduct />
    },
    { name: "Add product", icon: AddCircleRoundedIcon, compo: <AddProduct /> }
  ];

  const handleSelectedItem = (menuItemIndex: number) => {
    setSelectedMenuItem(menuItems[menuItemIndex]);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu
        menuItems={menuItems}
        OnSelectedItemChange={(menuItemIndex: number) =>
          handleSelectedItem(menuItemIndex)
        }
      />
      <Container component={"main"} maxWidth={false}>
        <Typography variant="h1">{selectedMenuItem.name}</Typography>
        {selectedMenuItem.compo}
      </Container>
    </Container>
  );
}

export default App;
