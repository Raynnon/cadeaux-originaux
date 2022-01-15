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

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await readProducts());
    };

    getProducts();
  }, []);

  return (
    <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
      {products.map((product) => (
        <p>{product.name}</p>
      ))}
    </Container>
  );
}

export default ProductsList;
