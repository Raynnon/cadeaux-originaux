import Header from "../header/Header";
import Searchbox from "./searchbox/Searchbox";
import Banner from "./banner/Banner";
import Footer from "../footer/Footer";
import "./home.css";

import { Container, Row, Image, Col } from "react-bootstrap";

import cake from "./images/cake.png";
import hearts from "./images/two-hearts.png";
import baby from "./images/baby.png";
import mariage from "./images/mariage.png";
import smiley from "./images/smiley.png";
import joker from "./images/joker.png";
import basket from "./images/basket.png";

function Home() {
  const newProducts = [
    "Shoes",
    "Glasses",
    "Coat",
    "Watch",
    "Keyboard",
    "Scooter",
  ];

  const bestProducts = [
    "Shoes",
    "Glasses",
    "Coat",
    "Watch",
    "Keyboard",
    "Scooter",
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
      <section className="text-center mt-5">
        <h2>
          <span className="text-warning">Nouveaux</span> produits
        </h2>
        <Row className="products mt-4">
          {newProducts.map((item) => {
            return (
              <Col xs={6} sm={4} xl={2}>
                <a href="#home">
                  <div className="product">
                    <Image src="https://picsum.photos/200/200" alt={item} />

                    <div className="d-flex justify-content-between">
                      <p className="d-inline mb-0">{item}</p>
                      <Image
                        src={basket}
                        alt="basket"
                        className="bg-warning d-inline"
                        style={{ height: "28px" }}
                      />
                    </div>
                  </div>
                </a>
              </Col>
            );
          })}
        </Row>
      </section>
      <section className="text-center">
        <h2>
          <span className="text-warning">Meilleures</span> ventes
        </h2>
        <Row className="products mt-4">
          {bestProducts.map((item) => {
            return (
              <Col xs={6} sm={4} xl={2}>
                <a href="#home">
                  <div className="product">
                    <Image src="https://picsum.photos/200/200" alt={item} />

                    <div className="d-flex justify-content-between">
                      <p className="d-inline mb-0">{item}</p>
                      <Image
                        src={basket}
                        alt="basket"
                        className="bg-warning d-inline"
                        style={{ height: "28px" }}
                      />
                    </div>
                  </div>
                </a>
              </Col>
            );
          })}
        </Row>
      </section>
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
