/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import slugify from "slugify";

export default function ProductsSuggestion({ type }) {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    let productsReq = [];

    if (type === "new") {
      setTitle("Nouveaux produits");
      productsReq = await axios(
        "http://localhost:4000/products?sortBy=Nouveau&currentPage=1&productsPerPage=6"
      );
    } else {
      setTitle("Meilleurs produits");
      productsReq = await axios(
        "http://localhost:4000/products?sortBy=Meilleures ventes&currentPage=1&productsPerPage=6"
      );
    }

    setProducts(productsReq.data);
  }, []);

  return (
    <section className="mt-5">
      <h2 className="text-3xl font-medium mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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
                <div className="rounded-lg flex flex-col shadow-md h-46 hover:bg-coolGray-100">
                  {product.images.length ? (
                    <Image
                      alt={product.name}
                      src={product.images[0]}
                      width={150}
                      height={150}
                      objectFit="cover"
                      className="z-1 rounded-lg"
                    />
                  ) : null}
                  <div className="flex items-center text-center font-small h-12 overflow-hidden align-middle justify-center">
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

{
  /* <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=376&q=80')">
                            <button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">Chanel</h3>
                            <span class="text-gray-500 mt-2">$12</span>
                        </div>
                    </div> */
}
