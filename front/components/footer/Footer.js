/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

export default function Footer({ categories, prices }) {
  return (
    <footer className="pb-5 pt-5 bg-coolGray-600 text-coolGray-300 items-center xl:px-40 mt-10">
      <div className="text-center">
        <ul className="container mx-auto flex justify-between text-sm md:text-lg">
          <li>
            <ul className="flex flex-col font-semibold">
              <li>
                <Link href="/">
                  <a>{"Nouveau".toUpperCase()}</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>{"Meilleures ventes".toUpperCase()}</a>
                </Link>
              </li>
              <li className="mt-10">
                <h5>{"Prix".toUpperCase()}</h5>
                <ul>
                  {prices.length
                    ? prices.map((price, index) => {
                        return (
                          <li key={index}>
                            <Link
                              href={{
                                pathname: `/categorie/${price.name
                                  .toLowerCase()
                                  .split(/[ ,]+/)
                                  .join("-")}`,
                                query: { categoryName: price.name }
                              }}
                            >
                              <a className="font-normal">{price.shortName}</a>
                            </Link>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </li>
            </ul>
          </li>
          {Object.keys(categories).map((category, index) => {
            return (
              <li key={index}>
                <ul>
                  <li className="font-semibold">{category.toUpperCase()}</li>
                  <ul>
                    {categories[category]
                      ? categories[category].map((list, index) => {
                          return (
                            <li key={index}>
                              <Link
                                href={{
                                  pathname: `/categorie/${list.name
                                    .toLowerCase()
                                    .split(/[ ,]+/)
                                    .join("-")}`,
                                  query: { categoryName: list.name }
                                }}
                              >
                                <a>{list.name}</a>
                              </Link>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-center mt-5 md:text-lg">
        Mes cadeaux originaux © {new Date().getFullYear()} - Tous Droits
        Réservés
      </p>
      <style jsx>{`
        a:hover {
          color: black;
        }
      `}</style>
    </footer>
  );
}
