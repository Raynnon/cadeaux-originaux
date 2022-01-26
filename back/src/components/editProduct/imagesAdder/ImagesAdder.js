import { Box, Input, IconButton, Grid } from "@mui/material";

import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function ImagesAdder({
  productImages,
  handleProductImagesChange
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>Nouvelles images</p>

      <Grid container spacing={3}>
        {productImages.map((item, index) => {
          return (
            <Grid key={index} item xs={4} sm={3} xl={2}>
              <img
                src={URL.createObjectURL(item)}
                alt="test"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover"
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      {productImages.map((item, index) => {
        return (
          <Box key={index}>
            <label
              htmlFor="contained-button-file"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Input
                type="file"
                color="info"
                sx={{ color: "transparent", width: "135px" }}
                onChange={(e) => {
                  handleProductImagesChange([
                    ...productImages,
                    e.target.files[0]
                  ]);
                }}
                data-testid="images-upload-field"
              />
              <p style={{ display: "inline", marginLeft: "10px" }}>
                {item.name.split("\\")}
              </p>
              {productImages.length > 0 ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => {
                    const newImages = [...productImages];

                    newImages.splice(index, 1);

                    handleProductImagesChange(newImages);
                  }}
                >
                  <RemoveCircleRoundedIcon data-testid="images-upload-delete-button" />
                </IconButton>
              ) : null}
            </label>
          </Box>
        );
      })}
      <label
        htmlFor="contained-button-file"
        sx={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Input
          type="file"
          color="info"
          sx={{
            color: "transparent",
            width: "135px"
          }}
          onChange={(e) => {
            handleProductImagesChange([...productImages, e.target.files[0]]);
          }}
          data-testid="images-upload-field"
        />
      </label>
    </Box>
  );
}
