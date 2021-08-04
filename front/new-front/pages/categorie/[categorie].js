import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Home({ categoryName }) {
  const genres = ["Femme", "Homme", "Fille", "Garçon", "Bébé", "Tous"];
  const types = [
    "Maman",
    "Papa",
    "Soeur",
    "Frère",
    "Petite copine",
    "Petit copain",
    "Collègue de travail",
    "Peu importe",
  ];
  const occasions = [
    "Anniversaire",
    "Romantique",
    "Mariage",
    "Remerciements",
    "Se faire pardonner",
    "Départ en retraite",
    "Crémaillère",
    "Cadeau rigolo",
  ];
  const parties = [
    "Noël",
    "Fête des pères",
    "Fête des mères",
    "Fête des grands-mères",
    "Saint Valentin",
    "Pâques",
    "Halloween",
    "Peu importe",
  ];

  const prices = ["€", "€€€", "€€€", "Tous les prix"];

  const products = [
    { name: "Shoes", imageSRC: "https://picsum.photos/100/100", price: "€" },
    { name: "Glasses", imageSRC: "https://picsum.photos/150/150", price: "€€" },
    { name: "Coat", imageSRC: "https://picsum.photos/200/200", price: "€€€" },
    { name: "Watch", imageSRC: "https://picsum.photos/250/250", price: "€" },
    { name: "Keyboard", imageSRC: "https://picsum.photos/300/300", price: "€" },
    { name: "Scooter", imageSRC: "https://picsum.photos/350/350", price: "€€" },
    { name: "Shoes", imageSRC: "https://picsum.photos/100/100", price: "€" },
    { name: "Glasses", imageSRC: "https://picsum.photos/150/150", price: "€€" },
    { name: "Shoes", imageSRC: "https://picsum.photos/100/100", price: "€" },
    { name: "Glasses", imageSRC: "https://picsum.photos/150/150", price: "€€" },
    { name: "Coat", imageSRC: "https://picsum.photos/200/200", price: "€€€" },
    { name: "Watch", imageSRC: "https://picsum.photos/250/250", price: "€" },
    { name: "Keyboard", imageSRC: "https://picsum.photos/300/300", price: "€" },
    { name: "Scooter", imageSRC: "https://picsum.photos/350/350", price: "€€" },
    { name: "Shoes", imageSRC: "https://picsum.photos/100/100", price: "€" },
    { name: "Glasses", imageSRC: "https://picsum.photos/150/150", price: "€€" },
  ];

  return (
    <Layout pageTitle={`Cadeau pour ${categoryName} - Mes cadeaux originaux`}>
      <div className="flex -mb-10">
        {/* FILTER */}
        <aside className="hidden md:block w-96 mb-5">
          <div className="lg:px-32">
            <h3 className="py-5 text-2xl font-semibold">Filtres</h3>
          </div>
          <form className="lg:pr-5 lg:pl-32 border-2 border-transparent border-t-coolGray-100 pt-4">
            <h4>Genre</h4>
            <ul>
              {genres.map((genre, index) => {
                return (
                  <li key={index} className="flex-grow text-left pr-2">
                    <label className="inline-flex items-center">
                      <input type="radio" name="genre" value={genre} />
                      <span className="ml-2">{genre}</span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <h4>Type</h4>
            <ul>
              {types.map((type, index) => {
                return (
                  <li key={index} className="flex-grow text-left pr-2">
                    <label className="inline-flex items-center">
                      <input type="radio" name="Type" value={type} />
                      <span className="ml-2">{type}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <h4>Prix</h4>
            <ul>
              {prices.map((price, index) => {
                return (
                  <li key={index} className="flex-grow text-left pr-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="prix" value={price} />
                      <span className="ml-2">{price}</span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <label for="occasion">
              <h4>Occasion</h4>
            </label>
            <select
              id="occasion"
              class="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            >
              {occasions.map((occasion, index) => {
                return <option key={index}>{occasion}</option>;
              })}
            </select>

            <label for="occasion">
              <h4>Fête</h4>
            </label>
            <select
              id="fetes"
              class="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            >
              {parties.map((party, index) => {
                return <option key={index}>{party}</option>;
              })}
            </select>
          </form>
        </aside>
        <main className="xl:px-20 border-2 border-transparent border-l-coolGray-100">
          <h1 className="mx-1 xl:mx-0 mt-10 text-4xl font-semibold">{`Cadeau pour ${categoryName}`}</h1>
          <p className="mx-1 xl:mx-0 my-5 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            in fringilla libero, eget gravida sem. Integer viverra a nulla nec
            ultrices. Donec volutpat ligula et sagittis iaculis. Pellentesque
            vitae elit consequat, hendrerit risus eu, congue sapien. Sed
            pharetra vitae diam ut feugiat. In euismod velit at mi facilisis, in
            commodo velit vestibulum. Duis feugiat enim in luctus dapibus. Morbi
            sit amet mi non ante bibendum consequat nec id felis. Curabitur at
            placerat tellus, ut auctor sem. Nullam nec purus turpis. Sed
            elementum risus sem, nec egestas erat pellentesque vitae.
          </p>
          {/*PRODUCTS */}
          <div className="flex flex-wrap justify-between mb-10">
            {products.map((product, index) => {
              return (
                <Link key={index} href="/">
                  <a href="/" className="xl:w-1/4">
                    <div className="flex flex-col border-2 border-coolGray-100 hover:bg-coolGray-100 rounded-lg p-5 mx-1 mt-5 group">
                      <Image
                        src={product.imageSRC}
                        width={225}
                        height={225}
                        layout="responsive"
                        className="rounded-lg"
                      />
                      <h2 className="text-xl font-semibold text-center mt-3">
                        {product.name}
                      </h2>
                      <div className="flex justify-around items-center mt-3">
                        <div>
                          <p className="font-semibold">Prix</p>
                          <p className="text-center">{product.price}</p>
                        </div>
                        <button className="border border-coolGray-900 group-hover:bg-orange-500 group-hover:border-transparent group-hover:text-white rounded-lg p-1 h-9">
                          En savoir plus
                        </button>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
      <style global jsx>{`
        h4 {
          margin-top: 10px;
          font-weight: 600;
          font-size: 1.25rem;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    console.log(query);
    return { props: { categoryName: query.categoryName } };
  } catch (e) {
    console.error(e);
  }
}
