/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

export default function ProductsSuggestion({ type }) {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const productsReq = await axios("http://localhost:4000/products");
    setProducts(productsReq.data);

    if (type === "new") {
      setTitle("Nouveaux produits");
    } else {
      setTitle("Meilleurs produits");
    }
  }, []);

  return (
    <section className="mt-5">
      <h2 className="text-3xl font-medium mb-3">{title}</h2>
      <div className="grid grid-flow-col grid-cols-3 md:grid-cols-6 grid-rows-2 md:grid-rows-1 gap-2">
        {products.map((product, index) => {
          return (
            <Link key={index} href="/">
              <a>
                <div className="mx-1 p-2 rounded-lg bg-coolGray-100 hover:scale-105 flex flex-col">
                  {product.images.length ? (
                    <Image
                      alt={product.name}
                      src={product.images[0]}
                      width={150}
                      height={150}
                      objectFit="cover"
                      quality={10}
                      className="z-1 rounded-lg"
                    />
                  ) : null}
                  <p className="text-center font-medium">{product.name}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
