import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Row className="bg-primary text-white text-center">
      <Col>
        <h5>Nouveau</h5>
        <h5>Top 50</h5>
      </Col>
      <Col>
        <h5>Pour qui?</h5>
      </Col>
      <Col>
        <h5>Événement</h5>
      </Col>
      <Col>
        <h5>Fête</h5>
      </Col>
    </Row>
  );
}

export default Footer;
