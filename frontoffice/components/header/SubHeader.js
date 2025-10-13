import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import logoWhite from '../../public/logos/logo-cadeaux-originaux-blanc.png';
import { LABELS } from '../../constants';

/**
 * SubHeader Component
 * Sticky navigation bar that appears below the main header
 * Shows/hides logo based on scroll position
 * @param {Object} categories - Categories data from API
 */
export default function SubHeader({ categories }) {
  const [subHeaderLogoActive, setSubHeaderLogoActive] = useState(false);

  // Show/hide logo based on scroll position
  if (typeof window !== 'undefined' && window.innerWidth > 1023) {
    window.onscroll = () => {
      if (window.scrollY > 56) {
        setSubHeaderLogoActive(true);
      } else {
        setSubHeaderLogoActive(false);
      }
    };
  }

  return (
    <div className="hidden sticky top-0 bg-orange-400 h-11 z-50 px-16 lg:flex drop-shadow">
      {/* Logo - Shows on scroll */}
      <Link
        href="/"
        className={`hidden flex self-center pt-1 ${
          subHeaderLogoActive ? 'lg:inline' : ''
        }`}
      >
        <Image src={logoWhite} height={35} width={125} alt="Logo" />
      </Link>

      {/* Navigation Menu */}
      <nav
        className={`flex justify-center flex-1 pr-52 ${
          !subHeaderLogoActive ? 'px-32' : 'px-0'
        }`}
      >
        <ul className="h-full flex flex-row justify-between align-center items-center">
          {/* New Products Link */}
          <li className="h-full px-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
            <Link
              href="/category/Nouveau"
              className="h-full flex items-center"
            >
              {LABELS.NEW}
            </Link>
          </li>
          {/* Popular Products Link */}
          <li className="h-full px-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
            <Link
              href="/category/Meilleurs-cadeaux"
              className="h-full flex items-center"
            >
              {LABELS.POPULAR}
            </Link>
          </li>
          {/* Dynamic Categories with Dropdown */}
          {Object.keys(categories).map((category, index) => {
            return (
              <li
                className="h-full px-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer group"
                key={index}
              >
                <p className="h-full flex items-center">
                  {category.toUpperCase()}
                </p>

                {/* Dropdown Submenu */}
                <div className="group">
                  <ul className="hidden absolute top-11 bg-white font-normal px-5 pt-0 pb-1 group-hover:block">
                    {categories[category].map((subcategory, index) => {
                      return (
                        <li
                          className="py-1 my-1 border-b border-coolGray-200 last:border-0 last:my-0 text-coolGray-800"
                          key={index}
                        >
                          <Link
                            href={`/category/${subcategory.name.split(/[ ,]+/).join('-')}`}
                            className="hover:text-orange-400"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

// PropTypes validation
SubHeader.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};
