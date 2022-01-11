import MenuItem from "./MenuItem";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-white.png";
import logoMesCadeauxOriginauxSmall from "./logo-cadeaux-originaux-white-small.png";

import { Box, Paper, MenuList } from "@mui/material/";

function SideMenu() {
  return (
    <>
      <Paper
        elevation={3}
        id="side-menu"
        sx={{
          width: { xs: "70px", md: "320px" },
          minHeight: "100vh",
          padding: { xs: "17px 5px", md: "10px 22px" },
          background:
            "linear-gradient(0deg, rgba(18,21,27,1) 0%, rgba(35,44,57,1) 50%, rgba(48,61,80,1) 100%)"
        }}
      >
        <Box
          sx={{
            color: "text.secondary",
            justifyContent: "true"
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img
              data-testid="logo-img"
              src={logoMesCadeauxOriginaux}
              alt="logo-mescadeauxoriginaux"
            />
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <img
              data-testid="logo-img"
              src={logoMesCadeauxOriginauxSmall}
              alt="logo-mescadeauxoriginaux"
            />
          </Box>

          <Box>
            <MenuList>
              <MenuItem
                name={"PRODUITS"}
                Icon={FormatListBulletedRoundedIcon}
                link={"products"}
              />
              <MenuItem
                name={"AJOUTER PROD."}
                Icon={AddCircleRoundedIcon}
                link={"add-product"}
              />
            </MenuList>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default SideMenu;
