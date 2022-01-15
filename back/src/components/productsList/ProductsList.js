import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import readProducts from "../apiCalls/readProducts";

import axios from "axios";

import { Container, Button } from "@mui/material";

import {
  FormGroup,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Input,
  IconButton,
  Grid,
  Paper,
  Typography,
  Modal
} from "@mui/material";

function ProductsList() {
  const [products, setProducts] = useState([]);

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await readProducts());
    };

    getProducts();
  }, []);

  return (
    <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
      <Typography variant="h1">{selectedMenuItem}</Typography>
      <Box
        sx={{
          marginTop: "20px"
        }}
      >
        <p>Nom, Prix, Dernière édition</p>
        {products.map((product) => (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#1E2530",
              marginTop: "10px",
              padding: "7px 30px",
              "&:hover": {
                backgroundColor: "#323943"
              }
            }}
          >
            <Grid container spacing={2} sx={{ margin: "auto" }}>
              <Grid xs={2} sx={{ margin: "auto", textAlign: "center" }}>
                <p>{product.name}</p>
              </Grid>
              <Grid xs={2} sx={{ margin: "auto", textAlign: "center" }}>
                <p>{product.price}</p>
              </Grid>
              <Grid xs={2} sx={{ margin: "auto", textAlign: "center" }}>
                <p>{new Date(product.editedAt).toLocaleDateString()}</p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default ProductsList;
