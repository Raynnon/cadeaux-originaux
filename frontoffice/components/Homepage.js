/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Layout from "./Layout";
import SearchBox from "./subcomponents/Searchbox";
import ProductsSuggestion from "./subcomponents/ProductsSuggestion";
import { categoriesShowcase } from "../data/categories";
import { SECTION_TITLES, LABELS, ALT_TEXT, IMAGE_CONFIG } from "../constants";

/**
 * Homepage Component
 * Displays the main landing page with banner, category showcase, and product suggestions
 */
export default function Home() {

  return (
    <>
      <Head>
        <title>Mes cadeaux originaux - Trouver des idées de cadeau</title>
        <meta
          name="description"
          content="Mes cadeaux originaux est un site web vous permettant de trouver un cadeau en fonction de la personne ou de l'évènement. Cadeaux d'anniversaire, pour femme..."
        />
      </Head>
      <Layout>
      <div>
        {/* Banner Section */}
        <div className="relative pt-10">
          <Image
            alt={ALT_TEXT.BIRTHDAY_CAKE}
            src="/images/banners/gateau-anniversaire.png"
            layout="fill"
            objectFit="cover"
            quality={IMAGE_CONFIG.QUALITY.HIGH}
            className="z-1"
          />

          <div className="relative">
            <SearchBox className="relative" />

            <div className="flex lg:block flex-col items-center text-center lg:text-left lg:pt-20 xl:pt-40 pb-10 lg:pb-24 xl:pb-32">
              <h1 className="p-5 md:mx-20 lg:mx-32 w-auto lg:w-2/5 bg-opacity-30 bg-coolGray-900 text-white font-black rounded-lg font-mono text-4xl xl:text-6xl leading-relaxed xl:leading-relaxed">
                {SECTION_TITLES.BIRTHDAY_GIFTS}
              </h1>
              <Link href="/category/Anniversaire">
                <button className="w-44 px-5 py-3 lg:ml-32 mt-10 rounded-lg text-white bg-orange-500 text-3xl hover:bg-orange-600">
                  {LABELS.DISCOVER}
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Categories Showcase Section */}
        <div className="px-1 items-center grid grid-flow-col grid-cols-2 grid-rows-3 gap-1 text-center py-5 sm:grid-cols-3 sm:grid-rows-2 xl:px-56 bg-coolGray-100">
          {categoriesShowcase.map((category, index) => (
            <div key={index} className="flex items-center justify-center">
              <figure className="relative max-w-xs cursor-pointer">
                <Link href={category.link}>
                  <Image
                    alt={category.name}
                    src={category.image}
                    width={IMAGE_CONFIG.SIZES.MEDIUM}
                    height={350}
                    objectFit="cover"
                    quality={IMAGE_CONFIG.QUALITY.MEDIUM}
                    className="rounded-lg"
                  />
                </Link>
                <figcaption className="absolute text-lg -mt-16 text-white px-4 bg-opacity-30 bg-coolGray-900">
                  <p className="font-medium">{category.name}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        {/* Product Suggestions Section */}
        <div className="px-8 xl:px-32">
          <ProductsSuggestion type="new" />
          <ProductsSuggestion />
        </div>

        {/* SEO Description Section */}
        <p className="px-1 py-5 mt-5 -mb-10 lg:px-32 bg-coolGray-100 leading-loose text-sm md:text-base md:leading-loose text-justify">
          Mes cadeaux originaux est un site web qui vous donne des idées de
          cadeaux. Vous trouverez des cadeaux d'anniversaire, de Noël,
          romantiques etc. Il y en a pour tous les goûts! Que vous souhaitiez
          offrir un cadeau à un homme, une femme, un enfant ou votre animal de
          compagnie, vous trouverez toujours un cadeau original! Explorez les
          différentes sections du site et vous trouverez forcément votre
          bonheur. Il y en a pour tous les goût et toutes les bourses. Même avec
          un petit budget c'est sûr que vous trouverez un cadeau sympas pour vos
          proches. Vous cherchez une idée de cadeau? Vous êtes au bon endroit!
        </p>
      </div>
      </Layout>
    </>
  );
}
