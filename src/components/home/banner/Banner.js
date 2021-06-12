import { Row, Image, Button, Col } from "react-bootstrap";
import "./banner.css";

import birthday from "./birthday.png";

function Banner() {
  return (
    <Row id="banner" className="mt-5">
      <Col xl={6} className="d-flex justify-content-center flex-column">
        <div className="triangle" style={{ top: "0", left: "15%" }}></div>
        <div
          className="circle"
          style={{
            top: "93px",
            left: "1%",
            width: "2vw",
            height: "2vw",
            backgroundColor: "#2dff29",
          }}
        ></div>
        <div
          className="circle"
          style={{
            top: "60%",
            left: "85%",
            width: "1.7vw",
            height: "1.7vw",
            backgroundColor: "#29BFFF",
          }}
        ></div>
        <div
          className="halo"
          style={{
            top: "40%",
            left: "60%",
            boxShadow: "0 0 1.2vw 1.2vw rgba(255, 130, 41, 0.4)",
          }}
        ></div>
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
