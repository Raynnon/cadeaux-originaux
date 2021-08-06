/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import SearchBox from "../components/subcomponents/Searchbox";
import ProductsSuggestion from "../components/subcomponents/ProductsSuggestion";

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
            src="/images/banners/gateau-anniversaire.png"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-1"
          />
          <div className="relative">
            <SearchBox menuItems={menuItems} className="relative" />
            <div className="flex lg:block flex-col items-center text-center lg:text-left lg:pt-20 xl:pt-40 pb-10 lg:pb-24 xl:pb-32">
              <h1 className="p-5 md:mx-20 lg:mx-32 w-auto lg:w-2/5 bg-opacity-30 bg-coolGray-900 text-white font-black rounded-lg font-mono text-4xl xl:text-6xl leading-relaxed xl:leading-relaxed">
                Nos meilleurs cadeaux d'anniversaire
              </h1>
              <Link href="/">
                <a>
                  <button className="w-44 px-5 py-3 lg:ml-32 mt-10 rounded-lg text-white bg-orange-500 text-3xl">
                    Découvrir
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* CATEGORIES */}
        <div className="px-1 items-center grid grid-flow-col grid-cols-3 grid-rows-2 gap-1 text-center py-5 xl:px-56 bg-coolGray-100">
          {categoriesShowcase.length
            ? categoriesShowcase.map((category, index) => {
                return (
                  <div key={index} className="flex items-center justify-center">
                    <figure className="relative max-w-xs cursor-pointer">
                      <Link href="/">
                        <a>
                          <Image
                            alt={category.name}
                            src={category.image}
                            width={600}
                            height={350}
                            objectFit="cover"
                            quality={50}
                            className="rounded-lg"
                          />
                        </a>
                      </Link>
                      <figcaption className="absolute text-lg -mt-16 text-white px-4 bg-opacity-30 bg-coolGray-900">
                        <p className="font-medium">{category.name}</p>
                      </figcaption>
                    </figure>
                  </div>
                );
              })
            : null}
        </div>
        <ProductsSuggestion type="new" />
        <ProductsSuggestion />
        <p className="px-1 py-5 mt-5 -mb-10 lg:px-32 bg-coolGray-100 leading-loose text-sm md:text-base md:leading-loose text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </main>
    </Layout>
  );
}
