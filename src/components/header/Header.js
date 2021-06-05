import "./header.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import cadeauxOriginauxLogo from "./logo-cadeaux-originaux-small.png";

function Header() {
  return (
    <Row as="header">
      <Image
        src={cadeauxOriginauxLogo}
        className="position-absolute"
        style={{ top: "40px", left: "40px" }}
      />
      <Row className="mx-auto mt-3">
        <Nav activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Nouveau</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Meilleures ventes</Nav.Link>
          </Nav.Item>

          <NavDropdown title="Pour qui?" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Évènement" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Row>

      <Row></Row>
    </Row>
  );
}

export default Header;
