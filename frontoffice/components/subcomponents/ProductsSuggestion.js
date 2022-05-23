/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import axios from 'axios';
import slugify from 'slugify';

export default function ProductsSuggestion({ type }) {
  const [title, setTitle] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    let productsReq = [];

    if (type === 'new') {
      setTitle('Nouveaux produits');
      productsReq = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products?images=true&sortBy=Nouveau&currentPage=1&productsPerPage=6`
      );
    } else {
      setTitle('Meilleurs produits');
      productsReq = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/products?images=true&currentPage=1&productsPerPage=6&sortBy=Meilleures ventes`
      );
    }

    setProducts(productsReq.data);
  }, []);

  return (
    <section className="my-12">
      <h2 className="text-center text-3xl font-medium mb-7">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: `/produit/${slugify(product.name)}`,
                query: {
                  productId: product._id
                }
              }}
            >
              <a>
                <div className="flex flex-col shadow-md h-46 hover:bg-coolGray-100">
                  {product.images ? (
                    <Image
                      alt={product.name}
                      src={product.images[0]}
                      width={150}
                      height={150}
                      objectFit="cover"
                      className="z-1"
                    />
                  ) : null}
                  <div className="flex items-center text-center font-small h-16 align-middle justify-center">
                    <p>{product.name}</p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
