import Header from "./components/header/Header";
import Container from "react-bootstrap/Container";

import "./App.scss";

function App() {
  return (
    <Container className="App" fluid>
      <Header />
    </Container>
  );
}

export default App;
