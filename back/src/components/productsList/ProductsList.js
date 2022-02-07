import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import readProducts from "../../routes/readProducts";

import { TextField, Box, Grid, Typography, Pagination } from "@mui/material";

import "./productList.css";
import ProductCard from "./productCard/ProductCard";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [apiReqOptions, setApiReqOptions] = useState({
    name: "",
    sortBy: "Nouveau",
    images: "true"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const productsPerPage = 10;

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);

  useEffect(() => {
    const getProducts = async (options, count) => {
      const fullOptions = count
        ? { ...options, count: "true" }
        : { ...options, currentPage, productsPerPage };

      if (count) {
        const numberOfProducts = await readProducts(fullOptions);
        setNumberOfPages(
          Math.floor(numberOfProducts.numberOfProducts / productsPerPage)
        );
      } else {
        setProducts(await readProducts(fullOptions));
      }
    };

    getProducts(apiReqOptions);
    getProducts(apiReqOptions, true);
  }, [apiReqOptions, productsPerPage, currentPage]);

  return (
    <>
      <Typography variant="h1">{selectedMenuItem}</Typography>
      <Box
        sx={{
          margin: "20px 0 10px 0"
        }}
      >
        <TextField
          label="Recherche"
          sx={{ width: "300px", float: "right" }}
          onChange={(e) =>
            setApiReqOptions({ ...apiReqOptions, name: e.target.value })
          }
        />

        <Grid
          className="grid-item"
          container
          sx={{
            margin: "auto",
            textAlign: "center"
          }}
        >
          <Grid
            item={true}
            xs={0}
            sm={2}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <p>Image</p>
          </Grid>
          <Grid item={true} xs={7} md={6}>
            <p>Nom</p>
          </Grid>
          <Grid item={true} xs={2} md={2}>
            <p>Prix</p>
          </Grid>
          <Grid item={true} xs={3} md={2}>
            <p>Dernière édition</p>
          </Grid>
        </Grid>

        {/* PRODUCTS */}
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Box>

      {/* PAGINATION */}
      {numberOfPages > 1 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={currentPage}
            count={numberOfPages}
            size="large"
            onChange={(e, value) => {
              setCurrentPage(value);
            }}
          />
        </Box>
      ) : null}
    </>
  );
}

export default ProductsList;
