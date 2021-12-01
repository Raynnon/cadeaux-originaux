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
  Paper
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddProduct() {
  const prices: string[] = ["€", "€€", "€€€"];

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
          {/* PRODUCT NAME */}{" "}
          <FormGroup>
            <TextField
              required
              id="name"
              label="Nom du produit"
              color="info"
              sx={{ width: "230px" }}
              variant="standard"
            />

            {/* PRICE */}
            <Box sx={{ marginTop: "30px" }}>
              <FormLabel component="legend">Prix</FormLabel>

              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                {prices.map((price) => {
                  return (
                    <FormControlLabel
                      value={price}
                      control={<Radio color="info" />}
                      label={price}
                    />
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

      <Grid item xs={6}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#FFF",
            borderRadius: 5,
            padding: "30px 50px"
          }}
        >
          <h1>Testing</h1>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
