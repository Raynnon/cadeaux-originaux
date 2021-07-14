import Header from "../header/Header";
import Searchbox from "./searchbox/Searchbox";
import Banner from "./banner/Banner";
import Footer from "../footer/Footer";
import ProductSuggestion from "../subcomponents/product-suggestion/ProductSuggestion";
import "./home.css";

import { Container, Row, Image, Col } from "react-bootstrap";

import cake from "./images/cake.png";
import hearts from "./images/two-hearts.png";
import baby from "./images/baby.png";
import mariage from "./images/mariage.png";
import smiley from "./images/smiley.png";
import joker from "./images/joker.png";

function Home() {
  const newProducts = [
    { name: "Shoes", imageSRC: "https://picsum.photos/200/200" },
    { name: "Glasses", imageSRC: "https://picsum.photos/200/200" },
    { name: "Coat", imageSRC: "https://picsum.photos/200/200" },
    { name: "Watch", imageSRC: "https://picsum.photos/200/200" },
    { name: "Keyboard", imageSRC: "https://picsum.photos/200/200" },
    { name: "Scooter", imageSRC: "https://picsum.photos/200/200" },
  ];

  const bestProducts = [
    { name: "Shoes", imageSRC: "https://picsum.photos/200/200" },
    { name: "Glasses", imageSRC: "https://picsum.photos/200/200" },
    { name: "Coat", imageSRC: "https://picsum.photos/200/200" },
    { name: "Watch", imageSRC: "https://picsum.photos/200/200" },
    { name: "Keyboard", imageSRC: "https://picsum.photos/200/200" },
    { name: "Scooter", imageSRC: "https://picsum.photos/200/200" },
  ];

  return (
    <Container fluid>
      <Header />
      <Searchbox />
      <Banner />
      <Row id="occasions" className="bg-secondary text-center">
        <Col xs={4} lg={2}>
          <a href="#home">
            <div className="occasion">
              <Image
                src={cake}
                alt="birthday-cake-logo"
                className="logo-occasion"
              />
              <h3 style={{ color: "#FF2929" }}>Anniversaire</h3>
            </div>
          </a>
        </Col>
        <Col xs={4} lg={2}>
          <a href="#home">
            <div className="occasion">
              <Image
                src={hearts}
                alt="two-hearts-logo"
                className="logo-occasion"
              />
              <h3 style={{ color: "#FC4AAC" }}>Romantique</h3>
            </div>
          </a>
        </Col>
        <Col xs={4} lg={2}>
          <a href="#home">
            <div className="occasion">
              <Image
                src={baby}
                alt="pacifier-baby-logo"
                className="logo-occasion"
              />
              <h3 style={{ color: "#FCE145" }}>Naissance</h3>
            </div>
          </a>
        </Col>
        <Col xs={4} lg={2}>
          <a href="#home">
            <div className="occasion">
              <Image
                src={mariage}
                alt="wedding-logo"
                className="logo-occasion"
              />
              <h3 style={{ color: "#76FD3C" }}>Mariage</h3>
            </div>
          </a>
        </Col>
        <Col xs={4} lg={2}>
          <a href="#home">
            <div className="occasion">
              <Image src={smiley} alt="smiley-logo" className="logo-occasion" />
              <h3 style={{ color: "#29A9FF" }}>Remerciements</h3>
            </div>
          </a>
        </Col>
        <Col xs={4} lg={2}>
          <a href="#home">
            <div className="occasion">
              <Image src={joker} alt="joker-logo" className="logo-occasion" />
              <h3 style={{ color: "#5E29FF" }}>Fun</h3>
            </div>
          </a>
        </Col>
      </Row>

      <ProductSuggestion title="Nouveau produits" products={newProducts} />
      <ProductSuggestion title="Meilleurs produits" products={bestProducts} />

      <Row as="section" id="presentation" className="bg-light mt-5 py-3">
        <p
          className="text-justify"
          style={{ lineHeight: "2.5rem", marginBottom: "0" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </Row>
      <Footer />
    </Container>
  );
}

export default Home;
