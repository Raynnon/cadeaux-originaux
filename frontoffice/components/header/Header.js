/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { MenuIcon, ChevronRightIcon } from '@heroicons/react/solid';

import logo from '../../public/logos/logo-cadeaux-originaux-small.png';

export default function Header({ categories }) {
  return (
    <header className="sticky top-0 z-50 bg-white items-center text-center h-14 px-2 md:px-10 flex">
      <div className="lg:hidden">
        <MenuIcon className="h-10 w-10 hover:cursor-pointer " />

        <div
          className="absolute left-0 top-14 w-3/5 bg-white min-h-screen text-left shadow"
          style={{}}
        >
          <ul>
            <li className="px-4 py-2 bg-coolGray-100 text-orange-400 border-b-2 border-coolGray-200">
              <Link
                href={{
                  pathname: '/category/Nouveau'
                }}
              >
                <a className="font-semibold">NOUVEAU</a>
              </Link>
            </li>
            <li className="px-4 py-2 bg-coolGray-100 text-orange-400 border-b-2 border-coolGray-200">
              <Link
                href={{
                  pathname: '/category/Meilleurs-cadeaux'
                }}
              >
                <a className="font-semibold">MEILLEURES VENTES</a>
              </Link>
            </li>
            {Object.keys(categories).map((categoryItem, index) => {
              return (
                <>
                  <li
                    key={index}
                    className="px-4 py-2 border-b-2 border-coolGray-100 flex justify-between"
                  >
                    <p className="font-semibold">
                      {categoryItem.toUpperCase()}
                    </p>
                    <ChevronRightIcon className="h-5 w-5" />
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>

      <Link href="/">
        <a className="flex justify-center flex-1">
          <Image src={logo} height={50} width={179} />
        </a>
      </Link>
    </header>
  );
}
