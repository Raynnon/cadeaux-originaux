import MenuItem from "./MenuItem";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-white.png";
import logoMesCadeauxOriginauxSmall from "./logo-cadeaux-originaux-white-small.png";

import { Box, Paper, MenuList, IconButton } from "@mui/material/";
import { changeToken } from "../../app/state/slices/loginSlice";

import cookieManager from "../apiCalls/cookieManager";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function SideMenu() {
  const dispatch = useDispatch();

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
            display: { xs: "none", md: "block" },
            textAlign: "center"
          }}
        >
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

        <Box sx={{ textAlign: "center", marginTop: "5px" }}>
          <Link to={"/"}>
            <IconButton
              onClick={() => {
                cookieManager("delete");
                dispatch(changeToken(""));
              }}
            >
              <LogoutIcon fontSize="medium" />
            </IconButton>
          </Link>
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
      </Paper>
    </>
  );
}

export default SideMenu;
