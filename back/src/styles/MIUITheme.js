import { createTheme } from "@mui/material/styles";
import { indigo, lightBlue } from "@mui/material/colors";

function MIUITheme() {
  const palette = {
    mode: "dark",
    primary: indigo,
    secondary: {
      main: "#fbfafa"
    },
    info: lightBlue,
    background: {
      default: "#1E2530"
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
