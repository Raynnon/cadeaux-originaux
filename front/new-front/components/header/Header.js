import Image from "next/image";
import Link from "next/Link";

export default function Header() {
  const menuItems = ["Nouveau", "Meilleures ventes", "Pour qui?", "Événement"];
  const nature = ["Femme", "Homme", "Fille", "Garçon", "Bébé"];
  const type = [
    "Maman",
    "Papa",
    "Soeur",
    "Frère",
    "Petite copine",
    "Petit copain",
    "Collègue de travail",
    "Peu importe",
  ];

  const occasion = [
    "Anniversaire",
    "Romantique",
    "Mariage",
    "Remerciements",
    "Se faire pardonner",
    "Départ en retraite",
    "Crémaillère",
    "Cadeau rigolo",
  ];

  const party = [
    "Noël",
    "Fête des pères",
    "Fète des mères",
    "Fète des grands-mères",
    "Saint Valentin",
    "Pâques",
    "Halloween",
    "Peu importe",
  ];

  return (
    <header className="items-center shadow-md xl:px-40 xl:flex text-center">
      <Link href="/">
        <a href="/">
          <Image
            src="/logos/logo-cadeaux-originaux-small.png"
            alt="logo-cadeaux-originaux"
            width="195"
            height="51.6"
          />
        </a>
      </Link>
      <nav className="flex justify-center">
        <ul className="flex">
          {menuItems.map((item, index) => {
            return (
              <li
                key={index}
                className="mx-5 py-5 text-sm border-b-4 border-transparent hover:border-orange-500  md:text-lg dropdown group"
              >
                <Link href="/">
                  <a className="dropdown" href="/">
                    {item}
                  </a>
                </Link>
                <ul className="flex flex-col absolute border border-coolGray-100 bg-white rounded-xl hidden dropdown-menu group-hover:flex">
                  <a className="px-5 py-1 hover:bg-orange-300" href="/">
                    Salut je suis la
                  </a>
                  <a className="px-5 py-1 hover:bg-orange-300" href="/">
                    2
                  </a>
                  <a className="px-5 py-1 hover:bg-orange-300" href="/">
                    3
                  </a>
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
