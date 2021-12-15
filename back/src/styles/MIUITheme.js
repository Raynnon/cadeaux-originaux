import { createTheme } from "@mui/material/styles";
import { indigo, lightBlue } from "@mui/material/colors";

function MIUITheme() {
  const palette = {
    primary: indigo,
    secondary: {
      main: "#fbfafa"
    },
    info: lightBlue,
    background: {
      default: "#eee",
      paper: "#112027"
    },
    text: {
      primary: "#1e1e1e",
      disabled: "#000"
    },
    shape: {
      borderRadius: 4
    }
  };

  const typography = {
    h1: {
      fontSize: "2.5rem"
    },
    h2: { fontSize: "2rem" }
  };

  const components = {};

  const theme = createTheme({
    palette,
    typography,
    components
  });

  return theme;
}

export default MIUITheme;
