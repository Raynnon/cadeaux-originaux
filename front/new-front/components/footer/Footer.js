import Link from "next/Link";

export default function Footer({ menuItems }) {
  return (
    <footer className="pb-5 pt-5 bg-coolGray-600 text-coolGray-300 items-center xl:px-40 ">
      <div className="text-center">
        <ul className="container mx-auto flex justify-between text-sm md:text-lg">
          <li>
            <ul className="flex flex-col font-semibold">
              <Link href="/">
                <a href="/">{"Nouveau".toUpperCase()}</a>
              </Link>
              <Link href="/">
                <a href="/">{"Meilleures ventes".toUpperCase()}</a>
              </Link>
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

      <p className="text-center mt-5">
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
