import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './header/Header';
import SubHeader from './header/SubHeader';
import Footer from './Footer';
import { priceRanges } from '../data/prices';

/**
 * Layout Component
 * Wraps all pages with header, subheader, and footer
 * Fetches and provides categories data to child components
 */
export default function Layout({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // Fetch categories from API
        const categoriesReq = await axios(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/?ordered=true`
        );

        setCategories(categoriesReq.data);
      } catch (e) {
        console.error('Error fetching categories:', e);
      }
    })();
  }, []);

  return (
    <>
      <Header categories={categories} />
      <SubHeader categories={categories} />
      <main>{children}</main>
      <Footer categories={categories} prices={priceRanges} />
    </>
  );
}
