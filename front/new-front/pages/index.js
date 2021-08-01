import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
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
        <div className="relative pt-10">
          <Image
            alt="gateau-anniversaire"
            src="/images/gateau-anniversaire.png"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-1"
          />
          <div className="relative">
            <SearchBox menuItems={menuItems} className="relative" />
            <div className="flex lg:block flex-col items-center  text-center lg:text-left lg:pt-20 xl:pt-40 pb-10 lg:pb-24 xl:pb-32">
              <h1 className="p-5 md:mx-20 lg:mx-32 w-auto lg:w-2/5 bg-opacity-30 bg-coolGray-900 text-white font-black rounded-lg font-mono text-4xl xl:text-6xl leading-relaxed xl:leading-relaxed">
                Nos meilleurs cadeaux d'anniversaire
              </h1>
              <Link href="/">
                <button className="w-44 px-5 py-3 lg:ml-32 mt-10 rounded-lg text-white bg-orange-500 text-3xl">
                  Découvrir
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
