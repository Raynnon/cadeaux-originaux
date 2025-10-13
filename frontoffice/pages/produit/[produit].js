import Head from 'next/head';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ProductsSuggestion from '../../components/subcomponents/ProductsSuggestion';
import axios from 'axios';
import { split } from 'sentence-splitter';

export default function Product({
  product,
  defaultMainImage,
  productID,
  metaDescription
}) {
  const [mainImage, setMainImage] = useState(defaultMainImage);

  // By clicking on "Acheter" button, product visits are increased in db
  const addVisit = async () => {
    try {
      const formData = new FormData();
      formData.append('visits', 'true');

      await axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_API_URL}/products/${productID}`,
        data: formData
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <Layout>
      <main className="mt-10 px-10 xl:px-32 ">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex lg:flex-col xl:flex-row justify-center lg:justify-start xl:justify-between items-center xl:items-center lg:pr-20 mb-10">
            {mainImage ? (
              <div className="w-2/3 md:w-1/2 lg:w-3/4">
                <Image
                  alt={product.name}
                  src={mainImage}
                  width={580}
                  height={580}
                  quality={100}
                />
              </div>
            ) : null}

            <div className="flex flex-col lg:flex-row xl:flex-col justify-between">
              {product.images
                ? product.images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className="w-20 xl:w-36 border-2 border-transparent hover:border-orange-400"
                      >
                          <Image
                            alt={product.name}
                            src={image}
                            width={140}
                            height={140}
                            layout="responsive"
                            className="cursor-pointer"
                            onMouseEnter={() => setMainImage({ image }.image)}
                          />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start mx-5 lg:w-1/2">
            <h1 className="mb-5 text-4xl font-semibold">{product.name}</h1>
            <p className="text-justify leading-loose">{product.description}</p>
            {product.urlAmazon && (
              <Link
                href={product.urlAmazon}
                rel="noopener"
                target="_blank"
              >
                <button
                  className="w-44 py-3 mt-10 text-white bg-orange-400 text-2xl hover:bg-orange-500"
                  onClick={addVisit}
                >
                  Acheter
                </button>
              </Link>
            )}

            <ul className="mt-10">
              {product.strongPoints
                ? product.strongPoints.map((strength, index) => {
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
    </>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const productData = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?_id=${query.productId}&images=true`
    );

    const product = productData.data[0];
    const defaultMainImage = productData.data[0].images[0];

    // SPLIT SENTENCES OF THE PRODUCT DESCRIPTION
    const sentences = split(product.description).filter(
      (item) => item.type === 'Sentence'
    );

    // Description Limit is max size of metadescription - "Acheter {product name}"
    const descriptionLimit = 155 - 11 - product.name.length;
    let limitedDescription = sentences
      .filter((items) => items.range[1] < descriptionLimit)
      .map((item) => item.raw)
      .join(' ');

    let metaDescription = `Acheter ${product.name.toLowerCase()} - ${limitedDescription}`;
    return {
      props: {
        product,
        defaultMainImage,
        productID: query.productId,
        metaDescription,
        key: query.productId
      }
    };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
}
