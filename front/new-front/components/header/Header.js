import Image from "next/image";
import Link from "next/Link";

export default function Header() {
  const menuItems = ["Nouveau", "Meilleures ventes", "Pour qui?", "Événement"];

  return (
    <header className="flex items-center shadow-md">
      <Link href="/">
        <Image
          src="/logos/logo-cadeaux-originaux-small.png"
          alt="logo-cadeaux-originaux"
          width="195"
          height="51.6"
        />
      </Link>
      <nav>
        <ul className="flex">
          {menuItems.map((item) => {
            return (
              <li className="mx-5 py-5 text-xl border-b-4 border-transparent border-orange-500">
                <Link href="/">{item}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
