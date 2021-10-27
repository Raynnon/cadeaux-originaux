import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

import axios from "axios";

export default function Layout({ children, pageTitle }) {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(async () => {
    try {
      const categoriesReq = await axios(
        "http://localhost:4000/categories/?ordered=true"
      );

      const categoriesData = categoriesReq.data;

      const prices = [
        { shortName: "€", name: "Pas cher" },
        { shortName: "€€", name: "Bon rapport qualité prix" },
        { shortName: "€€€", name: "Haut de gamme" }
      ];

      setCategories(categoriesData);
      setPrices(prices);
    } catch (e) {
      console.log("categoriesReq error", e);
    }
  }, []);

  return (
    <div className="text-coolGray-900">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer categories={categories} prices={prices} />
    </div>
  );
}
