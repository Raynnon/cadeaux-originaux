import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductsSuggestion from "../../components/subcomponents/ProductsSuggestion";
import axios from "axios";

export default function Product({ productData }) {
  const [mainImage, setMainImage] = useState(productData.images[0]);
  const { name, description, strongPoints, urlAmazon } = productData;

  return (
    <Layout pageTitle={`${name} - Mes cadeaux originaux`}>
      <main className="mt-10 px-10 xl:px-32 ">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex lg:flex-col xl:flex-row justify-center lg:justify-start xl:justify-between items-center xl:items-center lg:pr-20 mb-10">
            {mainImage ? (
              <div className="w-2/3 md:w-1/2 lg:w-3/4">
                <Image
                  alt={name}
                  src={mainImage}
                  width={580}
                  height={580}
                  objectFit="responsive"
                  className="rounded-lg"
                />
              </div>
            ) : null}

            <div className="flex flex-col lg:flex-row xl:flex-col justify-between">
              {productData.images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="w-20 xl:w-36 border-2 border-transparent hover:border-orange-500 rounded-lg"
                  >
                    <Image
                      alt={name}
                      src={image}
                      width={140}
                      height={140}
                      layout="responsive"
                      className="rounded-md cursor-pointer"
                      onMouseEnter={() => setMainImage({ image }.image)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start mx-5 lg:w-1/2">
            <h1 className="mb-5 text-4xl font-semibold">{name}</h1>
            <p className="text-justify leading-loose">{description}</p>
            <Link href={urlAmazon}>
              <a>
                <button className="w-44 py-3 mt-10 rounded-lg text-white bg-orange-500 text-2xl">
                  En Savoir plus
                </button>
              </a>
            </Link>

            <ul className="mt-10">
              {strongPoints
                ? strongPoints.map((strength, index) => {
                    return (
                      <li
                        key={index}
                        className="flex justify-center lg:justify-start items-center  mb-5"
                      >
                        <div>
                          <Image
                            key={index}
                            alt="icone-cadeau"
                            src="/icons/cadeau.png"
                            width={32}
                            height={32}
                            objectFit="responsive"
                            className="rounded-md cursor-pointer"
                          />
                        </div>
                        <p className="mx-5">{strength}</p>
                        <div className="lg:hidden">
                          <Image
                            key={index}
                            alt="icone-cadeau"
                            src="/icons/cadeau.png"
                            width={32}
                            height={32}
                            objectFit="responsive"
                            className="rounded-md cursor-pointer"
                          />
                        </div>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>

        <ProductsSuggestion />
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const productData = await axios.get(
      "http://localhost:4000/products/613ddd08cd669a0245edb347"
    );

    return {
      props: { productData: productData.data }
    };
  } catch (e) {
    console.error(e);
  }
}
