import { useState } from "react";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Grid from "@mui/material/Grid";

function SideMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Paper
      sx={{ height: "100vh", width: 320, maxWidth: "100%", borderRadius: 0 }}
    >
      <Box sx={{ padding: "10px 30px", color: "text.secondary" }}>
        <Grid container={true} justifyContent="center">
          <img src={logoMesCadeauxOriginaux} alt="logo-mescadeauxoriginaux" />
        </Grid>
        <Box>
          <MenuList>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              className="ListItemButton"
              sx={{ borderRadius: 1, margin: "10px 0" }}
            >
              <ListItemIcon>
                <AddCircleRoundedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText color="text.secondary">Add product</ListItemText>
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              className="ListItemButton"
              sx={{ borderRadius: 1, margin: "10px 0" }}
            >
              <ListItemIcon>
                <AddCircleRoundedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText color="text.secondary">Add product</ListItemText>
            </ListItemButton>
          </MenuList>
        </Box>
      </Box>
    </Paper>
  );
}

export default SideMenu;
