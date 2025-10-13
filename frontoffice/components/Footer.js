/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import PropTypes from "prop-types";
import { CATEGORY_NAMES } from "../constants";

/**
 * Footer Component
 * Displays site footer with category links and copyright information
 * @param {Object} categories - Categories data from API
 * @param {Array} prices - Price range options (currently unused)
 */
export default function Footer({ categories, prices }) {
  return (
    <footer className="pb-5 pt-5 bg-coolGray-600 text-coolGray-300 items-center xl:px-40 mt-10 footer-hover">
      <div className="text-center">
        <ul className="container mx-auto flex justify-between text-sm md:text-lg">
          <li>
            <ul className="flex flex-col font-semibold">
              {/* Featured Category Links */}
              <li>
                <Link href="/category/Nouveau">
                  {CATEGORY_NAMES.NEW.toUpperCase()}
                </Link>
              </li>
              <li>
                <Link href="/category/Meilleurs-cadeaux">
                  MEILLEURES VENTES
                </Link>
              </li>
            </ul>
          </li>
          {/* Dynamic Category Links */}
          {Object.keys(categories).map((category, index) => {
            return (
              <li key={index}>
                <ul>
                  <li className="font-semibold">{category.toUpperCase()}</li>
                  <ul>
                    {categories[category] &&
                      categories[category].map((list, idx) => (
                        <li key={idx}>
                          <Link href={`/category/${list.name.split(/[ ,]+/).join("-")}`}>
                            {list.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
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
  categories: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  prices: PropTypes.array
};
