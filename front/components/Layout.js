import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useState, useEffect } from "react";

import axios from "axios";

export default function Layout({ children, pageTitle, description }) {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(async () => {
    try {
      const categoriesReq = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/?ordered=true`
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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `
          }}
        />
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <Header categories={categories} />
      <body>{children}</body>
      <Footer categories={categories} prices={prices} />
    </div>
  );
}
