import Image from "next/image";
import Link from "next/Link";

export default function Header({ menuItems }) {
  return (
    <header className="items-center shadow-sm xl:px-40 xl:flex text-center mb-10">
      <Link href="/">
        <a href="/">
          <Image
            src="/logos/logo-cadeaux-originaux-small.png"
            alt="logo-cadeaux-originaux"
            width="195"
            height="51.6"
          />
        </a>
      </Link>
      <nav className="flex justify-center">
        <ul className="flex font-semibold">
          <li className="dropdown group mx-5 py-5 text-sm border-b-4 border-transparent hover:border-orange-500  md:text-lg ">
            <Link href="/">
              <a
                className="dropdown text-coolGray-500 group-hover:text-coolGray-900"
                href="/"
              >
                Nouveau
              </a>
            </Link>
          </li>
          <li className="dropdown group mx-5 py-5 text-sm border-b-4 border-transparent hover:border-orange-500  md:text-lg ">
            <Link href="/">
              <a
                className="dropdown text-coolGray-500 group-hover:text-coolGray-900"
                href="/"
              >
                Meilleures ventes
              </a>
            </Link>
          </li>

          {menuItems.length
            ? menuItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="hidden dropdown group mx-5 py-5 text-lg border-b-4 border-transparent hover:border-orange-500 lg:block "
                  >
                    <Link href="/">
                      <a
                        className="dropdown text-coolGray-500 group-hover:text-coolGray-900"
                        href="/"
                      >
                        {item.name}
                      </a>
                    </Link>
                    {item.dropdown ? (
                      <ul className="flex absolute border border-coolGray-100 pb-2 bg-white rounded-xl hidden dropdown-menu group-hover:flex shadow">
                        {item.dropdown.map((item, index) => {
                          return (
                            <div key={index} className="flex flex-col">
                              <h4>{item.name.toUpperCase()}</h4>
                              {item.elements.map((element, index) => {
                                return (
                                  <a
                                    key={index}
                                    className="px-5 py-1 hover:bg-orange-300 font-normal"
                                    href="/"
                                  >
                                    {element}
                                  </a>
                                );
                              })}
                            </div>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })
            : null}
        </ul>
      </nav>
    </header>
  );
}