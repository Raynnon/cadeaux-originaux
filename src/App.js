import Home from "./components/home/Home";
import Category from "./components/category/Category";
import Product from "./components/product/Product";
import Container from "react-bootstrap/Container";

import "./App.scss";

function App() {
  return (
    <Container className="App" fluid>
      <Category />
      {/* <Home /> */}
      {/* <Product /> */}
    </Container>
  );
}

export default App;
