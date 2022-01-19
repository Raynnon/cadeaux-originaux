import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import readProducts from "../apiCalls/readProducts";

import { Container } from "@mui/material";

import { TextField, Box, Grid, Paper, Typography } from "@mui/material";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [apiReqOptions, setApiReqOptions] = useState({
    name: "",
    sortBy: "Nouveau"
  });

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await readProducts(apiReqOptions));
    };

    getProducts();
  }, [apiReqOptions]);

  return (
    <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
      <Typography variant="h1">{selectedMenuItem}</Typography>
      <Box
        sx={{
          marginTop: "20px",
          padding: "0 10px"
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ margin: "auto", textAlign: "center" }}
        >
          <Grid xs={5}>
            <p>Nom</p>
          </Grid>
          <Grid xs={2}>
            <p>Prix</p>
          </Grid>
          <Grid xs={2}>
            <p>Dernière édition</p>
          </Grid>
          <Grid xs={3}>
            <TextField
              label="Recherche"
              sx={{ width: "300px" }}
              onChange={(e) =>
                setApiReqOptions({ ...apiReqOptions, name: e.target.value })
              }
            />
          </Grid>
        </Grid>

        {products.map((product, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              backgroundColor: "#1E2530",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "#323943"
              }
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ margin: "auto", textAlign: "center" }}
            >
              <Grid xs={5}>
                <p>{product.name}</p>
              </Grid>
              <Grid xs={2}>
                <p>{product.price}</p>
              </Grid>
              <Grid xs={2}>
                <p>{new Date(product.editedAt).toLocaleDateString()}</p>
              </Grid>
              <Grid xs={3}></Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default ProductsList;
