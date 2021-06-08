import "./footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

function Footer() {
  const year = () => {
    const today = new Date();
    return today.getFullYear();
  };

  return (
    <footer className="text-white text-center">
      <Row className="bg-primary pt-4">
        <Col>
          <h5>Nouveau</h5>
          <h5>Meilleures ventes</h5>
        </Col>
        <Col>
          <h5>Pour qui?</h5>
          <Table className="mx-auto mx-5 text-white">
            <thead>
              <tr>
                <th>Genre</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="#link">Femme</a>
                </td>
                <td>
                  <a href="#link">Maman</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Homme</a>
                </td>
                <td>
                  <a href="#link">Papa</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Fille</a>
                </td>
                <td>
                  <a href="#link">Soeur</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Garçon</a>
                </td>
                <td>
                  <a href="#link">Frère</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Bébé</a>
                </td>
                <td>
                  <a href="#link">Petite copine</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Animal</a>
                </td>
                <td>
                  <a href="#link">Petit copain</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Peu importe</a>
                </td>
                <td>
                  <a href="#link">Ami</a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a href="#link">Amie</a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a href="#link">Collègue</a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a href="#link">Peu importe</a>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <h5>Événement</h5>
          <Table className="mx-auto mx-5 text-white">
            <thead>
              <tr>
                <th>Occasion</th>
                <th>Fête</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="#link">Anniversaire</a>
                </td>
                <td>
                  <a href="#link">Noël</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Romantique</a>
                </td>
                <td>
                  <a href="#link">Fête des mères</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Mariage</a>
                </td>
                <td>
                  <a href="#link">Fête des pères</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Remerciements</a>
                </td>
                <td>
                  <a href="#link">Saint Valentin</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Se faire pardonner</a>
                </td>
                <td>
                  <a href="#link">Fête des grands mères</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Départ en retraite</a>
                </td>
                <td>
                  <a href="#link">Pâques</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Crémaillère</a>
                </td>
                <td>
                  <a href="#link">Halloween</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Cadeau Rigolo</a>
                </td>
                <td>
                  <a href="#link">Peu importe</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="#link">Peu importe</a>
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
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
