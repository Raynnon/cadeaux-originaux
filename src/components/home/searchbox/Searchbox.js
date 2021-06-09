import { useState, useEffect } from "react";
import "./searchbox.css";

import { Row, Image, Dropdown, Form } from "react-bootstrap";
import magnifyingGlass from "./magnifying-glass.png";

function Searchbox() {
  const [typeRadio, setTypeRadio] = useState("");

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

  const onTypeRadioChange = (e) => {
    setTypeRadio(e.target.value);
  };

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
              >
                <p>Pour qui?</p>
                <sub>Tout le monde</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu className="d-flex flex-direction-row px-5">
                <div className="mr-4">
                  <h4>Genre</h4>
                  {genrePossibility.map((gender) => {
                    return (
                      <Form.Check
                        type="radio"
                        label={gender}
                        value={gender}
                        name="genre"
                        onChange={(e) => onTypeRadioChange(e)}
                      />
                    );
                  })}
                </div>
                {recipient(typeRadio) ? (
                  <div className="ml-4">
                    <h4>Type</h4>
                    {recipient(typeRadio).map((genre) => {
                      return (
                        <Form.Check type="radio" label={genre} name="type" />
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
              >
                <p>Prix</p>
                <sub>Tous les prix</sub>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
