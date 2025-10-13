import '@fontsource/poppins';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
