import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import AddProduct from "./components/addProduct/AddProduct";
import ProductsList from "./components/productsList/ProductsList";

import { store } from "./app/state/store";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import MIUITheme from "./app/styles/MIUITheme";
import { ThemeProvider } from "@mui/material/styles";

import * as serviceWorker from "./serviceWorker";
import Product from "./components/productsList/product/Product";
import Admin from "./components/Admin";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={MIUITheme()}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="products" element={<ProductsList />} />
              <Route path="products/:productId" element={<Product />} />
              <Route path="add-product" element={<AddProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
