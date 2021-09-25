import Header from "./header/Header";
import Footer from "./footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

import axios from "axios";

export default function Layout({ children, pageTitle }) {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(async () => {
    const categoriesReq = await axios("http://localhost:4000/categories");
    const categoriesData = categoriesReq.data[0][0];

    const prices = [
      { shortName: "€", name: "Pas cher" },
      { shortName: "€€", name: "Bon rapport qualité prix" },
      { shortName: "€€€", name: "Haut de gamme" }
    ];

    setCategories(categoriesData);
    setPrices(prices);
    console.log(categories);
  }, []);

  return (
    <div className="text-coolGray-900">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer categoriest={categories} prices={prices} />
    </div>
  );
}
