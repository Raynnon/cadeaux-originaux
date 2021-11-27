import { createTheme } from "@mui/material/styles";

function MIUITheme() {
  const palette = {
    type: "dark",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#fbfafa"
    },
    tertiary: {
      main: "#f50057"
    },
    background: {
      default: "#EEE",
      paper: "#112027"
    },
    text: {
      primary: "#1e1e1e",
      secondary: "#fbfafa",
      disabled: "#ececec"
    },
    icon: {
      color: "#fbfafa"
    },
    shape: {
      borderRadius: 4
    }
  };

  const components = {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "3rem"
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#00acc1"
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#00acc1"
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)"
          }
        }
      }
    }
  };

  const theme = createTheme({
    palette,
    components
  });

  return theme;
}

export default MIUITheme;
