import { useState, useEffect } from "react";
import axios from "axios";

import CategoryCheckBox from "./CategoryCheckBox";

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
  Typography
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
  const [isMount, setIsMount] = useState(false);
  const [genres, setGenres] = useState<Category[]>([]);
  const [types, setTypes] = useState<Category[]>([]);
  const [occasions, setOccasions] = useState<Category[]>([]);
  const [parties, setParties] = useState<Category[]>([]);
  const prices: string[] = ["€", "€€", "€€€"];

  useEffect(() => {
    setIsMount(true);
    const fetchCategories = async () => {
      const categoriesData = await axios.get(
        "http://localhost:4000/categories/?ordered=true"
      );

      setGenres(categoriesData.data.Genre);
      setTypes(categoriesData.data.Type);
      setParties(categoriesData.data.Occasion);
      setOccasions(categoriesData.data.Fête);
    };

    if (isMount) {
      fetchCategories();
    }

    return () => {
      setIsMount(false);
    };
  }, [isMount]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "10px"
      }}
    >
      <Grid item xs={7}>
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
      <Grid item xs={5}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFF",
            borderRadius: 5,
            padding: "30px 50px"
          }}
        >
          <Typography variant="h2">Categories</Typography>

          <CategoryCheckBox cat={genres} name={"Genres"} />
          <CategoryCheckBox cat={types} name={"Types"} />
          <CategoryCheckBox cat={occasions} name={"Occasions"} />
          <CategoryCheckBox cat={parties} name={"Parties"} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
