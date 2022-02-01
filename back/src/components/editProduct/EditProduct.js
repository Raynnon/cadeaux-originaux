import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CategoryCheckBox from "./CategoryCheckbox";

import { Button, IconButton, Tooltip } from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

import readProducts from "../../routes/readProducts";
import postProduct from "../../routes/postProduct";
import putProduct from "../../routes/putProduct";

import {
  FormGroup,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Typography,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import StrongPoints from "./strongPoints/StrongPoints";
import ImagesAdder from "./imagesAdder/ImagesAdder";

import productToFormData from "../../scripts/productToFormData";

import axios from "axios";

function EditProduct({ productId }) {
  const [formError, setFormError] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  const token = useSelector((state) => state.login.token);

  const productInitialState = {
    _id: "",
    name: "",
    price: "",
    description: "",
    strongPoints: [""],
    whoType: [],
    whoKind: [],
    occasions: [],
    parties: [],
    image: [],
    imagesToDelete: [],
    urlAmazon: ""
  };

  const [product, setProduct] = useState(productInitialState);
  const [productCurrentImages, setProductCurrentImages] = useState([]);

  const availablePrices = ["€", "€€", "€€€"];

  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    if (productId) {
      const getProducts = async () => {
        const productData = await readProducts({
          _id: productId,
          images: true
        });

        setProductCurrentImages(productData[0].images);

        setProduct((prevProduct) => ({
          ...prevProduct,
          _id: productId,
          name: productData[0].name,
          price: productData[0].price,
          description: productData[0].description,
          strongPoints: productData[0].strongPoints,
          urlAmazon: productData[0].urlAmazon,
          whoKind: productData[0].whoKind,
          whoType: productData[0].whoType,
          occasions: productData[0].occasions,
          parties: productData[0].parties
        }));
      };

      getProducts();
    }
  }, [productId]);

  const selectedMenuItem = useSelector((state) => state.menu.selectedMenuItem);
  const { Genre, Type, Occasion, Fête } = useSelector(
    (state) => state.categories.categories
  );

  const submitForm = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.image ||
      !product.urlAmazon
    ) {
      setFormError(true);
    } else {
      setFormError(false);

      try {
        const data = productToFormData(product);

        if (productId) {
          await putProduct(data, product._id);
        } else {
          await postProduct(data);
        }

        setProductAdded(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const resetState = () => {
    setFormError(false);
    setProductAdded(false);

    if (!product._id) {
      setProduct(productInitialState);
    }
  };

  return (
    <>
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
            Erreur lors de l'ajout du produit
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
      <Typography variant="h1">
        {productId ? product.name : selectedMenuItem}
      </Typography>
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
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                value={product.name}
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
                  value={product.price || ""}
                  data-testid="prices-field"
                >
                  {availablePrices.map((price, index) => {
                    return (
                      <Box key={index}>
                        <FormControlLabel
                          value={price}
                          control={<Radio color="info" />}
                          label={price}
                          onChange={(e) =>
                            setProduct({ ...product, price: e.target.value })
                          }
                        />
                      </Box>
                    );
                  })}
                </RadioGroup>
              </Box>

              {/* DESCRIPTION*/}
              <TextField
                id="outlined-multiline-static"
                value={product.description}
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
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                data-testid="description-field"
              />

              {/* STRONG POINTS */}
              <StrongPoints
                productStrongPoints={product.strongPoints}
                handleStrongPointsChange={(sp) =>
                  setProduct({ ...product, strongPoints: sp })
                }
              />

              {/* IMAGES */}
              {productCurrentImages.length ? (
                <Box>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      marginTop: "20px"
                    }}
                  >
                    Images du produit
                  </p>
                  <Grid container spacing={3}>
                    {productCurrentImages.map((image, index) => (
                      <Grid key={index} item xs={4} sm={3} xl={2}>
                        <img
                          src={image}
                          alt="test"
                          style={{
                            width: "100px",
                            height: "100px",
                            marginRight: "10px",
                            objectFit: "cover"
                          }}
                        />
                        <IconButton
                          aria-label="delete"
                          size="large"
                          color="error"
                          onClick={() => {
                            const newCurrentImages = [
                              ...productCurrentImages
                            ].filter((item) => item !== image);

                            setProduct({
                              ...product,
                              imagesToDelete: [...product.imagesToDelete, image]
                            });

                            setProductCurrentImages(newCurrentImages);
                          }}
                          sx={{
                            position: "relative",
                            bottom: "30px",
                            left: "28px"
                          }}
                        >
                          <RemoveCircleRoundedIcon />
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : null}

              <ImagesAdder
                productImages={product.image}
                handleProductImagesChange={(image) => {
                  setProduct({ ...product, image });
                }}
              />

              {/* URL */}
              <TextField
                required
                id="url"
                label="URL du produit"
                color="info"
                sx={{ marginTop: "30px", width: { xs: "76vw", sm: "460px" } }}
                variant="filled"
                value={product.urlAmazon}
                onChange={(e) =>
                  setProduct({ ...product, urlAmazon: e.target.value })
                }
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
              selectedItem={product.whoKind}
              cat={Genre}
              name={"Genres"}
              handleCategoryChange={(whoKind) => {
                setProduct({ ...product, whoKind });
              }}
              data-testid="category-group"
            />

            <CategoryCheckBox
              selectedItem={product.whoType}
              cat={Type}
              name={"Types"}
              handleCategoryChange={(whoType) => {
                setProduct({ ...product, whoType });
              }}
            />

            <CategoryCheckBox
              selectedItem={product.occasions}
              cat={Occasion}
              name={"Occasions"}
              handleCategoryChange={(occasions) => {
                setProduct({ ...product, occasions });
              }}
            />

            <CategoryCheckBox
              selectedItem={product.parties}
              cat={Fête}
              name={"Fêtes"}
              handleCategoryChange={(parties) => {
                setProduct({ ...product, parties });
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
          <Tooltip
            title={
              token !== "anonymous" ? "" : "Please log in to use this button"
            }
            followCursor
          >
            <Box>
              <Button
                variant="contained"
                color="info"
                sx={{
                  color: "white",
                  margin: "0 10px 30px 10px"
                }}
                disabled={token !== "anonymous" ? false : true}
                onClick={token !== "anonymous" ? () => submitForm() : null}
                title="click here"
              >
                {productId ? "Editer produit" : "Ajouter produit"}
              </Button>
            </Box>
          </Tooltip>

          {productId ? (
            <Box>
              <Tooltip
                title={
                  token !== "anonymous"
                    ? ""
                    : "Please log in to use this button"
                }
                followCursor
              >
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ color: "white", margin: "0 10px 30px 10px" }}
                    disabled={token !== "anonymous" ? false : true}
                    onClick={
                      token !== "anonymous" ? () => setDeleteDialog(true) : null
                    }
                  >
                    Supprimer produit
                  </Button>
                </Box>
              </Tooltip>

              <Dialog
                open={deleteDialog}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  Supprimer produit
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    En confirmant, vous supprimerez définitivement ce produit.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    color="info"
                    onClick={() => {
                      setDeleteDialog(false);
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    autoFocus
                    color="error"
                    onClick={async () => {
                      setDeleteDialog(false);
                      try {
                        await axios.delete(
                          `${process.env.REACT_APP_API_URL}/products/${productId}`
                        );
                      } catch {}
                    }}
                  >
                    Confirmer
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ) : null}
        </Box>
      </Grid>
    </>
  );
}

export default EditProduct;
