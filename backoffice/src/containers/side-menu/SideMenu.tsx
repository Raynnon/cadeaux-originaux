import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeSelectedItemId } from "../../features/menuSlice";

import menuItemsComponents from "../../app/MenuComponents";

import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

import {
  Box,
  Paper,
  MenuList,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from "@mui/material/";

function SideMenu() {
  const selectedMenuItemId: number = useSelector(
    (state: RootState) => state.menu.selectedMenuItemId
  );

  const menuItems = useSelector((state: RootState) => state.menu.menuItems);

  const dispatch = useDispatch();

  return (
    <>
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
              {menuItemsComponents.map((item, index) => {
                return (
                  <ListItemButton
                    data-testid="menu-item"
                    selected={selectedMenuItemId === index}
                    onClick={() => dispatch(changeSelectedItemId(index))}
                    sx={{
                      borderRadius: 1,
                      margin: "10px 0",
                      backgroundColor: "#112027",
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
                      <item.icon
                        data-testid="menu-item-icon"
                        color="secondary"
                      />
                    </ListItemIcon>
                    <ListItemText
                      data-testid="menu-item-text"
                      sx={{ color: "white" }}
                    >
                      {menuItems[index].name}
                    </ListItemText>
                  </ListItemButton>
                );
              })}
            </MenuList>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default SideMenu;
