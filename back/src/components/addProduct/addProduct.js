import { useSelector } from "react-redux";

import CategoryCheckBox from "./CategoryCheckbox";

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
  Typography
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddProduct() {
  const prices = ["€", "€€", "€€€"];

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);
  const { Genre, Type, Occasion, Fête } = useSelector(
    (state) => state.categories.categories
  );

  return (
    <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
      <Typography variant="h1">{selectedMenuItem}</Typography>
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
              padding: "20px 0px"
            }}
          >
            {/* PRODUCT NAME */}
            <Typography variant="h2">DÉTAILS DU PRODUIT</Typography>
            <FormGroup>
              <TextField
                required
                id="name"
                label="Nom du produit"
                variant="filled"
                color="info"
                sx={{ width: "230px", marginTop: "30px" }}
              />

              {/* PRICE */}
              <Box sx={{ marginTop: "30px" }}>
                <FormLabel component="legend">Prix</FormLabel>

                <RadioGroup
                  row
                  aria-label="price"
                  name="row-radio-buttons-group"
                >
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
                variant="filled"
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
                      variant="filled"
                      label="Point fort"
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
                      sx={{ marginTop: "5px", width: "360px" }}
                      variant="filled"
                      label="Point fort"
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
                variant="filled"
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

            <CategoryCheckBox cat={Genre} name={"Genres"} />
            <CategoryCheckBox cat={Type} name={"Types"} />
            <CategoryCheckBox cat={Occasion} name={"Occasions"} />
            <CategoryCheckBox cat={Fête} name={"Parties"} />
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
    </Container>
  );
}

export default AddProduct;
