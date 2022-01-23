import { Box, Input, IconButton } from "@mui/material";

import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function ImagesAdder({
  productImages,
  handleProductImagesChange
}) {
  return (
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

      {productImages.map((item, index) => {
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
            width: "135px",
            marginTop: "10px"
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
