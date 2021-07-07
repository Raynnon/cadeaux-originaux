import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Container from "react-bootstrap/Container";

import "./App.scss";

function App() {
  return (
    <Container className="App" fluid>
      {/* <Home /> */}
      <Product />
    </Container>
  );
}

export default App;
