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

  const categoriesShowcase = [
    {
      name: "Anniversaire",
      image: "/images/categories-showcase/ballons-anniversaire.jpg",
    },
    {
      name: "Romantique",
      image: "/images/categories-showcase/couple-s-embrasse.jpg",
    },
    {
      name: "Naissance",
      image: "/images/categories-showcase/bebe-yeux-bleus.jpg",
    },
    {
      name: "Mariage",
      image: "/images/categories-showcase/couple-mariage.jpg",
    },
    {
      name: "Remerciement",
      image: "/images/categories-showcase/carte-merci.jpg",
    },
    {
      name: "Fun",
      image: "/images/categories-showcase/mamie-sombrero.jpg",
    },
  ];

  return (
    <Layout pageTitle="Mes cadeaux originaux - Trouver des idées de cadeau">
      <main>
        {/* BANNER */}
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
        {/* CATEGORIES */}
        <div className="items-center grid grid-flow-col grid-cols-3 grid-rows-2 gap-1 text-center mt-5 xl:mx-56">
          {categoriesShowcase.length
            ? categoriesShowcase.map((category, index) => {
                return (
                  <Link href="/">
                    <div class="flex items-center justify-center">
                      <figure class="relative max-w-xs cursor-pointer">
                        <Image
                          alt={category.name}
                          src={category.image}
                          width={600}
                          height={350}
                          objectFit="cover"
                          quality={50}
                        />
                        <figcaption class="absolute text-lg -mt-16 text-white px-4 bg-opacity-30 bg-coolGray-900">
                          <p>{category.name}</p>
                        </figcaption>
                      </figure>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </main>
    </Layout>
  );
}
