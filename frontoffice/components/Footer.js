/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * Footer Component
 * Displays site footer with main category links and copyright information
 * @param {Object} categories - Categories data from API
 * @param {Array} prices - Price range options (currently unused)
 */
export default function Footer({ categories }) {
  // Main categories to display in footer
  const mainCategories = ['Genre', 'Type', 'Occasion', 'Fête', 'High-Tech'];

  return (
    <footer className="pb-5 pt-5 bg-primary-400 text-white items-center xl:px-40 mt-10 footer-hover">
      <div className="text-center">
        <ul className="container mx-auto flex justify-around text-sm md:text-lg">
          {/* Nouveau */}
          <li>
            <ul className="flex flex-col font-semibold">
              <li>
                <Link href="/category/Nouveau">NOUVEAU</Link>
              </li>
            </ul>
          </li>

          {/* Populaire (Meilleurs cadeaux) */}
          <li>
            <ul className="flex flex-col font-semibold">
              <li>
                <Link href="/category/Meilleurs-cadeaux">POPULAIRE</Link>
              </li>
            </ul>
          </li>

          {/* Main Category Links */}
          {mainCategories.map((categoryName, index) => {
            const categoryData = categories[categoryName];
            if (!categoryData || categoryData.length === 0) return null;

            return (
              <li key={index}>
                <ul className="flex flex-col font-semibold">
                  <li>
                    <Link
                      href={`/category/${categoryName
                        .split(/[ ,]+/)
                        .join('-')}`}
                    >
                      {categoryName.toUpperCase()}
                    </Link>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Copyright */}
      <p className="text-center mt-5 md:text-lg">
        Mes cadeaux originaux - {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// PropTypes validation
Footer.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  prices: PropTypes.array
};
