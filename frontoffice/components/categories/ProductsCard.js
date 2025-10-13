import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';

export default function ProductsCard({
  cardNumber,
  productId,
  productName,
  productPrice,
  productImages
}) {
  return (
    <Link
      href={{
        pathname: `/produit/${slugify(productName)}`,
        query: {
          productId: productId
        }
      }}
    >
      <div className="flex flex-col border-2 border-coolGray-100 hover:bg-coolGray-100 p-2 mx-1 mb-5 group cursor-pointer">
        {productImages && (
          <div>
            <Image
              src={productImages[0]}
              width={225}
              height={225}
              layout="responsive"
              priority={cardNumber <= 12}
              alt={productName}
            />
          </div>
        )}
        <div className="flex items-center text-center text-lg font-semibold align-middle justify-center h-20">
          <h2>{productName}</h2>
        </div>

        <div className="flex justify-around items-center">
          <div>
            <p className="font-semibold">Prix</p>
            <p className="text-center">{productPrice}</p>
          </div>
          <button className="border border-coolGray-300 group-hover:bg-orange-400 group-hover:border-transparent group-hover:text-white p-1 h-9">
            En savoir plus
          </button>
        </div>
      </div>
    </Link>
  );
}
