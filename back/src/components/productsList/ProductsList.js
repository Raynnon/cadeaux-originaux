import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";

import readProducts from "../apiCalls/readProducts";

import { TextField, Box, Grid, Paper, Typography } from "@mui/material";

import "./productList.css";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [apiReqOptions, setApiReqOptions] = useState({
    name: "",
    sortBy: "Nouveau",
    images: "true"
  });

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await readProducts(apiReqOptions));
    };

    getProducts();
  }, [apiReqOptions]);

  return (
    <>
      <Typography variant="h1">{selectedMenuItem}</Typography>
      <Box
        sx={{
          marginTop: "20px"
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

        {products.map((product, index) => (
          <Link key={index} to={`/admin/products/${product._id}`}>
            <Paper
              className="grid-item"
              elevation={3}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                padding: { sm: "5px 0" },
                backgroundColor: "#1E2530",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "#323943"
                }
              }}
            >
              <Grid
                className="grid-item"
                item={true}
                xs={0}
                md={2}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name.split(" ").join("-").toLowerCase()}
                  style={{
                    width: "75px",
                    height: "75px",
                    objectFit: "cover",
                    borderRadius: 4
                  }}
                />
              </Grid>
              <Grid item={true} xs={7} md={6}>
                <p>{product.name}</p>
              </Grid>
              <Grid item={true} xs={2} md={2}>
                <p>{product.price}</p>
              </Grid>
              <Grid item={true} xs={3} md={2}>
                <p>{new Date(product.editedAt).toLocaleDateString()}</p>
              </Grid>
            </Paper>
          </Link>
        ))}
      </Box>
      <Outlet />
    </>
  );
}

export default ProductsList;
