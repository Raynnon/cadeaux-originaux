import Header from "./header/Header";
import Footer from "./footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Layout({ children, pageTitle }) {
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
    <div className="text-coolGray-900">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header menuItems={menuItems} />
      <main>{children}</main>
      <Footer menuItems={menuItems} prices={prices} />
    </div>
  );
}
