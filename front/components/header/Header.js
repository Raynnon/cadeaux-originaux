/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Link from "next/link";

export default function Header({ categories }) {
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
      <nav className="flex justify-center">
        <ul className="flex font-semibold">
          <li className="dropdown group mx-5 py-5 text-sm border-b-4 border-transparent hover:border-orange-500  md:text-lg ">
            <Link
              href={{
                pathname: `/category/Nouveau`
              }}
            >
              <a className="dropdown text-coolGray-500 group-hover:text-coolGray-900">
                Nouveau
              </a>
            </Link>
          </li>
          <li className="dropdown group mx-5 py-5 text-sm border-b-4 border-transparent hover:border-orange-500  md:text-lg ">
            <Link
              href={{
                pathname: `/category/Meilleurs-cadeaux`
              }}
            >
              <a className="dropdown text-coolGray-500 group-hover:text-coolGray-900">
                Meilleures ventes
              </a>
            </Link>
          </li>
          <li className="dropdown group mx-5 py-5 text-lg border-b-4 border-transparent hover:border-orange-500 lg:block">
            <p className="dropdown text-coolGray-500 group-hover:text-coolGray-900">
              Pour qui?
            </p>

            <ul className="invisible absolute border border-coolGray-100 pb-2 bg-white rounded-lg dropdown-menu shadow z-10 flex-row group-hover:visible">
              {menuItem("Genre")}
              {menuItem("Type")}
            </ul>
          </li>

          <li className="dropdown group mx-5 py-5 text-lg border-b-4 border-transparent hover:border-orange-500 lg:block">
            <p className="dropdown text-coolGray-500 group-hover:text-coolGray-900">
              Événements
            </p>

            <ul className="invisible absolute border border-coolGray-100 pb-2 bg-white rounded-lg dropdown-menu shadow z-10 flex-row group-hover:visible">
              {menuItem("Occasion")}
              {menuItem("Fête")}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
