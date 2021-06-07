import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Container from "react-bootstrap/Container";

import "./App.scss";

function App() {
  return (
    <Container className="App" fluid>
      <Header />
      <Home />
      <Footer />
    </Container>
  );
}

export default App;
