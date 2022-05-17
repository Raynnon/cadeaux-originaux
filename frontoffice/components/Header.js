/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import logo from '../public/logos/logo-cadeaux-originaux-small.png';
import logoWhite from '../public/logos/logo-cadeaux-originaux-blanc.png';

export default function Header({ categories }) {
  console.log(categories);

  return (
    <>
      <header className="items-center text-center mt-1">
        <Link href="/">
          <a>
            <Image src={logo} height={50} width={179} />
          </a>
        </Link>
      </header>

      <div className="sticky top-0 bg-orange-400 py-3 z-50 px-32 flex">
        <Image src={logoWhite} height={50} width={179} className="flex-1" />
        <nav className="flex justify-center flex-1 pr-52">
          <ul className="flex flex-row justify-between align-center items-center">
            {Object.keys(categories).map((category, index) => {
              return (
                <li className="px-8 text-white hover:underline hover:underline-offset-2 font-semibold">
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
