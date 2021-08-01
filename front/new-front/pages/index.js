import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import SearchBox from "../components/subcomponents/Searchbox";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
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
        <SearchBox menuItems={menuItems} />
      </main>
    </Layout>
  );
}
