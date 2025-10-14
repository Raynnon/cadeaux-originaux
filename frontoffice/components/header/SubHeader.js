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
        className={`hidden self-center pt-1 ${
          subHeaderLogoActive ? 'lg:inline' : ''
        }`}
      >
        <Image src={logoWhite} height={35} width={125} alt="Logo" />
      </Link>

      {/* Navigation Menu */}
      <nav
        className={`flex justify-center flex-1 ${
          !subHeaderLogoActive ? 'pr-52' : 'pr-0'
        }`}
      >
        <ul className="h-full flex flex-row justify-center align-center items-center gap-3">
          {/* New Products Link */}
          <li className="h-full px-4 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
            <Link
              href="/category/Nouveau"
              className="h-full flex items-center text-sm"
            >
              {LABELS.NEW}
            </Link>
          </li>
          {/* Popular Products Link */}
          <li className="h-full px-4 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
            <Link
              href="/category/Meilleurs-cadeaux"
              className="h-full flex items-center text-sm"
            >
              {LABELS.POPULAR}
            </Link>
          </li>
          {/* Dynamic Categories with Dropdown - Compact version */}
          {Object.keys(categories).slice(0, 5).map((category, index) => {
            return (
              <li
                className="h-full px-4 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer group"
                key={index}
              >
                <p className="h-full flex items-center text-sm whitespace-nowrap">
                  {category.toUpperCase()}
                </p>

                {/* Dropdown Submenu */}
                <div className="group">
                  <ul className="hidden absolute top-11 bg-white font-normal px-5 pt-2 pb-2 group-hover:block shadow-lg rounded-b-md min-w-[200px]">
                    {categories[category].map((subcategory, index) => {
                      return (
                        <li
                          className="py-2 my-1 border-b border-coolGray-200 last:border-0 last:my-0 text-coolGray-800"
                          key={index}
                        >
                          <Link
                            href={`/category/${subcategory.name.split(/[ ,]+/).join('-')}`}
                            className="hover:text-orange-400 text-sm"
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
          {/* "Plus" dropdown for remaining categories */}
          {Object.keys(categories).length > 5 && (
            <li className="h-full px-4 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer group relative">
              <p className="h-full flex items-center text-sm">PLUS</p>

              <div className="group">
                <ul className="hidden absolute top-11 left-0 bg-white font-normal px-5 pt-2 pb-2 group-hover:block shadow-lg rounded-b-md min-w-[250px] max-h-[500px] overflow-y-auto">
                  {Object.keys(categories).slice(5).map((category, index) => {
                    return (
                      <li
                        className="py-2 my-1 border-b border-coolGray-200 last:border-0 last:my-0 text-coolGray-800"
                        key={index}
                      >
                        <p className="font-semibold text-orange-400 mb-1 text-sm">{category}</p>
                        <ul className="pl-2">
                          {categories[category].map((subcategory, subIndex) => {
                            return (
                              <li key={subIndex} className="py-1">
                                <Link
                                  href={`/category/${subcategory.name.split(/[ ,]+/).join('-')}`}
                                  className="hover:text-orange-400 text-sm block"
                                >
                                  {subcategory.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

// PropTypes validation
SubHeader.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};
