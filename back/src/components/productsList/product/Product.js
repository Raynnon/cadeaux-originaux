import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

import { TextField, Box, Grid, Paper, Typography } from "@mui/material";

export default function Product() {
  const { product } = useParams();

  return (
    <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
      <Typography variant="h1">PRODUITS</Typography>
    </Container>
  );
}
