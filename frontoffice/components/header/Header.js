/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  MenuIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/solid';

import logo from '../../public/logos/logo-cadeaux-originaux-small.png';

export default function Header({ categories }) {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({});
  const [subMenuActive, setSubMenuActive] = useState(false);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    setCurrentMenu(categories);
    setFeaturedCategories(['Nouveau', 'Meilleurs cadeaux']);
  }, [categories]);

  const onMenuItemClick = (categoryItem) => {
    const newMenu = categories[categoryItem];

    setSubMenuActive(true);
    setFeaturedCategories([]);
    setCurrentMenu(newMenu);
  };

  const onArrowBackClick = () => {
    setSubMenuActive(false);
    setFeaturedCategories(['Nouveau', 'Meilleurs cadeaux']);
    setCurrentMenu(categories);
  };

  return (
    <header className="sticky lg:static top-0 z-50 bg-white items-center text-center h-14 px-2 md:px-10 flex">
      <div className="lg:hidden">
        <MenuIcon
          className="h-10 w-10 hover:cursor-pointer"
          onClick={() =>
            mobileMenuActive
              ? setMobileMenuActive(false)
              : setMobileMenuActive(true)
          }
        />

        {mobileMenuActive ? (
          <nav
            className="absolute left-0 top-14 w-3/5 sm:w-2/5 bg-white min-h-screen text-left shadow"
            style={{}}
          >
            <ul>
              {!subMenuActive ? (
                <li className="px-4 py-2 flex justify-between bg-coolGray-700 text-white">
                  <p className="font-semibold">MENU</p>
                </li>
              ) : (
                <li className="px-4 py-2 flex justify-between bg-coolGray-700 text-white">
                  <ChevronLeftIcon
                    className="h-7 w-7"
                    onClick={onArrowBackClick}
                  />
                </li>
              )}

              {featuredCategories.map((category, index) => {
                return (
                  <Link
                    href={{
                      pathname: `/category/${category.split(/[ ,]+/).join('-')}`
                    }}
                    key={index}
                  >
                    <a className="font-semibold">
                      <li className="px-4 py-2 bg-coolGray-100 text-orange-400 border-b-2 border-coolGray-200">
                        {category.toUpperCase()}
                      </li>
                    </a>
                  </Link>
                );
              })}

              {!subMenuActive
                ? Object.keys(currentMenu).map((categoryItem, index) => {
                    return (
                      <li
                        key={index}
                        className="px-4 py-2 border-b-2 border-coolGray-100 flex justify-between"
                        onClick={() => onMenuItemClick(categoryItem)}
                      >
                        <p className="font-semibold">
                          {categoryItem.toUpperCase()}
                        </p>
                        <ChevronRightIcon className="h-5 w-5" />
                      </li>
                    );
                  })
                : currentMenu.map((categoryItem, index) => {
                    return (
                      <Link
                        href={{
                          pathname: `/category/${categoryItem.name
                            .split(/[ ,]+/)
                            .join('-')}`
                        }}
                        key={index}
                      >
                        <a className="font-semibold">
                          <li
                            key={index}
                            className="px-4 py-2 border-b-2 border-coolGray-100 flex justify-between"
                          >
                            <p className="font-semibold">
                              {categoryItem.name.toUpperCase()}
                            </p>
                          </li>
                        </a>
                      </Link>
                    );
                  })}
            </ul>
          </nav>
        ) : (
          ''
        )}
      </div>

      <Link href="/">
        <a className="flex justify-center flex-1">
          <Image src={logo} height={50} width={179} />
        </a>
      </Link>
    </header>
  );
}
