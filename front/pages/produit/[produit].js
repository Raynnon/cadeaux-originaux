import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductsSuggestion from "../../components/subcomponents/ProductsSuggestion";
import axios from "axios";

export default function Product({ productData }) {
  console.log(productData);
  const product = {
    id: "1",
    name: "Shoes",
    imagesSRC: [
      "https://picsum.photos/750/750",
      "https://picsum.photos/600/600",
      "https://picsum.photos/650/650",
      "https://picsum.photos/700/700"
    ],
    price: "€",
    strengths: ["Super cool", "Il est très doux", "Vraiment très économique"]
  };
  const [mainImage, setMainImage] = useState(product.imagesSRC[0]);

  return (
    <Layout pageTitle={`${productData.name} - Mes cadeaux originaux`}>
      <main className="mt-10 px-10 xl:px-32 ">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex lg:flex-col xl:flex-row justify-center lg:justify-start xl:justify-between items-center xl:items-center lg:pr-20 mb-10">
            {mainImage ? (
              <div className="w-2/3 md:w-1/2 lg:w-3/4">
                <Image
                  alt={productData.name}
                  src={mainImage}
                  width={580}
                  height={580}
                  objectFit="responsive"
                  className="rounded-lg"
                />
              </div>
            ) : null}

            <div className="flex flex-col lg:flex-row xl:flex-col justify-between">
              {product.imagesSRC.map((image, index) => {
                return (
                  <div className="w-20 xl:w-36 border-2 border-transparent hover:border-orange-500 rounded-lg">
                    <Image
                      key={index}
                      alt={productData.name}
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
            <h1 className="mb-5 text-4xl font-semibold">{productData.name}</h1>
            <p className="text-justify leading-loose">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              lacinia mi purus, ut mattis ante pharetra non. Fusce et odio
              commodo, hendrerit est ac, aliquam sem. Morbi commodo suscipit
              tincidunt. Donec molestie mi nec mauris sollicitudin, eu dapibus
              eros sollicitudin. Fusce maximus justo sed placerat pellentesque.
              Vivamus mollis, enim in tincidunt rhoncus, purus lectus fermentum
              dolor, eu semper est lacus vitae ex. Phasellus porta ex justo.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis
              dignissim purus, at viverra mi. Morbi vel ligula quis eros
              facilisis mattis in non massa. Fusce euismod metus id mauris
              ultrices gravida. Proin laoreet nisl at metus vestibulum, eget
              tristique lorem finibus. Duis feugiat felis turpis, ut eleifend
              elit lobortis ac. Sed ipsum enim, dignissim a ultrices ac, mattis
              et ipsum.
            </p>
            <button className="w-44 py-3 mt-10 rounded-lg text-white bg-orange-500 text-3xl">
              Acheter
            </button>
            <ul className="mt-10">
              {product.strengths.length
                ? product.strengths.map((strength, index) => {
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
      "http://localhost:4000/products/611113c90378f811d9271cc8"
    );

    return {
      props: { productData: productData.data }
    };
  } catch (e) {
    console.error(e);
  }
}
