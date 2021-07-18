import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductSuggestion from "../subcomponents/product-suggestion/ProductSuggestion";
import "./product.css";

import { Button, Row, Image, Col } from "react-bootstrap";

import tickIcon from "./tick.png";

function App() {
  const [productData, setProductData] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [ticks, setTicks] = useState([]);
  const [productAlternative, setProductAlternative] = useState([]);
  const [highlightedImage, setHighlightedImage] = useState("");

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products/13");
      setProductData(res.data[0]);
      console.log(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();

    const productImagesImported = [
      "https://picsum.photos/808/672",
      "https://picsum.photos/245/200",
      "https://picsum.photos/490/400",
    ];

    const productAlternative = [
      { name: "Shoes", imageSRC: "https://picsum.photos/200/200" },
      { name: "Glasses", imageSRC: "https://picsum.photos/200/200" },
      { name: "Coat", imageSRC: "https://picsum.photos/200/200" },
      { name: "Watch", imageSRC: "https://picsum.photos/200/200" },
      { name: "Keyboard", imageSRC: "https://picsum.photos/200/200" },
      { name: "Scooter", imageSRC: "https://picsum.photos/200/200" },
    ];

    setProductImages(productImagesImported);
    setHighlightedImage(productImagesImported[0]);
    setProductAlternative(productAlternative);
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "30px 10%" }}>
        <Row as="main" className="mt-4" fluid>
          <Col xs={12} lg={5} className="mb-4">
            <Image
              id="highlighted-image"
              src={highlightedImage}
              alt="product"
              className="product-image product-big-picture mx-auto d-block"
            />
            <Row id="product-miniatures" className="mt-5">
              {productImages.map((image) => {
                return (
                  <Col className="text-center">
                    <Image
                      src={image}
                      alt="product-image2"
                      className="product-image product-small-picture"
                      onClick={(e) => setHighlightedImage(image)}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col xs={12} lg={{ span: 6, offset: 1 }} as="section">
            <h2 className="mb-5" style={{ lineHeight: "2.5em" }}>
              Bracelet protecteur multicolor
            </h2>
            <p id="product-description" className="mb-5 text-justify">
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
            <ul className="ticks pl-0 mt-5">
              {productData ? (
                <p>
                  {productData.strong_points}
                </p> /* productData.strong_points.map((tick) => {
                    return (
                      <li className="d-flex">
                        <Image
                          src={tickIcon}
                          alt="tick-icon"
                          style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                          }}
                        />
                        <p>{tick}</p>
                      </li>
                    );
                  }) */
              ) : null}
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
