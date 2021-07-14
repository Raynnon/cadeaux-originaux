import "./category.css";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import { Form, Row, Col, Image, Button } from "react-bootstrap";

import giftImage from "./dad.webp";

function Category() {
  const products = [
    { name: "Shoes", imageSRC: "https://picsum.photos/200/200" },
    { name: "Glasses", imageSRC: "https://picsum.photos/150/150" },
    { name: "Coat", imageSRC: "https://picsum.photos/300/300" },
    { name: "Watch", imageSRC: "https://picsum.photos/400/400" },
    { name: "Keyboard", imageSRC: "https://picsum.photos/450/450" },
    { name: "Screen", imageSRC: "https://picsum.photos/500/500" },
    { name: "Mouse", imageSRC: "https://picsum.photos/250/250" },
    { name: "Pen", imageSRC: "https://picsum.photos/350/350" },
    { name: "Videogame", imageSRC: "https://picsum.photos/550/550" },
  ];

  return (
    <div>
      <Header />
      <main className="mb-5">
        <h1 className="text-center mb-5">Cadeaux pour papa</h1>
        <Row id="description" className="ml-0">
          <Col
            id="category-image"
            xs={5}
            className="bg-light"
            style={{
              backgroundImage: `url("${giftImage}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundAttachment: "scroll",
              backgroundPosition: "center center",
              position: "relative",
              height: "25vh",
            }}
          ></Col>
          <Col className="d-flex align-items-center">
            <p className="text-justify mb-0 mx-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              ullamcorper pharetra sagittis. Curabitur a sem eget dui iaculis
              feugiat vel in sem. Integer vulputate, elit at mollis feugiat,
              ante sapien posuere ligula, ac pretium odio dui vitae mauris.
              Vestibulum maximus tincidunt mi, non porttitor magna condimentum
              eu. Suspendisse a venenatis lacus, eget finibus eros. Suspendisse
              vehicula est diam, vel imperdiet odio iaculis vitae. Donec lectus
              quam, volutpat ut lobortis quis, dapibus quis orci. Curabitur eu
              felis et massa consequat feugiat. In quis odio dui.
            </p>
          </Col>
        </Row>

        <Row
          id="top-filters"
          className="bg-light d-flex align-items-center justify-content-between px-5 py-2 mb-5 mt-5 ml-0 w-100"
        >
          <Form>
            <div id="top-select">
              <select className="custom-select mr-5" style={{ width: "150px" }}>
                <option selected>-- Trier par</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select className="custom-select" style={{ width: "190px" }}>
                <option selected>-- Produits par page</option>
                <option value="1">12</option>
                <option value="2">20</option>
                <option value="3">32</option>
              </select>
            </div>
          </Form>
          <p id="paging" className="mb-0">
            &lt; <span className="bg-white px-2 border border-muted">1</span>{" "}
            ... <span>12</span> &gt;
          </p>
        </Row>

        <Row className="ml-0 justify-content-center">
          <Col id="left-filters" xs={3} className="bg-light">
            <Row>
              <Col>
                <h4>Genre</h4>
                <ul>
                  <li>Femme</li>
                  <li>Homme</li>
                  <li>Fille</li>
                  <li>Garçon</li>
                  <li>Bébé</li>
                  <li>Animal</li>
                  <li>Peu importe</li>
                </ul>
              </Col>
              <Col>
                <h4>Type</h4>
                <ul>
                  <li>Maman</li>
                  <li>Soeur</li>
                  <li>Petit(e) copain / copine</li>
                  <li>Collègue</li>
                  <li>Ami / Amie</li>
                  <li>Peu importe</li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={9}>
            <Row>
              {products.map((product) => {
                return (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="d-flex justify-content-center text-center mb-4"
                  >
                    <div
                      className="bg-light px-2 py-4"
                      style={{ width: "100%" }}
                    >
                      <h3>{product.name}</h3>
                      <Image
                        src={product.imageSRC}
                        alt="chaussures"
                        width="90%"
                      />

                      <Button
                        className="bg-warning mt-3 border-0"
                        style={{ borderRadius: "50px", width: "90%" }}
                      >
                        En savoir plus
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}

export default Category;
