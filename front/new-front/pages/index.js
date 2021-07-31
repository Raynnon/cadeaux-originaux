import Layout from "../components/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    setPrices(["€", "€€", "€€€", "Peu importe"]);
    setMenuItems([
      {
        name: "Pour qui?",
        dropdown: [
          {
            name: "Genre",
            elements: ["Femme", "Homme", "Fille", "Garçon", "Bébé"],
          },
          {
            name: "Type",
            elements: [
              "Maman",
              "Papa",
              "Soeur",
              "Frère",
              "Petite copine",
              "Petit copain",
              "Collègue de travail",
              "Peu importe",
            ],
          },
        ],
      },
      {
        name: "Événement",
        dropdown: [
          {
            name: "Occasion",
            elements: [
              "Anniversaire",
              "Romantique",
              "Mariage",
              "Remerciements",
              "Se faire pardonner",
              "Départ en retraite",
              "Crémaillère",
              "Cadeau rigolo",
            ],
          },
          {
            name: "Fête",
            elements: [
              "Noël",
              "Fête des pères",
              "Fête des mères",
              "Fête des grands-mères",
              "Saint Valentin",
              "Pâques",
              "Halloween",
              "Peu importe",
            ],
          },
        ],
      },
      {
        name: "Prix",
        dropdown: [
          {
            name: "",
            elements: ["€", "€€", "€€€", "Tous les prix"],
          },
        ],
      },
    ]);
  }, []);
  return (
    <Layout pageTitle="Mes cadeaux originaux - Trouver des idées de cadeau">
      <main>
        <div className="flex justify-center">
          <ul className="flex text-center justify-center border border-coolGray-100 rounded-full w-2/4 justify-around">
            {menuItems.length
              ? menuItems.map((item, index) => {
                  console.log(item);
                  return (
                    <li
                      key={index}
                      className="group flex-grow hover:bg-coolGray-200 cursor-pointer rounded-full"
                    >
                      <button className="w-full py-3">
                        <h5>{item.name}</h5>
                        <p className="text-sm">Peu importe</p>
                        <ul className="flex justify-around absolute bg-white border border-coolGray-100 w-72 rounded-xl mt-3 py-2 group-hover:flex">
                          {item.dropdown
                            ? item.dropdown.map((category, index) => {
                                console.log(category);
                                return (
                                  <div className="flex-grow" key={index}>
                                    <p>{category.name.toUpperCase()}</p>
                                    <ul className="flex-grow" key={index}>
                                      {category.elements
                                        ? category.elements.map(
                                            (element, index) => {
                                              return (
                                                <li
                                                  key={index}
                                                  className="hover:bg-orange-300 flex-grow"
                                                >
                                                  {element}
                                                </li>
                                              );
                                            }
                                          )
                                        : null}
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
      </main>
    </Layout>
  );
}
