import "./productSuggestion.css";

import { Row, Image, Col } from "react-bootstrap";
import basket from "./basket.png";

function App({ title, products }) {
  return (
    <section className="mt-5">
      <h2 id="related-products-title">{title}</h2>
      <Row className="products mt-4">
        {products.map((product) => {
          return (
            <Col xs={6} sm={4} xl={2}>
              <a href="#home">
                <div className="product mb-4">
                  <Image
                    className="product-image product-image-miniature w-100"
                    src={product.imageSRC}
                    alt={product.name}
                  />

                  <div className="d-flex justify-content-between">
                    <p className="d-inline mb-0">{product.name}</p>
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
  );
}

export default App;
