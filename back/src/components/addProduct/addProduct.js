import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../app/slices/categoriesSlice";
import axios from "axios";

import CategoryCheckBox from "./CategoryCheckbox";

import { Button } from "@mui/material";

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

function AddProduct() {
  const [isMount, setIsMount] = useState(false);
  const [genres, setGenres] = useState([]);
  const [types, setTypes] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [parties, setParties] = useState([]);
  const prices = ["€", "€€", "€€€"];

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  useEffect(() => {
    setIsMount(true);
    const fetchCategories = async () => {
      const categoriesData = await axios.get(
        "http://localhost:4020/categories/?ordered=true"
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
        <Box
          sx={{
            padding: "30px 50px"
          }}
        >
          {/* PRODUCT NAME */}
          <Typography variant="h2">DÉTAILS DU PRODUIT</Typography>
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
        </Box>
      </Grid>

      {/* CATEGORIES*/}
      <Grid item xs={5}>
        <Paper
          elevation={3}
          sx={{
            backgroundImage:
              "linear-gradient(45deg, #191c26 33.33%, #161924 33.33%, #161924 50%, #191c26 50%, #191c26 83.33%, #161924 83.33%, #161924 100%)",
            backgroundSize: "42.43px 42.43px",
            borderRadius: 5,
            padding: "50px"
          }}
        >
          <Typography variant="h2">CATÉGORIES</Typography>

          <CategoryCheckBox cat={genres} name={"Genres"} />
          <CategoryCheckBox cat={types} name={"Types"} />
          <CategoryCheckBox cat={occasions} name={"Occasions"} />
          <CategoryCheckBox cat={parties} name={"Parties"} />
        </Paper>
      </Grid>
      <Box
        sx={{
          marginTop: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button variant="contained" color="info" sx={{ color: "white" }}>
          Ajouter produit
        </Button>
      </Box>
    </Grid>
  );
}

export default AddProduct;
