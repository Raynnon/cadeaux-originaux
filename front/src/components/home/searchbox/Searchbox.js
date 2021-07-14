import { useState, useEffect } from "react";
import "./searchbox.css";

import { Row, Image, Dropdown, Form, Button } from "react-bootstrap";
import magnifyingGlass from "./magnifying-glass.png";

function Searchbox() {
  const [genreRadio, setGenreRadio] = useState("Tout le monde");
  const [typeRadio, setTypeRadio] = useState("");
  const [priceRadio, setPriceRadio] = useState("Tous les prix");
  const [eventRadio, setEventRadio] = useState("Toutes les occasions");

  const typePossibility = [
    "Maman",
    "Papa",
    "Soeur",
    "Frère",
    "Petit copain / copine",
    "Ami / Amie",
    "Collègue",
    "Peu importe",
  ];
  const genrePossibility = [
    "Femme",
    "Homme",
    "Fille",
    "Garçon",
    "Bébé",
    "Animal",
    "Peu importe",
  ];

  const opportunityPossibility = [
    "Anniversaire",
    "Romantique",
    "Mariage",
    "Remerciements",
    "Se faire Pardonner",
    "Départ en retraite",
    "Crémaillère",
    "Cadeau rigolo",
  ];
  const partyPossibility = [
    "Noël",
    "Fête des mères",
    "Fête des pères",
    "Saint Valentin",
    "Fête des grands mères",
    "Pâques",
    "Halloween",
  ];

  const recipient = (genre) => {
    const base = ["Ami / Amie", "Peu importe"];

    if (genre === "Peu importe") {
      return typePossibility;
    } else if (genre === "Femme") {
      return ["Maman", "Soeur", "Petit copain / copine", "Collègue"].concat(
        base
      );
    } else if (genre === "Homme") {
      return ["Papa", "Frère", "Petit copain / copine", "Collègue"].concat(
        base
      );
    } else if (genre === "Fille") {
      return ["Soeur"].concat(base);
    } else if (genre === "Garçon") {
      return ["Frère"].concat(base);
    } else {
      return null;
    }
  };

  useEffect(() => {
    setTypeRadio("");
  }, [genreRadio]);

  return (
    <Row id="search" className="mt-3 justify-content-center">
      <Form>
        <ul
          className="d-flex px-0 shadow align-items-center"
          style={{ border: "1px solid #ebebeb", borderRadius: "50px" }}
        >
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
                style={{ width: "282px" }}
              >
                <p>Pour qui?</p>
                <sub>
                  {typeRadio ? genreRadio + ", " + typeRadio : genreRadio}
                </sub>
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="d-flex flex-direction-row px-5"
                style={{ width: "418px" }}
              >
                <div className="mr-4">
                  <h4>Genre</h4>
                  {genrePossibility.map((gender) => {
                    return (
                      <Form.Check
                        type="radio"
                        label={gender}
                        value={gender}
                        name="genre"
                        onChange={(e) => setGenreRadio(e.target.value)}
                      />
                    );
                  })}
                </div>
                {recipient(genreRadio) ? (
                  <div className="ml-4">
                    <h4>Type</h4>
                    {recipient(genreRadio).map((type) => {
                      return (
                        <Form.Check
                          type="radio"
                          label={type}
                          value={type}
                          name="type"
                          onChange={(e) => setTypeRadio(e.target.value)}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
                style={{ width: "170px" }}
              >
                <p>Prix</p>
                <sub>{priceRadio}</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu className="px-5" style={{ width: "205px" }}>
                <Form.Check
                  type="radio"
                  label="€"
                  value="€"
                  name="prix"
                  onChange={(e) => setPriceRadio(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="€€"
                  value="€€"
                  name="prix"
                  onChange={(e) => setPriceRadio(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="€€€"
                  value="€€€"
                  name="prix"
                  onChange={(e) => setPriceRadio(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Tous les prix"
                  value="Tous les prix"
                  name="prix"
                  onChange={(e) => setPriceRadio(e.target.value)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
                style={{ width: "221px" }}
              >
                <p>Événement</p>
                <sub>{eventRadio}</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu className="px-5" style={{ width: "475px" }}>
                <div className="d-flex flex-direction-row">
                  <div className="mr-4">
                    <h4>Occasion</h4>
                    {opportunityPossibility.map((item) => {
                      return (
                        <Form.Check
                          type="radio"
                          label={item}
                          value={item}
                          name="event"
                          onChange={(e) => setEventRadio(e.target.value)}
                        />
                      );
                    })}
                  </div>

                  <div className="ml-4">
                    <h4>Type</h4>
                    {partyPossibility.map((item) => {
                      return (
                        <Form.Check
                          type="radio"
                          label={item}
                          value={item}
                          name="event"
                          onChange={(e) => setEventRadio(e.target.value)}
                        />
                      );
                    })}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="warning"
                  className="w-100 text-white mt-3"
                  onClick={() => setEventRadio("Peu importe")}
                >
                  Peu importe
                </Button>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <div
              className="bg-warning mx-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <Button
                type="submit"
                variant="warning"
                className="rounded-circle"
                style={{ width: "45px", height: "45px" }}
              >
                <Image
                  src={magnifyingGlass}
                  alt="loupe"
                  style={{ width: "20px" }}
                />
              </Button>
            </div>
          </li>
        </ul>
      </Form>
    </Row>
  );
}

export default Searchbox;
