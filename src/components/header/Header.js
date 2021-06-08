import "./header.css";
import Row from "react-bootstrap/Row";
import { NavDropdown, Nav, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import cadeauxOriginauxLogo from "./logo-cadeaux-originaux-small.png";

function Header() {
  return (
    <header>
      <Row className="mx-auto mt-3">
        <Col xs={12} lg={2} className="text-center">
          <Image
            src={cadeauxOriginauxLogo}
            alt="cadeaux-originaux-logo"
            style={{ height: "50px" }}
          />
        </Col>
        <Col
          xs={12}
          lg={8}
          id="menu"
          className="d-flex justify-content-center align-items-center"
        >
          <Nav activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">Nouveau</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/home">Meilleures ventes</Nav.Link>
            </Nav.Item>

            <NavDropdown
              title="Pour qui?"
              id="basic-nav-dropdown"
              className="full-menu"
            >
              <ul className="p-0 d-flex">
                <li className="text-center">
                  <h4>Genre</h4>
                  <NavDropdown.Item href="#action/3.1">Femme</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Homme</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Fille</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Garçon</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Bébé</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Animal</NavDropdown.Item>
                </li>
                <li className="text-center">
                  <h4 className="pl-3">Type</h4>
                  <NavDropdown.Item href="#action/3.1">Maman</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Papa</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Soeur</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Frère</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Petite copine
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Petit copain
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Ami</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Amie</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Collègue de travail
                  </NavDropdown.Item>
                </li>
              </ul>
              <hr />
              <p className="text-center m-2">Peu importe</p>
            </NavDropdown>

            <NavDropdown
              title="Événement"
              id="basic-nav-dropdown"
              className="full-menu"
            >
              <ul className="p-0 d-flex">
                <li className="text-center">
                  <h4>Occasion</h4>
                  <NavDropdown.Item href="#action/3.1">
                    Anniversaire
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Romantique
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Mariage
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Remerciements
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Se faire pardonner
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Départ en retraite
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Crémaillère
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Cadeau rigolo
                  </NavDropdown.Item>
                </li>
                <li className="text-center">
                  <h4 className="pl-3">Fête</h4>
                  <NavDropdown.Item href="#action/3.1">Noël</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Fête des mères
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Fête des pères
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Saint Valentin
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Fête des grands mères
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Pâques</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Halloween
                  </NavDropdown.Item>
                </li>
              </ul>
              <hr />
              <p className="text-center m-2">Peu importe</p>
            </NavDropdown>
          </Nav>
        </Col>
      </Row>
    </header>
  );
}

export default Header;
