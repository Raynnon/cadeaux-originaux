import Header from "./header/Header";
import Footer from "./footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

import axios from "axios";

export default function Layout({ children, pageTitle }) {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(async () => {
    const categoriesReq = await axios("http://localhost:4000/categories");
    const categories = categoriesReq.data;

    console.log(categories);

    setPrices(["€", "€€", "€€€", "Peu importe"]);

    const getMenuItems = categories.filter((item) => {
      return !item.parent.length;
    });

    console.log("test", getMenuItems);
    setMenuItems([...categories]);
  }, []);

  return (
    <div className="text-coolGray-900">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header menuItems={menuItems} />
      <main>{children}</main>
      <Footer menuItems={menuItems} prices={prices} />
    </div>
  );
}
