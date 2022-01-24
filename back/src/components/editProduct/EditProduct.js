import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import CategoryCheckBox from "./CategoryCheckbox";

import { Button } from "@mui/material";

import readProducts from "../apiCalls/readProducts";

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
  Modal
} from "@mui/material";

import StrongPoints from "./strongPoints/StrongPoints";
import ImagesAdder from "./imagesAdder/ImagesAdder";
import postProduct from "../apiCalls/postProduct";
import productToFormData from "../../scripts/productToFormData";

function EditProduct({ productId }) {
  const [formError, setFormError] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

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
    urlAmazon: ""
  };

  const [product, setProduct] = useState(productInitialState);

  const availablePrices = ["€", "€€", "€€€"];

  useEffect(() => {
    if (productId) {
      const getProducts = async () => {
        const productData = await readProducts({
          _id: productId,
          image: true
        });

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
    setProduct(productInitialState);
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

              {/* UPLOAD IMAGES */}
              <ImagesAdder
                productImages={product.image}
                handleProductImagesChange={(image) =>
                  setProduct({ ...product, image })
                }
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
    </>
  );
}

export default EditProduct;
