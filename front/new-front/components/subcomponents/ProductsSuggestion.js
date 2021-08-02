import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsSuggestion({ type }) {
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (type === "new") {
      setTitle("Nouveaux produits");
      setProducts([
        { name: "Shoes", imageSRC: "https://picsum.photos/150/150" },
        { name: "Glasses", imageSRC: "https://picsum.photos/200/200" },
        { name: "Coat", imageSRC: "https://picsum.photos/250/250" },
        { name: "Watch", imageSRC: "https://picsum.photos/300/300" },
        { name: "Keyboard", imageSRC: "https://picsum.photos/350/350" },
        { name: "Scooter", imageSRC: "https://picsum.photos/400/400" },
      ]);
    } else {
      setTitle("Meilleurs produits");
      setProducts([
        { name: "Shoes", imageSRC: "https://picsum.photos/150/150" },
        { name: "Glasses", imageSRC: "https://picsum.photos/200/200" },
        { name: "Coat", imageSRC: "https://picsum.photos/250/250" },
        { name: "Watch", imageSRC: "https://picsum.photos/300/300" },
        { name: "Keyboard", imageSRC: "https://picsum.photos/350/350" },
        { name: "Scooter", imageSRC: "https://picsum.photos/400/400" },
      ]);
    }
  }, [type]);

  return (
    <section className="mt-5 lg:mx-32">
      <h2 className="text-3xl font-medium mb-3">{title}</h2>
      <div className="grid grid-flow-col grid-cols-3 md:grid-cols-6 grid-rows-2 md:grid-rows-1 gap-2">
        {products.map((product, index) => {
          return (
            <Link key={index} href="/">
              <a href="/">
                <div className="mx-1 p-2 rounded-lg bg-coolGray-100 hover:scale-105 flex flex-col">
                  <Image
                    alt={product.name}
                    src={product.imageSRC}
                    width={150}
                    height={150}
                    objectFit="cover"
                    quality={10}
                    className="z-1 rounded-lg"
                  />
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
