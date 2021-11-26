import "./App.css";
import SideMenu from "./containers/side-menu/SideMenu";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import MIUITheme from "./component/MIUITheme";

function App() {
  return (
    <ThemeProvider theme={MIUITheme()}>
      <Container maxWidth={false} disableGutters={true}>
        <SideMenu />
      </Container>
    </ThemeProvider>
  );
}

export default App;
