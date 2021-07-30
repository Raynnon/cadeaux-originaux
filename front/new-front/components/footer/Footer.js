import Link from "next/Link";

export default function Footer({ menuItems }) {
  return (
    <div className="bg-coolGray-600 text-white items-center shadow-sm xl:px-40 xl:flex text-center">
      <ul className="container mx-auto flex justify-between text-sm md:text-lg">
        <li>
          <ul className="flex flex-col font-semibold">
            <Link href="/">
              <a href="/">Nouveau</a>
            </Link>
            <Link href="/">
              <a href="/">Meilleures ventes</a>
            </Link>
          </ul>
        </li>
        {menuItems.length
          ? menuItems.map((item, index) => {
              return (
                <li key={index}>
                  <ul className="font-semibold">
                    <li>{item.name}</li>
                    <ul className="flex">
                      {item.dropdown
                        ? item.dropdown.map((dropdown, index) => {
                            return (
                              <li href="/">
                                <p>{dropdown.name}</p>
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
  );
}
