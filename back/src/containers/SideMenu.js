import { useSelector, useDispatch } from "react-redux";
import { changeSelectedItemId } from "../app/slices/menuSlice";

import menuItemsComponents from "../components/MenuComponents";

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
  const selectedMenuItemId = useSelector(
    (state) => state.menu.selectedMenuItemId
  );

  const menuItems = useSelector((state) => state.menu.menuItems);

  const dispatch = useDispatch();

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          height: "100vh",
          width: 320,
          maxWidth: "100%",
          borderRadius: 0,
          background:
            "linear-gradient(0deg, rgba(18,21,27,1) 0%, rgba(35,44,57,1) 50%, rgba(48,61,80,1) 100%)"
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
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)"
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#03a9f4",
                        "&:hover": {
                          backgroundColor: "#03a9f4"
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
