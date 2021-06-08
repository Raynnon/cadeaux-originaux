import "./home.css";

import { Container, Row, Image, Button, Dropdown, Col } from "react-bootstrap";

import magnifyingGlass from "./images/magnifying-glass.png";
import birthday from "./images/birthday.png";
import cake from "./images/cake.png";
import hearts from "./images/two-hearts.png";
import baby from "./images/baby.png";
import mariage from "./images/mariage.png";
import smiley from "./images/smiley.png";
import joker from "./images/joker.png";
import basket from "./images/basket.png";

function Home() {
  return (
    <Container fluid>
      <Row id="search" className="mt-3 justify-content-center">
        <ul
          className="d-flex px-0 shadow align-items-center"
          style={{ border: "1px solid #ebebeb", borderRadius: "50px" }}
        >
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
              >
                <p>Pour qui?</p>
                <sub>Tout le monde</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
              >
                <p>Prix</p>
                <sub>Tous les prix</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
              >
                <p>Événement</p>
                <sub>Toutes les occasions</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <div
              className="bg-warning mx-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <Image
                src={magnifyingGlass}
                alt="loupe"
                style={{ width: "20px" }}
              />
            </div>
          </li>
        </ul>
      </Row>
      <Row id="banner" className="mt-5">
        <Col
          xl={6}
          className="d-flex justify-content-center flex-column"
          style={{ paddingLeft: "20%" }}
        >
          <h1>Anniversaires</h1>
          <p className="text-muted" style={{ fontSize: "1.3rem" }}>
            Découvrez notre sélection de cadeaux originaux
          </p>
          <Button
            variant="warning"
            className="text-white rounded-pill"
            style={{ width: "150px", height: "50px" }}
          >
            Découvrir &gt;
          </Button>
        </Col>
        <Col
          xl={6}
          className="d-flex justify-content-center"
          style={{ paddingRight: "5%" }}
        >
          <div
            className="bg-warning"
            style={{
              position: "absolute",
              width: "40%",
              height: "75%",
              bottom: "0",
              zIndex: 1,
              borderRadius: "50px 50px 0 0",
            }}
          ></div>
          <Image src={birthday} fluid style={{ width: "30%", zIndex: "2" }} />
        </Col>
      </Row>
      <Row id="occasions" className="bg-secondary text-center py-4">
        <Col>
          <Image src={cake} alt="birthday-cake-logo" />
          <h3 style={{ color: "#FF2929" }}>Anniversaire</h3>
        </Col>
        <Col>
          <Image src={hearts} alt="two-hearts-logo" />
          <h3 style={{ color: "#FCE145" }}>Romantique</h3>
        </Col>
        <Col>
          <Image src={baby} alt="pacifier-baby-logo" />
          <h3 style={{ color: "#76FD3C" }}>Naissance</h3>
        </Col>
        <Col>
          <Image src={mariage} alt="wedding-logo" />
          <h3 style={{ color: "#4AFCAC" }}>Mariage</h3>
        </Col>
        <Col>
          <Image src={smiley} alt="smiley-logo" />
          <h3 style={{ color: "#29A9FF" }}>Remerciements</h3>
        </Col>
        <Col>
          <Image src={joker} alt="joker-logo" />
          <h3 style={{ color: "#5E29FF" }}>Fun</h3>
        </Col>
      </Row>
      <section className="text-center mt-5">
        <h2>
          <span className="text-warning">Nouveaux</span> produits
        </h2>
        <Row className="mt-4">
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
        </Row>
      </section>
      <section className="text-center mt-5">
        <h2>
          <span className="text-warning">Meilleures</span> ventes
        </h2>
        <Row className="mt-4">
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
          <Col>
            <Image src="https://picsum.photos/200/200" />
            <div
              className="d-flex justify-content-between"
              style={{ width: "200px", margin: "auto" }}
            >
              <p className="d-inline mb-0">Chaussures</p>
              <Image
                src={basket}
                alt="basket"
                className="bg-warning d-inline"
                style={{ height: "28px" }}
              />
            </div>
          </Col>
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
    </Container>
  );
}

export default Home;
