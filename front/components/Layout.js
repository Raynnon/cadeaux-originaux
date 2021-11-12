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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});`
          }}
        ></script>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <Header categories={categories} />
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
      <Footer categories={categories} prices={prices} />
    </div>
  );
}
