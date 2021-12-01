import { useState, useEffect } from "react";

import axios from "axios";

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
  Checkbox
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Category {
  _id: string;
  parent: string[];
  name: string;
  imagesFolder: string;
  __v: number;
}

function AddProduct() {
  const [genres, setGenres] = useState<Category[]>([]);
  const [types, setTypes] = useState<Category[]>([]);
  const [occasions, setOccasions] = useState<Category[]>([]);
  const [parties, setParties] = useState<Category[]>([]);
  const prices: string[] = ["€", "€€", "€€€"];

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await axios.get(
        "http://localhost:4000/categories/?ordered=true"
      );

      console.log("data", categoriesData);

      setGenres(categoriesData.data.Genre);
      setTypes(categoriesData.data.Type);
      setParties(categoriesData.data.Occasion);
      setOccasions(categoriesData.data.Fête);
    };

    fetchCategories();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "10px"
      }}
    >
      <Grid item xs={6}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFF",
            borderRadius: 5,
            padding: "30px 50px"
          }}
        >
          {/* PRODUCT NAME */}
          <Typography variant="h2">Détails du produit</Typography>
          <FormGroup>
            <TextField
              required
              id="name"
              label="Nom du produit"
              color="info"
              sx={{ width: "230px", marginTop: "30px" }}
              variant="standard"
            />

            {/* PRICE */}
            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Prix</FormLabel>

              <RadioGroup row aria-label="price" name="row-radio-buttons-group">
                {prices.map((price, index) => {
                  return (
                    <Box key={index}>
                      <FormControlLabel
                        value={price}
                        control={<Radio color="info" />}
                        label={price}
                      />
                    </Box>
                  );
                })}
              </RadioGroup>
            </Box>

            {/* DESCRIPTION*/}
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              color="info"
              sx={{ marginTop: "30px", width: "520px" }}
            />

            {/* POINTS FORTS */}
            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Points forts</FormLabel>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Box>
                  <TextField
                    required
                    id="name"
                    color="info"
                    sx={{ width: "360px" }}
                    variant="standard"
                  />
                  <IconButton aria-label="delete" size="large" color="info">
                    <AddCircleIcon />
                  </IconButton>
                </Box>

                <Box>
                  <TextField
                    required
                    id="name"
                    color="info"
                    sx={{ width: "360px" }}
                    variant="standard"
                  />
                  <IconButton aria-label="delete" size="large" color="info">
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* UPLOAD IMAGES */}
            <Box
              sx={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <label htmlFor="contained-button-file">
                <Input id="image1" type="file" color="info" />
              </label>
              <label htmlFor="contained-button-file">
                <Input id="image2" type="file" color="info" />
              </label>
            </Box>

            {/* URL */}
            <TextField
              required
              id="url"
              label="URL du produit"
              color="info"
              sx={{ marginTop: "30px", width: "460px" }}
              variant="standard"
            />
          </FormGroup>
        </Paper>
      </Grid>

      {/* CATEGORIES*/}
      <Grid item xs={6}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFF",
            borderRadius: 5,
            padding: "30px 50px"
          }}
        >
          <Typography variant="h2">Categories</Typography>
          <Box>
            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Genres</FormLabel>
              <RadioGroup row aria-label="genre" name="row-radio-buttons-group">
                {genres
                  ? genres.map((genre, index) => {
                      return (
                        <Box key={index}>
                          <FormControlLabel
                            value={genre.name}
                            control={<Checkbox color="info" />}
                            label={genre.name}
                          />
                        </Box>
                      );
                    })
                  : null}
              </RadioGroup>
            </Box>

            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Types</FormLabel>
              <RadioGroup row aria-label="type" name="row-radio-buttons-group">
                {types
                  ? types.map((type, index) => {
                      return (
                        <Box key={index}>
                          <FormControlLabel
                            value={type.name}
                            control={<Checkbox color="info" />}
                            label={type.name}
                          />
                        </Box>
                      );
                    })
                  : null}
              </RadioGroup>
            </Box>

            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Occasions</FormLabel>
              <RadioGroup
                row
                aria-label="occasions"
                name="row-radio-buttons-group"
              >
                {occasions
                  ? occasions.map((occasion, index) => {
                      return (
                        <Box key={index}>
                          <FormControlLabel
                            value={occasion.name}
                            control={<Checkbox color="info" />}
                            label={occasion.name}
                          />
                        </Box>
                      );
                    })
                  : null}
              </RadioGroup>
            </Box>

            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Fêtes</FormLabel>
              <RadioGroup
                row
                aria-label="parties"
                name="row-radio-buttons-group"
              >
                {parties
                  ? parties.map((party, index) => {
                      return (
                        <Box key={index}>
                          <FormControlLabel
                            value={party.name}
                            control={<Checkbox color="info" />}
                            label={party.name}
                          />
                        </Box>
                      );
                    })
                  : null}
              </RadioGroup>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
