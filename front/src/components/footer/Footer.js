import "./footer.css";
import { Row, Col } from "react-bootstrap";

function Footer() {
  const year = () => {
    const today = new Date();
    return today.getFullYear();
  };

  const genre = [
    "Femme",
    "Homme",
    "Fille",
    "Garçon",
    "Bébé",
    "Animal",
    "Peu importe",
  ];

  const type = [
    "Maman",
    "Papa",
    "Soeur",
    "Frère",
    "Petite copain / copine",
    "Ami / Amie",
    "Collègue",
    "Peu importe",
  ];

  const prices = ["Pas cher", "Intermédiaire", "Cher", "Peu importe"];

  const occasion = [
    "Anniversaire",
    "Romantique",
    "Mariage",
    "Remerciements",
    "Se faire pardonner",
    "Départ en retraite",
    "Crémaillère",
    "Cadeau rigolo",
  ];

  const party = [
    "Noël",
    "Fête des mères",
    "Fête des pères",
    "Fête des grands mères",
    "Saint Valentin",
    "Pâques",
    "Halloween",
  ];

  return (
    <footer className="text-white text-center">
      <Row className="bg-primary pt-4">
        <Col xs={6} md={4}>
          <a href="#home">
            <h5>Nouveau</h5>
          </a>
          <a href="#home">
            <h5>Meilleures ventes</h5>
          </a>

          <h5 className="mt-5">Prix</h5>
          <div className="d-flex flex-column">
            {prices.map((item) => {
              return <a href="#link">{item}</a>;
            })}
          </div>
        </Col>
        <Col xs={6} md={4}>
          <h5>Pour qui?</h5>
          <Row>
            <Col>
              <h6>Genre</h6>
              <div className="d-flex flex-column">
                {genre.map((item) => {
                  return <a href="#link">{item}</a>;
                })}
              </div>
            </Col>
            <Col>
              <h6>Type</h6>
              <div className="d-flex flex-column">
                {type.map((item) => {
                  return <a href="#link">{item}</a>;
                })}
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4}>
          <h5>Événement</h5>
          <Row>
            <Col>
              <h6>Occasion</h6>
              <div className="d-flex flex-column">
                {occasion.map((item) => {
                  return <a href="#link">{item}</a>;
                })}
              </div>
            </Col>
            <Col>
              <h6>Fête</h6>
              <div className="d-flex flex-column">
                {party.map((item) => {
                  return <a href="#link">{item}</a>;
                })}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="bg-primary pt-4">
        <p className="mx-auto">
          Mes cadeaux originaux © {year()} - Tous Droits Réservés
        </p>
      </Row>
    </footer>
  );
}

export default Footer;
