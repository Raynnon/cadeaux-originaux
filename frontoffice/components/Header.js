/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import logo from '../public/logos/logo-cadeaux-originaux-small.png';
import logoWhite from '../public/logos/logo-cadeaux-originaux-blanc.png';

export default function Header({ categories }) {
  const [subHeaderLogoActive, setSubHeaderLogoActive] = useState(true);

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (window.scrollY > 56) {
        setSubHeaderLogoActive(true);
      } else {
        setSubHeaderLogoActive(false);
      }
    };
  }

  console.log(subHeaderLogoActive);

  return (
    <>
      <header className="items-center text-center h-14 flex justify-center">
        <Link href="/">
          <a className="flex items-center">
            <Image src={logo} height={50} width={179} />
          </a>
        </Link>
      </header>

      <div className="hidden sticky top-0 bg-orange-400 py-1 z-50 px-16 lg:flex drop-shadow">
        <Link href="/">
          <a
            className={`hidden ${
              subHeaderLogoActive ? 'lg:hidden' : 'lg:block'
            }`}
          >
            <Image src={logoWhite} height={50} width={179} />
          </a>
        </Link>

        <nav className="flex justify-center flex-1 pr-52">
          <ul className="flex flex-row justify-between align-center items-center">
            {Object.keys(categories).map((category, index) => {
              return (
                <li className="mx-8 text-white font-semibold hover:underline hover:underline-offset-2 hover:cursor-pointer">
                  {category.toUpperCase()}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
