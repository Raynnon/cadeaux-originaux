import { useState, useEffect } from "react";

import { TextField, Box, IconButton } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function StrongPoints({
  productStrongPoints,
  handleStrongPointsChange
}) {
  const [strongPoints, setStrongPoints] = useState(productStrongPoints);

  useEffect(() => {
    handleStrongPointsChange(strongPoints);
  }, [strongPoints, handleStrongPointsChange]);

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        {strongPoints.map((item, index) => {
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
                value={strongPoints[index]}
                label="Point fort"
                onChange={(e) => {
                  const newStrongPoints = [...strongPoints];

                  newStrongPoints[index] = e.target.value;
                  setStrongPoints(newStrongPoints);
                }}
                data-testid="strong-points-field"
              />
              {strongPoints.length > 1 ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => {
                    const newStrongPoints = [...strongPoints];
                    newStrongPoints.splice(index, 1);
                    setStrongPoints(newStrongPoints);
                  }}
                >
                  <RemoveCircleRoundedIcon data-testid="strong-point-delete-button" />
                </IconButton>
              ) : null}
              {index === strongPoints.length - 1 ? (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="info"
                  onClick={() => {
                    setStrongPoints([...strongPoints, ""]);
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
