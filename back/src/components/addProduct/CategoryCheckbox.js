import { useState } from "react";
import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

export default function CategoryCheckBox({ cat, name, handleCategoryChange }) {
  const [categories, setCategories] = useState([]);

  return (
    <Box sx={{ marginTop: "30px" }}>
      <FormLabel component="legend">{name}</FormLabel>

      <RadioGroup row aria-label="type" name="row-radio-buttons-group">
        {cat
          ? cat.map((item, index) => {
              return (
                <Box key={index}>
                  <FormControlLabel
                    value={item.name}
                    control={<Checkbox color="info" />}
                    label={item.name}
                  />
                </Box>
              );
            })
          : null}
      </RadioGroup>
    </Box>
  );
}
