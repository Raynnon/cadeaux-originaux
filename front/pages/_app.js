import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Index from "./index.js";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
