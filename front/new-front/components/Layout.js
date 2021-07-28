import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children, pageTitle }) {
  return (
    <div>
      <head>
        <title>{pageTitle}</title>
      </head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
