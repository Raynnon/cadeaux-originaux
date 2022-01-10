import { useState, useEffect } from "react";
import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

export default function CategoryCheckBox({ cat, name, handleCategoryChange }) {
  const [categories, setCategories] = useState([]);

  const handleUpdateCategories = (category) => {
    const newCategories = [...categories];

    if (categories.includes(category)) {
      const categoryToDelete = newCategories.indexOf(category);
      newCategories.splice(categoryToDelete, 1);
    } else {
      newCategories.push(category);
    }

    setCategories(newCategories);
  };

  useEffect(() => {
    handleCategoryChange(categories);
  }, [categories, handleCategoryChange]);

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
                    onChange={(e) => {
                      handleUpdateCategories(e.target.value);
                    }}
                  />
                </Box>
              );
            })
          : null}
      </RadioGroup>
    </Box>
  );
}
