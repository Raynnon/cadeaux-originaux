/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  Bars3Icon as MenuIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/solid';

import logo from '../../public/logos/logo-cadeaux-originaux-small.png';
import { featuredCategories } from '../../data/categories';
import { LABELS } from '../../constants';

/**
 * Header Component
 * Displays the main header with logo and mobile navigation menu
 * @param {Object} categories - Categories data from API
 */
export default function Header({ categories }) {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({});
  const [subMenuActive, setSubMenuActive] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  useEffect(() => {
    setCurrentMenu(categories);
    setDisplayedCategories(featuredCategories);
  }, [categories]);

  /**
   * Handle menu item click to show subcategories
   */
  const onMenuItemClick = (categoryItem) => {
    const newMenu = categories[categoryItem];

    setSubMenuActive(true);
    setDisplayedCategories([]);
    setCurrentMenu(newMenu);
  };

  /**
   * Handle back button click in mobile menu
   */
  const onArrowBackClick = () => {
    setSubMenuActive(false);
    setDisplayedCategories(featuredCategories);
    setCurrentMenu(categories);
  };

  return (
    <header className="sticky lg:static top-0 z-30 bg-white items-center text-center h-14 px-2 md:px-10 flex">
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <MenuIcon
          className="h-10 w-10 hover:cursor-pointer"
          onClick={() => setMobileMenuActive(!mobileMenuActive)}
        />

        {/* Mobile Navigation Menu */}
        {mobileMenuActive ? (
          <nav className="absolute left-0 top-14 w-3/5 sm:w-2/5 bg-white min-h-screen text-left shadow">
            <ul>
              {/* Menu Header */}
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

              {/* Featured Categories */}
              {displayedCategories.map((category, index) => {
                return (
                  <li key={index} className="px-4 py-2 bg-coolGray-100 text-orange-400 border-b-2 border-coolGray-200">
                    <Link
                      href={`/category/${category.split(/[ ,]+/).join('-')}`}
                      className="font-semibold block"
                    >
                      {category.toUpperCase()}
                    </Link>
                  </li>
                );
              })}

              {/* Main Categories (shows subcategories on click) */}
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
                : /* Subcategories List */
                  currentMenu.map((categoryItem, index) => {
                    return (
                      <li
                        key={index}
                        className="px-4 py-2 border-b-2 border-coolGray-100"
                      >
                        <Link
                          href={`/category/${categoryItem.name.split(/[ ,]+/).join('-')}`}
                          className="font-semibold block"
                        >
                          {categoryItem.name.toUpperCase()}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </nav>
        ) : null}
      </div>

      {/* Logo - Centered */}
      <div className="flex flex-1 justify-center ">
        <Link href="/" className="flex justify-center">
          <Image src={logo} height={50} width={179} alt="Mes cadeaux originaux logo" />
        </Link>
      </div>
    </header>
  );
}

// PropTypes validation
Header.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};
