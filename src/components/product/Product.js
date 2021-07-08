import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductSuggestion from "../subcomponents/product-suggestion/ProductSuggestion";
import "./product.css";

import { Button, Row, Image, Col } from "react-bootstrap";

import tick from "./tick.png";

function App() {
  const productAlternative = [
    { name: "Shoes", imageSRC: "https://picsum.photos/200/200" },
    { name: "Glasses", imageSRC: "https://picsum.photos/200/200" },
    { name: "Coat", imageSRC: "https://picsum.photos/200/200" },
    { name: "Watch", imageSRC: "https://picsum.photos/200/200" },
    { name: "Keyboard", imageSRC: "https://picsum.photos/200/200" },
    { name: "Scooter", imageSRC: "https://picsum.photos/200/200" },
  ];

  return (
    <div>
      <Header />
      <div id="product">
        <Row as="main" className="mt-4" fluid>
          <Col xs={5}>
            <Image
              id="product-big-picture"
              src="https://picsum.photos/808/672"
              alt="product"
              className="product-image"
            />
            <Row id="product-miniatures" className="mt-5">
              <Col>
                <Image
                  src="https://picsum.photos/245/200"
                  alt="product-image2"
                  className="product-image product-small-picture"
                />
              </Col>
              <Col>
                <Image
                  src="https://picsum.photos/245/200"
                  alt="product-image3"
                  className="product-image product-small-picture"
                />
              </Col>
              <Col>
                <Image
                  src="https://picsum.photos/245/200"
                  alt="product-image4"
                  className="product-image product-small-picture"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 6, offset: 1 }} as="section">
            <h2 className="mb-5">Bracelet protecteur multicolor</h2>
            <p id="product-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              venenatis congue ipsum, vitae consequat ante pulvinar quis. Nunc
              congue diam in nulla fermentum dignissim. Suspendisse blandit sit
              amet lectus in vulputate. Nulla facilisi. Donec tincidunt lorem
              quam, sed venenatis ex tincidunt id. Sed laoreet ipsum non
              eleifend tempus. Sed sollicitudin ante vitae neque gravida, in
              dictum purus placerat. Nulla leo metus, pretium sed luctus et,
              rutrum in urna. dictum purus placerat. Nulla leo metus, pretium
              sed luctus et, rutrum in urna.{" "}
            </p>
            <Button
              variant="warning"
              className="text-white rounded-pill font-weight-bold"
              style={{ width: "250px", height: "50px" }}
            >
              Acheter!
            </Button>
            <ul className="ticks">
              <li>
                <Image src={tick} alt="tick-icon" />
                <p>Lorem ipsum dolor sit ame</p>
              </li>
              <li>
                <Image src={tick} alt="tick-icon" />
                <p>Lorem ipsum dolor sit ame</p>
              </li>
              <li>
                <Image src={tick} alt="tick-icon" />
                <p>Lorem ipsum dolor sit ame</p>
              </li>
              <li>
                <Image src={tick} alt="tick-icon" />
                <p>Lorem ipsum dolor sit ame</p>
              </li>
            </ul>
          </Col>
        </Row>
        <ProductSuggestion
          title="Produits similaires"
          products={productAlternative}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
