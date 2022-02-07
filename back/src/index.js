import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import ProductsList from "./components/productsList/ProductsList";
import EditProduct from "./components/editProduct/EditProduct";
import NotFound from "./components/notFound/NotFound";

import { store } from "./app/state/store";
import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import MIUITheme from "./app/styles/MIUITheme";
import { ThemeProvider } from "@mui/material/styles";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={MIUITheme()}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="products" element={<ProductsList />} />
              <Route
                path="products/:productId"
                element={<EditProduct key={"edit-product"} />}
              />
              <Route
                path="add-product"
                element={<EditProduct key={"add-product"} />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
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
