import { useEffect, useState } from "react";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";
import { SvgIcon } from "@mui/material";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Grid from "@mui/material/Grid";

interface MenuItems {
  name: string;
  icon: typeof SvgIcon;
}

interface SideMenuProps {
  menuItems: MenuItems[];
  OnSelectedItemChange: any;
}

function SideMenu(props: SideMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems: MenuItems[] = props.menuItems;

  const handleSelectedItem = (index: number): number => {
    setSelectedIndex(index);

    return index;
  };

  useEffect(() => {
    props.OnSelectedItemChange(selectedIndex);
  }, [props, selectedIndex]);

  return (
    <Paper
      elevation={3}
      sx={{ height: "100vh", width: 320, maxWidth: "100%", borderRadius: 0 }}
    >
      <Box sx={{ padding: "10px 30px", color: "text.secondary" }}>
        <Grid container={true} justifyContent="center">
          <img src={logoMesCadeauxOriginaux} alt="logo-mescadeauxoriginaux" />
        </Grid>
        <Box>
          <MenuList>
            {menuItems.map((item, index) => {
              return (
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => handleSelectedItem(index)}
                  className="ListItemButton"
                  sx={{ borderRadius: 1, margin: "10px 0" }}
                  key={index}
                >
                  <ListItemIcon>
                    <item.icon color="secondary" />
                  </ListItemIcon>
                  <ListItemText color="text.secondary">
                    {item.name}
                  </ListItemText>
                </ListItemButton>
              );
            })}
          </MenuList>
        </Box>
      </Box>
    </Paper>
  );
}

export default SideMenu;
