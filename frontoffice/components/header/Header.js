/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/logos/logo-cadeaux-originaux-small.png';

export default function Header({ categories }) {
  return (
    <header className="items-center text-center h-14 flex justify-center">
      <Link href="/">
        <a className="flex items-center">
          <Image src={logo} height={50} width={179} />
        </a>
      </Link>
    </header>
  );
}
