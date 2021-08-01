import Link from "next/link";

export default function Footer({ menuItems, prices }) {
  return (
    <footer className="pb-5 pt-5 bg-coolGray-600 text-coolGray-300 items-center xl:px-40 mt-10">
      <div className="text-center">
        <ul className="container mx-auto flex justify-between text-sm md:text-lg">
          <li>
            <ul className="flex flex-col font-semibold">
              <li>
                <Link href="/">
                  <a href="/">{"Nouveau".toUpperCase()}</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a href="/">{"Meilleures ventes".toUpperCase()}</a>
                </Link>
              </li>
              <li className="mt-10">
                <h5>{"Prix".toUpperCase()}</h5>
                <ul>
                  {prices.length
                    ? prices.map((price, index) => {
                        return (
                          <li key="index">
                            <Link href="/">
                              <a href="/" className="font-normal">
                                {price}
                              </a>
                            </Link>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </li>
            </ul>
          </li>
          <div></div>
          {menuItems.length
            ? menuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <ul>
                      <li className="font-semibold">
                        {item.name.toUpperCase()}
                      </li>
                      <ul className="flex">
                        {item.dropdown
                          ? item.dropdown.map((dropdown, index) => {
                              return (
                                <li href="/">
                                  <p>{dropdown.name.toUpperCase()}</p>
                                  <ul className="flex flex-col">
                                    {dropdown.elements
                                      ? dropdown.elements.map(
                                          (element, index) => {
                                            return (
                                              <Link href="/">
                                                <a href="/">{element}</a>
                                              </Link>
                                            );
                                          }
                                        )
                                      : null}
                                  </ul>
                                </li>
                              );
                            })
                          : null}
                      </ul>
                    </ul>
                  </li>
                );
              })
            : null}
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
