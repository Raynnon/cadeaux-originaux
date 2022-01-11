import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

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
  Typography,
  Modal
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

function AddProduct() {
  const [formError, setFormError] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

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

  const ImageName = ({ index }) => {
    if (productImages[index]) {
      const nameArr = productImages[index].name.split("\\");
      const name = nameArr[nameArr.length - 1];

      return <p style={{ display: "inline", marginLeft: "10px" }}>{name}</p>;
    }

    return null;
  };

  const submitForm = async () => {
    if (!productName || !productPrice || !productImages || !productUrl) {
      setFormError(true);
    } else {
      setFormError(false);

      const data = new FormData();
      data.append("name", productName);
      data.append("price", productPrice);
      data.append("description", productDescription);
      data.append("strongPoints", productStrongPoints);
      data.append("whoType", whoType);
      data.append("whoKind", whoKind);
      data.append("occasions", occasions);
      data.append("parties", parties);
      productImages.forEach((image) => {
        data.append("image", image);
      });
      data.append("urlAmazon", productUrl);
      try {
        await axios({
          method: "post",
          url: process.env.REACT_APP_API_URL + "/products",
          data,
          headers: { "Content-Type": "multipart/form-data" }
        });
        setProductAdded(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const resetState = () => {
    setFormError(false);
    setProductAdded(false);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductStrongPoints([]);
    setStrongPointLength(1);
    setProductImages([]);
    setImagesLength(1);
    setProductUrl("");
    setWhoType([]);
    setWhoKind([]);
    setOccasions([]);
    setParties([]);
  };

  return (
    <Container component={"main"} maxWidth={false} sx={{ marginTop: "10px" }}>
      <Modal
        open={formError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => setFormError(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Erreur lors de l'ajout du produit{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Veuillez remplir tous les champs possédant un astérisque et
            choisissez au moins une catégorie.
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={productAdded}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => resetState()}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Succès!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Produit ajouté avec succès!
          </Typography>
        </Box>
      </Modal>
      <Typography variant="h1">{selectedMenuItem}</Typography>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "10px"
        }}
      >
        <Grid item xs={12} xl={7}>
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
                value={productName}
                data-testid="name-field"
              />

              {/* PRICE */}
              <Box sx={{ marginTop: "30px" }}>
                <FormLabel required component="legend">
                  Prix
                </FormLabel>

                <RadioGroup
                  row
                  aria-label="price"
                  name="row-radio-buttons-group"
                  value={productPrice || ""}
                  data-testid="prices-field"
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
                value={productDescription}
                label="Description"
                variant="filled"
                multiline
                rows={4}
                color="info"
                sx={{
                  marginTop: "30px",
                  width: "520px",
                  maxWidth: { xs: "75vw" }
                }}
                onChange={(e) => setProductDescription(e.target.value)}
                data-testid="description-field"
              />

              {/* POINTS FORTS */}
              <Box sx={{ marginTop: "30px" }}>
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
                          id="name"
                          color="info"
                          sx={{
                            width: { xs: "57vw", sm: "360px" },
                            marginBottom: "10px"
                          }}
                          variant="filled"
                          label="Point fort"
                          value={productStrongPoints[index] || ""}
                          onChange={(e) => {
                            const newStrongPoints = [...productStrongPoints];

                            newStrongPoints[index] = e.target.value;
                            setProductStrongPoints(newStrongPoints);
                          }}
                          data-testid="strong-points-field"
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
                            <RemoveCircleRoundedIcon data-testid="strong-point-delete-button" />
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
                            <AddCircleIcon data-testid="strong-point-add-button" />
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
                  Images du produit *
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

                        newImages[0] = e.target.files[0];
                        setProductImages(newImages);
                        setImagesLength(imagesLength + 1);
                      }}
                      data-testid="images-upload-field"
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

                            newImages[index] = e.target.files[0];
                            setProductImages(newImages);
                            setImagesLength(imagesLength + 1);
                          }}
                          data-testid="images-upload-field"
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
                            <RemoveCircleRoundedIcon data-testid="images-upload-delete-button" />
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
                sx={{ marginTop: "30px", width: { xs: "76vw", sm: "460px" } }}
                variant="filled"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                data-testid="url-field"
              />
            </FormGroup>
          </Box>
        </Grid>

        {/* CATEGORIES*/}
        <Grid item xs={12} xl={5}>
          <Paper
            elevation={3}
            sx={{
              backgroundImage:
                "linear-gradient(45deg, #191c26 33.33%, #161924 33.33%, #161924 50%, #191c26 50%, #191c26 83.33%, #161924 83.33%, #161924 100%)",
              backgroundSize: "42.43px 42.43px",
              borderRadius: 5,
              padding: { xs: "25px", sm: "50px" },
              maxWidth: { xs: "76vw", sm: "100%" }
            }}
            data-testid="categories-group"
          >
            <Typography variant="h2">CATÉGORIES *</Typography>

            <CategoryCheckBox
              cat={Genre}
              name={"Genres"}
              handleCategoryChange={(categories) => {
                setWhoKind(categories);
              }}
              data-testid="category-group"
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
            data-testid="add-product-button"
          >
            Ajouter produit
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}

export default AddProduct;
