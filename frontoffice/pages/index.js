/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import SearchBox from '../components/subcomponents/Searchbox';
import ProductsSuggestion from '../components/subcomponents/ProductsSuggestion';

export default function Home() {
  const categoriesShowcase = [
    {
      name: 'Anniversaire',
      image: '/images/categories-showcase/ballons-anniversaire.jpg',
      link: '/category/Anniversaire'
    },
    {
      name: 'Romantique',
      image: '/images/categories-showcase/couple-s-embrasse.jpg',
      link: '/category/Romantique'
    },
    {
      name: 'Naissance',
      image: '/images/categories-showcase/bebe-yeux-bleus.jpg',
      link: '/category/B%C3%A9b%C3%A9'
    },
    {
      name: 'Mariage',
      image: '/images/categories-showcase/couple-mariage.jpg',
      link: '/category/Mariage'
    },
    {
      name: 'Remerciement',
      image: '/images/categories-showcase/carte-merci.jpg',
      link: '/category/Remerciements'
    },
    {
      name: 'Fun',
      image: '/images/categories-showcase/mamie-sombrero.jpg',
      link: '/category/Cadeau-rigolo'
    }
  ];

  return (
    <Layout
      pageTitle="Mes cadeaux originaux - Trouver des idées de cadeau"
      description="Mes cadeaux originaux est un site web vous permettant de trouver un cadeau en fonction de la personne ou de l'évènement. Cadeaux d'anniversaire, pour femme..."
    >
      <div>
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
            <SearchBox className="relative" />

            <div className="flex lg:block flex-col items-center text-center lg:text-left lg:pt-20 xl:pt-40 pb-10 lg:pb-24 xl:pb-32">
              <h1 className="p-5 md:mx-20 lg:mx-32 w-auto lg:w-2/5 bg-opacity-30 bg-coolGray-900 text-white font-black rounded-lg text-4xl xl:text-5xl leading-relaxed xl:leading-relaxed">
                Nos meilleurs cadeaux d'anniversaire
              </h1>
              <Link href="/category/Anniversaire">
                <a>
                  <button className="w-44 px-5 py-3 lg:ml-32 mt-10 rounded-lg text-white bg-orange-400 text-3xl hover:bg-orange-500">
                    Découvrir
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* CATEGORIES */}
        <div className="px-1 items-center grid grid-flow-col grid-cols-2 grid-rows-3 gap-1 text-center py-5 sm:grid-cols-3 sm:grid-rows-2 xl:px-56 bg-coolGray-100">
          {categoriesShowcase.length
            ? categoriesShowcase.map((category, index) => {
                return (
                  <div key={index} className="flex items-center justify-center">
                    <figure className="relative max-w-xs cursor-pointer">
                      <Link href={category.link}>
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

        <div className="px-8 xl:px-32">
          <ProductsSuggestion type="new" />
          <ProductsSuggestion />
        </div>
      </div>
    </Layout>
  );
}
