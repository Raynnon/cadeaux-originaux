import {
  FormGroup,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from "@mui/material";

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
          color="info"
          sx={{ width: "230px" }}
          variant="standard"
        />
        <FormLabel component="legend" sx={{ marginTop: "30px" }}>
          Prix
        </FormLabel>
        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
          <FormControlLabel
            value="€"
            control={<Radio color="info" />}
            label="€"
          />
          <FormControlLabel
            value="€€"
            control={<Radio color="info" />}
            label="€€"
          />
          <FormControlLabel
            value="€€€"
            control={<Radio color="info" />}
            label="€€€"
          />
        </RadioGroup>
      </FormGroup>
    </Box>
  );
}

export default AddProduct;
