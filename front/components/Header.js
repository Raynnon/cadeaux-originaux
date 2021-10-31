/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header({ categories }) {
  const [showMenu, setShowMenu] = useState(true);
  const [smallDevice, setSmallDevice] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setShowMenu(false);
      setSmallDevice(true);
    }
  }, []);

  const menuItem = (item) => {
    return (
      <div className="flex flex-col">
        <h4>{item}</h4>
        {categories[item]
          ? categories[item].map((category, index) => {
              return (
                <Link
                  key={index}
                  href={{
                    pathname: `/category/${category.name
                      .split(/[ ,]+/)
                      .join("-")}`
                  }}
                >
                  <a className="px-5 py-1 hover:bg-orange-300 font-normal">
                    {category.name}
                  </a>
                </Link>
              );
            })
          : null}
      </div>
    );
  };

  return (
    <header className="items-center shadow-sm lg:px-32 xl:flex text-center">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/">
            <a>
              <Image
                src="/logos/logo-cadeaux-originaux-small.png"
                alt="logo-cadeaux-originaux"
                width="195"
                height="51.6"
              />
            </a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setShowMenu(!showMenu)}>
            <Image
              alt="icone-menu"
              src="/icons/menu-icon.svg"
              width={40}
              height={40}
              objectFit="responsive"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
        {showMenu ? (
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <Link
              href={{
                pathname: `/category/Nouveau`
              }}
            >
              <a className="block my-2 mx-3 lg:text-lg lg:mt-0 lg:inline-block text-coolGray-500 hover:text-coolGray-900">
                Nouveau
              </a>
            </Link>
            <Link
              href={{
                pathname: `/category/Meilleurs-cadeaux`
              }}
            >
              <a className="block my-2 mx-3 lg:text-lg lg:mt-0 lg:inline-block text-coolGray-500 hover:text-coolGray-900 ">
                Meilleures ventes
              </a>
            </Link>

            <li className="hidden dropdown my-2 mx-3 group lg:block lg:text-lg lg:mt-0 lg:inline-block">
              <p className="dropdown text-coolGray-500 group-hover:text-coolGray-900">
                Pour qui?
              </p>

              <ul className="invisible absolute border border-coolGray-100 pb-2 bg-white rounded-lg dropdown-menu shadow z-10 flex-row group-hover:visible">
                {menuItem("Genre")}
                {menuItem("Type")}
              </ul>
            </li>

            <li className="hidden dropdown my-2 mx-3 group lg:block lg:text-lg lg:mt-0 lg:inline-block">
              <p className="dropdown text-coolGray-500 group-hover:text-coolGray-900">
                Événements
              </p>

              <ul className="invisible absolute border border-coolGray-100 pb-2 bg-white rounded-lg dropdown-menu shadow z-10 flex-row group-hover:visible">
                {menuItem("Occasion")}
                {menuItem("Fête")}
              </ul>
            </li>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
