import { useState } from "react";
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
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

function AddProduct() {
  //Product variables
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStrongPoints, setProductStrongPoints] = useState([]);
  const [strongPointLength, setStrongPointLength] = useState(1);
  const [productImages, setProductImages] = useState([]);
  const [imagesLength, setImagesLength] = useState(1);
  const [productUrl, setProductUrl] = useState("");

  //categories variables
  const [whoType, setWhoType] = useState([]);
  const [whoKind, setWhoKind] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [parties, setParties] = useState([]);

  const prices = ["€", "€€", "€€€"];

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);
  const { Genre, Type, Occasion, Fête } = useSelector(
    (state) => state.categories.categories
  );

  const sendAddProductForm = () => {
    const form = new FormData();
    form.append("name", productName);
    form.append("price", productPrice);
    form.append("description", productDescription);
    form.append("strongPoints[0]", productStrongPoints[0]);
    form.append("whoType[0]", productName);
    form.append("whoType[0]", productName);
    form.append("whoKind[0]", productName);
    form.append("whoType[0]", productName);
    form.append("occasions[0]", productName);
    form.append("parties[0]", productName);
    form.append("image", productImages[0]);
    form.append("image", productImages[1]);
    form.append("urlAmazon", productUrl);

    return form;
  };

  const ImageName = ({ index }) => {
    if (productImages[index]) {
      const nameArr = productImages[index].split("\\");
      const name = nameArr[nameArr.length - 1];

      return <p style={{ display: "inline", marginLeft: "10px" }}>{name}</p>;
    }

    return null;
  };

  const submitForm = () => {
    console.log(sendAddProductForm().getAll("image"));
    console.log(sendAddProductForm().entries());
  };

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
                onChange={(e) => setProductName(e.target.value)}
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
                          onChange={(e) => setProductPrice(e.target.value)}
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
                onChange={(e) => setProductDescription(e.target.value)}
              />

              {/* POINTS FORTS */}
              <Box sx={{ marginTop: "30px" }}>
                <FormLabel component="legend" sx={{ marginBottom: "10px" }}>
                  Points forts
                </FormLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {[...Array(strongPointLength)].map((e, index) => {
                    return (
                      <Box key={index}>
                        <TextField
                          required
                          id="name"
                          color="info"
                          sx={{
                            width: "360px",
                            marginBottom: "10px"
                          }}
                          variant="filled"
                          label="Point fort"
                          onChange={(e) => {
                            const newStrongPoints = [...productStrongPoints];

                            newStrongPoints[index] = e.target.value;
                            setProductStrongPoints(newStrongPoints);
                          }}
                        />

                        {strongPointLength > 1 ? (
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="error"
                            onClick={() => {
                              const newStrongPoints = [...productStrongPoints];

                              newStrongPoints.splice(index, 1);

                              setProductStrongPoints(newStrongPoints);
                              setStrongPointLength(strongPointLength - 1);
                            }}
                          >
                            <RemoveCircleRoundedIcon />
                          </IconButton>
                        ) : null}

                        {index === strongPointLength - 1 ? (
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="info"
                            onClick={() =>
                              setStrongPointLength(strongPointLength + 1)
                            }
                          >
                            <AddCircleIcon />
                          </IconButton>
                        ) : null}
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* UPLOAD IMAGES */}
              <Box
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0 }}>
                  Images du produit
                </p>
                {!productImages.length ? (
                  <label
                    htmlFor="contained-button-file"
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Input
                      type="file"
                      color="info"
                      sx={{ color: "transparent", width: "135px" }}
                      onChange={(e) => {
                        const newImages = [...productImages];

                        newImages[0] = e.target.value;
                        setProductImages(newImages);
                        setImagesLength(imagesLength + 1);
                      }}
                    />
                  </label>
                ) : (
                  [...Array(imagesLength)].map((e, index) => {
                    return (
                      <label
                        htmlFor="contained-button-file"
                        key={index}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Input
                          type="file"
                          color="info"
                          sx={{ color: "transparent", width: "135px" }}
                          onChange={(e) => {
                            const newImages = [...productImages];

                            newImages[index] = e.target.value;
                            setProductImages(newImages);
                            setImagesLength(imagesLength + 1);
                          }}
                        />
                        <ImageName index={index} />
                        {imagesLength > 1 ? (
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="error"
                            onClick={() => {
                              const newImages = [...productImages];

                              newImages.splice(index, 1);

                              setProductImages(newImages);
                              setImagesLength(imagesLength - 1);
                            }}
                          >
                            <RemoveCircleRoundedIcon />
                          </IconButton>
                        ) : null}
                      </label>
                    );
                  })
                )}
              </Box>

              {/* URL */}
              <TextField
                required
                id="url"
                label="URL du produit"
                color="info"
                sx={{ marginTop: "30px", width: "460px" }}
                variant="filled"
                onChange={(e) => setProductUrl(e.target.value)}
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

            <CategoryCheckBox
              cat={Genre}
              name={"Genres"}
              handleCategoryChange={(categories) => {
                setWhoKind(categories);
              }}
            />
            <CategoryCheckBox
              cat={Type}
              name={"Types"}
              handleCategoryChange={(categories) => {
                setWhoType(categories);
              }}
            />
            <CategoryCheckBox
              cat={Occasion}
              name={"Occasions"}
              handleCategoryChange={(categories) => {
                setOccasions(categories);
              }}
            />
            <CategoryCheckBox
              cat={Fête}
              name={"Parties"}
              handleCategoryChange={(categories) => {
                setParties(categories);
              }}
            />
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
          <Button
            variant="contained"
            color="info"
            sx={{ color: "white", marginBottom: "30px" }}
            onClick={() => submitForm()}
          >
            Ajouter produit
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default AddProduct;
