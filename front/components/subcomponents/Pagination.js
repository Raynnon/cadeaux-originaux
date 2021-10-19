import { useState, useEffect } from "react";
import Image from "next/image";

export default function Pagination({
  numberOfProducts,
  currentPage,
  productsPerPage,
  updateCurrentPage,
}) {
  const [indexFirstProduct, setIndexFirstProduct] = useState(1);
  const [indexLastProduct, setIndexLastProduct] = useState(16);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    setIndexFirstProduct(productsPerPage * currentPage - 15);

    let netIndexLastProduct = productsPerPage * currentPage;

    if (netIndexLastProduct > numberOfProducts) {
      netIndexLastProduct = numberOfProducts;
    }

    setIndexLastProduct(netIndexLastProduct);

    setMaxPages(Math.ceil(numberOfProducts / 16));
  }, [numberOfProducts]);

  const pageChange = (e) => {
    updateCurrentPage(e.target.innerText);
  };

  const displayNumberOfPages = () => {
    const pageNumberArr = [...Array(/* maxPages */ 10).keys()];

    return pageNumberArr.map((page, index) => {
      let classToAdd = "";
      if (page + 1 === currentPage) {
        classToAdd = "z-10 bg-orange-300 border-orange-500";
      } else {
        classToAdd = "bg-white cursor-pointer";
      }

      return (
        <p
          key={index}
          aria-current="page"
          className={`${classToAdd} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          onClick={pageChange}
        >
          {page + 1}
        </p>
      );
    });
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <p className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </p>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Produits <span className="font-medium">{indexFirstProduct}</span> à{" "}
            <span className="font-medium">{indexLastProduct}</span> sur{" "}
            <span className="font-medium">{numberOfProducts}</span> resultats
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <Image
                alt="fleche-precedent"
                src="/icons/fleche-precedent.svg"
                width={15}
                height={15}
                objectFit="responsive"
                className="h-5 w-5"
                aria-hidden="true"
              />
            </a>
            {displayNumberOfPages()}
            <p className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <Image
                alt="fleche-suivant"
                src="/icons/fleche-suivant.svg"
                width={15}
                height={15}
                objectFit="responsive"
                className="h-5 w-5"
                aria-hidden="true"
              />
            </p>
          </nav>
        </div>
      </div>
    </div>
  );
}
