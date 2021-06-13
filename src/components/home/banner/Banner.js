import ShapesGenerator from "./ShapesGenerator";
import { Row, Image, Button, Col } from "react-bootstrap";
import "./banner.css";

import birthday from "./birthday.png";

function Banner() {
  return (
    <Row id="banner" className="mt-5">
      <Col xl={6} className="d-flex justify-content-center flex-column">
        <ShapesGenerator minTop={1} maxTop={30} minLeft={1} maxLeft={30} />
        <ShapesGenerator minTop={70} maxTop={99} minLeft={1} maxLeft={30} />
        <ShapesGenerator minTop={1} maxTop={30} minLeft={70} maxLeft={99} />
        <ShapesGenerator minTop={70} maxTop={99} minLeft={70} maxLeft={99} />
        <ShapesGenerator minTop={30} maxTop={70} minLeft={30} maxLeft={70} />
        <h1 id="banner-title">Anniversaires</h1>
        <p id="banner-sub" className="text-muted">
          Découvrez notre sélection de cadeaux originaux
        </p>
        <Button
          variant="warning"
          className="text-white rounded-pill font-weight-bold"
          style={{ width: "150px", height: "50px" }}
        >
          Découvrir!
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
  );
}

export default Banner;
