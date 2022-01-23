import { TextField, Box, IconButton } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function StrongPoints({
  productStrongPoints,
  handleStrongPointsChange
}) {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {productStrongPoints.map((item, index) => {
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
                value={productStrongPoints[index]}
                label="Point fort"
                onChange={(e) => {
                  const newStrongPoints = [...productStrongPoints];

                  newStrongPoints[index] = e.target.value;
                  handleStrongPointsChange(newStrongPoints);
                }}
                data-testid="strong-points-field"
              />
              {productStrongPoints.length > 1 ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => {
                    const newStrongPoints = [...productStrongPoints];
                    newStrongPoints.splice(index, 1);
                    handleStrongPointsChange(newStrongPoints);
                  }}
                >
                  <RemoveCircleRoundedIcon data-testid="strong-point-delete-button" />
                </IconButton>
              ) : null}
              {index === productStrongPoints.length - 1 ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="info"
                  onClick={() => {
                    handleStrongPointsChange([...productStrongPoints, ""]);
                  }}
                >
                  <AddCircleIcon data-testid="strong-point-add-button" />
                </IconButton>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
