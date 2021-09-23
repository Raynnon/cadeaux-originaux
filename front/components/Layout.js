import Header from "./header/Header";
import Footer from "./footer/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

import axios from "axios";

export default function Layout({ children, pageTitle }) {
  const [categories, setCategories] = useState({});

  useEffect(async () => {
    const categoriesReq = await axios("http://localhost:4000/categories");
    const categoriesData = categoriesReq.data;

    //Organise Categories
    const menuItems = [];
    const topCategories = [];
    const subCategories = [];
    const prices = ["€", "€€", "€€€", "Peu importe"];

    categoriesData.forEach((category) => {
      if (!category.parent.length) {
        menuItems.push(category);
      } else if (category.parent[0] === "Genre") {
        topCategories.push(category);
      } else {
        subCategories.push(category);
      }
    });

    setCategories({ menuItems, topCategories, subCategories, prices });
  }, []);

  return (
    <div className="text-coolGray-900">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header categories={categories} />
      <main>{children}</main>
      {/* <Footer categories={categories} /> */}
    </div>
  );
}
