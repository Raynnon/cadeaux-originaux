import Header from "../header/Header";
import Footer from "../footer/Footer";

import { Form } from "react-bootstrap";

function Category() {
  return (
    <main>
      <Header />
      <h1 className="text-center">Cadeaux pour papa</h1>
      <p className="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        ullamcorper pharetra sagittis. Curabitur a sem eget dui iaculis feugiat
        vel in sem. Integer vulputate, elit at mollis feugiat, ante sapien
        posuere ligula, ac pretium odio dui vitae mauris. Vestibulum maximus
        tincidunt mi, non porttitor magna condimentum eu. Suspendisse a
        venenatis lacus, eget finibus eros. Suspendisse vehicula est diam, vel
        imperdiet odio iaculis vitae. Donec lectus quam, volutpat ut lobortis
        quis, dapibus quis orci. Curabitur eu felis et massa consequat feugiat.
        In quis odio dui. Donec in eros lacus. Fusce mollis aliquam ante, at
        ultrices quam dignissim vel. Integer ac aliquam purus. Vivamus accumsan
        tellus nisl, vel fringilla est sodales in. Vestibulum vestibulum sapien
        ligula, ultricies vulputate nisl euismod in. Donec dolor mi, tincidunt
        ut neque in, scelerisque faucibus ligula.{" "}
      </p>
      <Footer />
      <div className="bg-light">
        <Form>
          <select class="custom-select">
            <option selected>-- Trier par</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="custom-select">
            <option selected>-- Produit par page</option>
            <option value="1">12</option>
            <option value="2">20</option>
            <option value="3">32</option>
          </select>
          <p>
            &lt; <span className="bg-white px-2 border border-muted">1</span>{" "}
            ... <span>12</span> &gt;
          </p>
        </Form>
      </div>
    </main>
  );
}

export default Category;
