import MenuItem from "./MenuItem";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

import { Box, Paper, MenuList } from "@mui/material/";

function SideMenu() {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          minHeight: "100vh",
          width: 320,
          maxWidth: "100%",
          borderRadius: 0,
          background:
            "linear-gradient(0deg, rgba(18,21,27,1) 0%, rgba(35,44,57,1) 50%, rgba(48,61,80,1) 100%)"
        }}
      >
        <Box
          sx={{
            padding: "10px 22px",
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
              <MenuItem
                name={"PRODUITS"}
                Icon={FormatListBulletedRoundedIcon}
                link={"products"}
              />
              <MenuItem
                name={"AJOUTER PRODUIT"}
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
