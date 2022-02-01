import React from "react";

import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`}>
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
  );
}
