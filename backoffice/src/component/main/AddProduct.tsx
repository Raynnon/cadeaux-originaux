import { FormGroup, TextField, Box } from "@mui/material";

function AddProduct() {
  return (
    <Box
      sx={{
        margin: "10px 0",
        padding: "30px 50px",
        width: "100%",
        backgroundColor: "#FFF"
      }}
    >
      <FormGroup>
        <TextField
          required
          id="name"
          label="Nom du produit"
          color="primary"
          /* sx={{ width: "230px", backgroundColor: "black" }} */
        />
      </FormGroup>
    </Box>
  );
}

export default AddProduct;
