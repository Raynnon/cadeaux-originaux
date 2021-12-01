import { useState, useEffect } from "react";
import SideMenu from "./containers/side-menu/SideMenu";
import { Typography, Container, SvgIcon } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import AddProduct from "./component/AddProduct";

interface MenuItems {
  name: string;
  icon: typeof SvgIcon;
  compo: JSX.Element;
}

function App() {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState({
    name: "Products list",
    icon: FormatListBulletedRoundedIcon,
    compo: <AddProduct />
  });

  useEffect(() => {
    const items: MenuItems[] = [
      {
        name: "Products list",
        icon: FormatListBulletedRoundedIcon,
        compo: <AddProduct />
      },
      { name: "Add product", icon: AddCircleRoundedIcon, compo: <AddProduct /> }
    ];

    setMenuItems(items);
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu
        menuItems={menuItems}
        OnSelectedItemChange={(menuItemIndex: number) => {
          setSelectedMenuItem(menuItems[menuItemIndex]);
        }}
      />
      <Container component={"main"} maxWidth={false}>
        <Typography variant="h1">
          {selectedMenuItem ? selectedMenuItem.name : null}
        </Typography>
        {selectedMenuItem ? selectedMenuItem.compo : null}
      </Container>
    </Container>
  );
}

export default App;
