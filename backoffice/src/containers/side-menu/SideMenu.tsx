import { useEffect, useState } from "react";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";
import { SvgIcon } from "@mui/material";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

interface MenuItems {
  name: string;
  icon: typeof SvgIcon;
  AddProduct?: JSX.Element;
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
      sx={{
        height: "100vh",
        width: 320,
        maxWidth: "100%",
        borderRadius: 0
      }}
    >
      <Box
        sx={{
          padding: "10px 30px",
          color: "text.secondary",
          justifyContent: "true"
        }}
      >
        <img
          data-testid="logo-img"
          src={logoMesCadeauxOriginaux}
          alt="logo-mescadeauxoriginaux"
        />

        <Box>
          <MenuList>
            {menuItems
              ? menuItems.map((item, index) => {
                  return (
                    <ListItemButton
                      selected={selectedIndex === index}
                      onClick={() => handleSelectedItem(index)}
                      sx={{
                        borderRadius: 1,
                        margin: "10px 0",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)"
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#00acc1",
                          "&:hover": {
                            backgroundColor: "#00acc1"
                          }
                        }
                      }}
                      key={index}
                    >
                      <ListItemIcon>
                        <item.icon color="secondary" />
                      </ListItemIcon>
                      <ListItemText sx={{ color: "white" }}>
                        {item.name}
                      </ListItemText>
                    </ListItemButton>
                  );
                })
              : null}
          </MenuList>
        </Box>
      </Box>
    </Paper>
  );
}

export default SideMenu;
