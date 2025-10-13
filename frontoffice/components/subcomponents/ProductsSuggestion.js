/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import axios from 'axios';
import slugify from 'slugify';
import { SECTION_TITLES, SORT_OPTIONS, IMAGE_CONFIG } from '../../constants';

/**
 * ProductsSuggestion Component
 * Displays a grid of suggested products (new or best sellers)
 * @param {string} type - Type of products to display ('new' for new products, default for best sellers)
 */
export default function ProductsSuggestion({ type }) {
  const [title, setTitle] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let productsReq;

        // Fetch products based on type
        if (type === 'new') {
          setTitle(SECTION_TITLES.NEW_PRODUCTS);
          productsReq = await axios(
            `${process.env.NEXT_PUBLIC_API_URL}/products?images=true&sortBy=${SORT_OPTIONS.NEW}&currentPage=1&productsPerPage=6`
          );
        } else {
          setTitle(SECTION_TITLES.BEST_PRODUCTS);
          productsReq = await axios(
            `${process.env.NEXT_PUBLIC_API_URL}/products?images=true&currentPage=1&productsPerPage=6&sortBy=${SORT_OPTIONS.BEST_SELLERS}`
          );
        }

        setProducts(productsReq.data);
      } catch (e) {
        console.error('Error fetching product suggestions:', e);
      }
    })();
  }, [type]);

  return (
    <section className="my-12">
      <h2 className="text-center text-3xl font-medium mb-7">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <Link
            key={index}
            href={{
              pathname: `/produit/${slugify(product.name)}`,
              query: {
                productId: product._id
              }
            }}
          >
            <div className="flex flex-col shadow-md h-46 hover:bg-coolGray-100 cursor-pointer">
              {/* Product Image */}
              {product.images && (
                <Image
                  alt={product.name}
                  src={product.images[0]}
                  width={IMAGE_CONFIG.SIZES.SMALL}
                  height={IMAGE_CONFIG.SIZES.SMALL}
                  objectFit="cover"
                  className="z-1"
                />
              )}
              {/* Product Name */}
              <div className="flex items-center text-center font-small h-16 align-middle justify-center">
                <p>{product.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// PropTypes validation
ProductsSuggestion.propTypes = {
  type: PropTypes.string
};
