import { useState, useEffect } from "react";
import "./searchbox.css";

import { Row, Image, Dropdown, Form } from "react-bootstrap";
import magnifyingGlass from "./magnifying-glass.png";

function Searchbox() {
  const [genreRadio, setGenreRadio] = useState("Tout le monde");
  const [typeRadio, setTypeRadio] = useState("");
  const [priceRadio, setPriceRadio] = useState("Tous les prix");

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

  const onGenreRadioChange = (e) => {
    setGenreRadio(e.target.value);
  };

  const onTypeRadioChange = (e) => {
    setTypeRadio(e.target.value);
  };

  const onPriceRadioChange = (e) => {
    setPriceRadio(e.target.value);
  };

  useEffect(() => {
    setTypeRadio("");
  }, [genreRadio]);

  console.log(genreRadio, typeRadio);

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
                        onChange={(e) => onGenreRadioChange(e)}
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
                          onChange={(e) => onTypeRadioChange(e)}
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
                  onChange={(e) => onPriceRadioChange(e)}
                />
                <Form.Check
                  type="radio"
                  label="€€"
                  value="€€"
                  name="prix"
                  onChange={(e) => onPriceRadioChange(e)}
                />
                <Form.Check
                  type="radio"
                  label="€€€"
                  value="€€€"
                  name="prix"
                  onChange={(e) => onPriceRadioChange(e)}
                />
                <Form.Check
                  type="radio"
                  label="Tous les prix"
                  value="Tous les prix"
                  name="prix"
                  onChange={(e) => onPriceRadioChange(e)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className="dropdown-search">
              <Dropdown.Toggle
                variant="white"
                className="rounded-pill dropdown-toggle-search py-2"
              >
                <p>Événement</p>
                <sub>Toutes les occasions</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <div
              className="bg-warning mx-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <Image
                src={magnifyingGlass}
                alt="loupe"
                style={{ width: "20px" }}
              />
            </div>
          </li>
        </ul>
      </Form>
    </Row>
  );
}

export default Searchbox;
