/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import logo from '../public/logos/logo-cadeaux-originaux-small.png';
import logoWhite from '../public/logos/logo-cadeaux-originaux-blanc.png';

export default function Header({ categories }) {
  const [subHeaderLogoActive, setSubHeaderLogoActive] = useState(false);

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (window.scrollY > 56) {
        setSubHeaderLogoActive(true);
      } else {
        setSubHeaderLogoActive(false);
      }
    };
  }

  return (
    <>
      <header className="items-center text-center h-14 flex justify-center">
        <Link href="/">
          <a className="flex items-center">
            <Image src={logo} height={50} width={179} />
          </a>
        </Link>
      </header>

      <div className="hidden sticky top-0 bg-orange-400 h-11 z-50 px-16 lg:flex drop-shadow">
        <Link href="/">
          <a
            className={`hidden ${
              subHeaderLogoActive ? 'lg:inline' : 'lg:hidden'
            }`}
          >
            <Image src={logoWhite} height={35} width={125} />
          </a>
        </Link>

        <nav
          className={`flex justify-center flex-1 pr-52 ${
            !subHeaderLogoActive ? 'px-32' : 'px-0'
          }`}
        >
          <ul className="h-full flex flex-row justify-between align-center items-center">
            <li className="h-full px-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
              <Link
                href={{
                  pathname: '/category/Nouveau'
                }}
              >
                <a className="h-full flex items-center">NOUVEAU</a>
              </Link>
            </li>
            <li className="h-full px-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
              <Link
                href={{
                  pathname: '/category/Meilleurs-cadeaux'
                }}
              >
                <a className="h-full flex items-center">MEILLEURES VENTES</a>
              </Link>
            </li>
            {Object.keys(categories).map((category, index) => {
              return (
                <>
                  <li
                    className="h-full px-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer group"
                    key={index}
                  >
                    <p className="h-full flex items-center">
                      {category.toUpperCase()}
                    </p>

                    <div className="group">
                      <ul className="hidden absolute top-11 bg-white font-normal px-5 pt-0 pb-1 group-hover:block">
                        {categories[category].map((subcategory, index) => {
                          return (
                            <li
                              style={{ color: '#1F2937' }}
                              className="py-1 my-1 border-b border-coolGray-200 last:border-0 last:my-0"
                              key={index}
                            >
                              <Link
                                href={{
                                  pathname: `/category/${subcategory.name
                                    .split(/[ ,]+/)
                                    .join('-')}`
                                }}
                              >
                                <a className="hover:text-orange-400">
                                  {subcategory.name}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
