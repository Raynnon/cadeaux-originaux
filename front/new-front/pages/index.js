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
    ]);
  }, []);
  return (
    <Layout pageTitle="Mes cadeaux originaux - Trouver des idées de cadeau">
      <main>
        <div className="flex justify-center">
          <ul className="flex text-center justify-center border border-coolGray-100 rounded-full w-2/4 justify-around">
            {menuItems.length
              ? menuItems.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="py-3 flex-grow hover:bg-coolGray-200 cursor-pointer rounded-full"
                    >
                      <button>
                        <h5>{item.name}</h5>
                        <p className="text-sm">Tous les prix</p>
                      </button>
                    </li>
                  );
                })
              : null}
            <li className="py-3 flex-grow hover:bg-coolGray-200 cursor-pointer rounded-full">
              <h5>Prix</h5>
              <p className="text-sm">Tous les prix</p>
              <ul className="absolute bg-white border border-coolGray-100 w-72 rounded-xl mt-5">
                {prices.length
                  ? prices.map((price, index) => {
                      return (
                        <li className="" key={index}>
                          {price}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </li>
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
