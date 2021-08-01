import { useState } from "react";
import Image from "next/image";

export default function SearchBox({ menuItems }) {
  const [nature, setNature] = useState("Tout le monde");
  const [type, setType] = useState("Peu importe");
  const [event, setEvent] = useState("Toutes les occasions");
  const [price, setPrice] = useState("Tous les prix");

  const radioAttribution = (subCategory, radioValue) => {
    if (subCategory === "Genre") {
      setNature(radioValue);
    } else if (subCategory === "Type") {
      setType(radioValue);
    } else if (subCategory === "Occasion") {
      setEvent(radioValue);
    } else if (subCategory === "Fête") {
      setEvent(radioValue);
    } else {
      setPrice(radioValue);
    }
  };

  const category = (cat) => {
    if (cat === "Pour qui?") {
      return `${nature}, ${type}`;
    } else if (cat === "Événement") {
      return event;
    } else if (cat === "Prix") {
      return price;
    }
  };

  const recipients = () => {
    const base = ["Ami / Amie", "Peu importe"];

    if (nature === "Tout le monde") {
      return [
        "Maman",
        "Papa",
        "Soeur",
        "Frère",
        "Petit copain / copine",
        "Collègue",
      ];
    } else if (nature === "Femme") {
      return ["Maman", "Soeur", "Petit copain / copine", "Collègue"].concat(
        base
      );
    } else if (nature === "Homme") {
      return ["Papa", "Frère", "Petit copain / copine", "Collègue"].concat(
        base
      );
    } else if (nature === "Fille") {
      return ["Soeur"].concat(base);
    } else if (nature === "Garçon") {
      return ["Frère"].concat(base);
    } else {
      return [];
    }
  };

  return (
    <div className="hidden justify-center lg:flex">
      <ul className="flex text-center bg-white justify-center border border-coolGray-100 rounded-full w-2/4 justify-around">
        {menuItems.length
          ? menuItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className="group flex-grow hover:bg-coolGray-200 cursor-pointer rounded-full"
                >
                  <button className="w-full py-3">
                    <h5>{item.name}</h5>
                    <p className="text-sm">{category(item.name)}</p>
                    <ul className="hidden justify-around absolute bg-white border border-coolGray-100 w-72 rounded-xl mt-3 py-2 group-hover:flex">
                      {item.dropdown
                        ? item.dropdown.map((category, index) => {
                            //Categpry (Genre, Type...)
                            return (
                              <div className="flex-grow" key={index}>
                                <p>{category.name.toUpperCase()}</p>
                                <ul className="flex-grow" key={index}>
                                  {category.name !== "Type"
                                    ? category.elements.map(
                                        //element (Femme, Homme...)
                                        (element, index) => {
                                          return (
                                            <li
                                              key={index}
                                              className="hover:bg-orange-300 flex-grow text-left px-2"
                                            >
                                              <label class="inline-flex items-center">
                                                <input
                                                  type="radio"
                                                  class="form-radio"
                                                  name="radio"
                                                  value={element}
                                                  onChange={(e) => {
                                                    radioAttribution(
                                                      category.name,
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                                <span class="ml-2">
                                                  {element}
                                                </span>
                                              </label>
                                            </li>
                                          );
                                        }
                                      )
                                    : recipients().map((recipient, index) => {
                                        return (
                                          <li
                                            key={index}
                                            className="hover:bg-orange-300 flex-grow text-left px-2"
                                          >
                                            <label class="inline-flex items-center">
                                              <input
                                                type="radio"
                                                class="form-radio"
                                                name="radio"
                                                value={recipient}
                                                onChange={(e) => {
                                                  radioAttribution(
                                                    category.name,
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                              <span class="ml-2">
                                                {recipient}
                                              </span>
                                            </label>
                                          </li>
                                        );
                                      })}
                                </ul>
                              </div>
                            );
                          })
                        : null}
                    </ul>
                  </button>
                </li>
              );
            })
          : null}

        <li className="place-self-center">
          <button
            type="submit"
            className="flex justify-center items-center	 bg-orange-500 hover:bg-orange-600 flex-grow w-12 h-12 rounded-full mx-3"
          >
            <Image
              src="/images/magnifying-glass.png"
              alt="magnifying-glass"
              width="20px"
              height="20px"
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
